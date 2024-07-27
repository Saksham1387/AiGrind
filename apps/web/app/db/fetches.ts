import { getServerSession } from "next-auth";
import { authOptions } from "../lib/auth";
import { db } from ".";
import { CategoryCount } from "../types/types";

export const getMCQProblems = async ()=> {
    try {
      const session = await getServerSession(authOptions);
      if (!session?.user) {
        return [];
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
      const userMCQMap = new Map(userMCQProblems.map(up => [up.mcqProblemId, up]));
  
      const mergedProblems = allProblems.map(problem => ({
        ...problem,
        solved: userMCQMap.get(problem.id)?.solved || 'unsolved'
      }));
     
      return mergedProblems;
  
    } catch (error) {
      console.error("Error fetching MCQ problems:", error);
      return [];
    }
};


export const getRadarChartData = async () => {
    try{
        const session = await getServerSession(authOptions);
        if (!session?.user) {
            return [];
          }
        const userId = session.user.id;
        const data = await db.mCQSubmission.groupBy({
            by: ["mcqProblemId"],
            _count: {
              id: true,
            },
            where: {
              userId,
              result:"true"
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
          const result = categoryCounts.reduce<Record<string, number>>(
            (acc, curr) => {
              // If the category is not in the accumulator or current count is higher
              //@ts-ignore
              if (!acc[curr.category] || curr.count > acc[curr.category] ) {
                acc[curr.category] = curr.count;
              }
              return acc;
            },
            {}
          );
          const chartData = Object.keys(result).map((key) => ({
            category: key,
            count: result[key],
          }));
          return chartData;

    }catch(error){
        console.error("Error fetching MCQ problems:", error);
        return [];
    }
}
  