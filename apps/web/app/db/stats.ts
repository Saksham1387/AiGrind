import { getServerSession } from "next-auth";
import { db } from ".";
import { CategoryCount } from "../types/types";
import { authOptions } from "../lib/auth";

export async function getRadarChartData() {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return [];
  }

  const userId = session.user.id;

  try {
    const data = await db.mCQSubmission.groupBy({
      by: ["mcqProblemId"],
      _count: {
        id: true,
      },
      where: {
        userId,
        result: "true",
      },
    });
    console.log(data);

    const categoryCounts: CategoryCount[] = await Promise.all(
      data.map(async (entry) => {
        const problem = await db.mCQProblem.findUnique({
          where: { id: entry.mcqProblemId },
        });
        return {
          category: problem?.category || "Unknown",
          count: entry._count.id,
        };
      })
    );
    console.log("something:   ", categoryCounts);

    const result = categoryCounts.reduce<Record<string, number>>(
      (acc, curr) => {
        if (!acc[curr.category]) {
          acc[curr.category] = 0;
        }
        //@ts-ignore
        acc[curr.category] += curr.count;
        return acc;
      },
      {}
    );

    const chartData = Object.keys(result).map((key) => ({
      category: key,
      count: result[key],
    }));

    console.log("Chart data:", chartData);
    return chartData;
  } catch (error) {}
}

export async function getPieChartData() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return [];
  }

  const userId = session.user.id;
  const solvedCount = await db.mCQProblem.count({
    where: {
      userMCQProblems: {
        some: { solved: "solved", userId },
      },
      mcqSubmissions: {
        some: { userId },
      },
    },
  });

  const unsolvedCount = await db.mCQProblem.count({
    where: {
      userMCQProblems: {
        none: {
          userId: userId,
        },
      },
    },
  });

  console.log("Unsolved count: ", unsolvedCount);
  console.log("Solved count: ", solvedCount);

  return [
    { status: "solved", count: solvedCount, fill: "var(--color-solved)" },
    { status: "unsolved", count: unsolvedCount, fill: "var(--color-unsolved)" },
  ];
}

export const getStreakDates = async () => {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return [];
  }

  const userId = session.user.id;
  const streakDates = await db.streakDate.findMany({
    where: { userId },
    orderBy: { date: "asc" },
  });

  return { streakDates };
};
