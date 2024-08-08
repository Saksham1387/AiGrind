import { getServerSession } from "next-auth";
import { authOptions } from "../lib/auth";
import { db } from ".";

export const getMCQProblems = async () => {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      const allProblems = await db.mCQProblem.findMany({});
      return allProblems;
    }
    const userId = session.user.id;
    const userMCQProblems = await db.userMCQProblem.findMany({
      where: { userId },
      include: {
        mcqProblem: {
          include: {
            options: true,
          },
        },
      },
    });
    const allProblems = await db.mCQProblem.findMany({
      where: {
        hidden: false,
      },
      include: {
        options: true,
      },
    });
    const userMCQMap = new Map(
      userMCQProblems.map((up) => [up.mcqProblemId, up])
    );

    const mergedProblems = allProblems.map((problem) => ({
      ...problem,
      solved: userMCQMap.get(problem.id)?.solved || "unsolved",
    }));

    return mergedProblems;
  } catch (error) {
    console.error("Error fetching MCQ problems:", error);
    return [];
  }
};
