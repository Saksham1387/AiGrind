
import { getServerSession } from "next-auth";
import { db } from ".";
import { Difficulty, MCQProblem } from "../types/Finaltypes";
import { authOptions } from "../lib/auth";
import { NextResponse } from "next/server";

export const getProblem = async (problemId: string, contestId?: string) => {
  if (contestId) {
    const contest = await db.contest.findFirst({
      where: {
        id: contestId,
        hidden: false,
      },
    });

    if (!contest) {
      return null;
    }

    const problem = await db.problem.findFirst({
      where: {
        id: problemId,
        contests: {
          some: {
            contestId: contestId,
          },
        },
      },
      include: {
        defaultCode: true,
      },
    });
    return problem;
  }

  const problem = await db.problem.findFirst({
    where: {
      id: problemId,
    },
    include: {
      defaultCode: true,
    },
  });
  return problem;
};

export interface Problem {
  id: string;
  title: string;
  difficulty: string;
  solved: number;
}

export const getProblems = async ():Promise<Problem[]> => {
  const problems = await db.problem.findMany({
    where: {
      hidden: false,
    },
    include: {
      defaultCode: true,
    },
  });
  return problems;
};

export function getColor(status: string) {
  switch (status) {
    case "EASY":
      return "text-green-500";
    case "HARD":
      return "text-red-500";
    case "MEDIUM":
      return "text-yellow-500";
    case "AC":
      return "text-green-500";
    case "FAIL":
      return "text-red-500";
    case "true":
      return "text-green-500";
    case "false":
      return "text-red-500";
    case "TLE":
      return "text-red-500";
    case "COMPILATION_ERROR":
      return "text-red-500";
    case "PENDING":
      return "text-yellow-500";
    case "REJECTED":
      return "text-red-500";
    default:
      return "text-gray-500";
  }
}
