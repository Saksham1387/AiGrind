import { NextApiResponse } from "next/types";
import { db } from "../../db";
import { NextResponse } from "next/server";
import { authOptions } from "../../lib/auth";
import { getServerSession } from "next-auth";
import { CategoryCount } from "../../types/types";

export async function POST(request: Request, res: NextApiResponse) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json(
      {
        message: "You must be logged in to view your stats",
      },
      {
        status: 401,
      }
    );
  }

  const userId = session.user.id;
  const { type } = await request.json();

  if (!type || typeof type !== "string") {
    return NextResponse.json(
      { error: "Invalid or missing 'type' query parameter" },
      { status: 400 }
    );
  }

  try {
    if (type === "categoryCounts") {
      const data = await db.mCQSubmission.groupBy({
        by: ["mcqProblemId"],
        _count: {
          id: true,
        },
        where: {
          userId,
          result: "true"
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
      
      console.log('Chart data:', chartData);
      return NextResponse.json(chartData);

    } else if (type === "solvedUnsolvedCounts") {
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
              userId: userId,  // Replace with the variable holding the current user's ID
            },
          },
        },
      });

      console.log("Unsolved count: ", unsolvedCount);
      console.log("Solved count: ", solvedCount);

      return NextResponse.json({
        solved: solvedCount,
        unsolved: unsolvedCount,
      });
    } else {
      return NextResponse.json(
        { error: "Invalid 'type' query parameter" },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
