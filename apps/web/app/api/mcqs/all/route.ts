import { getServerSession } from "next-auth";
import { db } from "../../../db";
import { NextResponse } from 'next/server';
import { authOptions } from "../../../lib/auth";

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json(
        {
          message: "You must be logged in to view your problems",
        },
        {
          status: 401,
        }
      );
    }
    const userId = session.user.id;
    const allProblems = await db.mCQProblem.findMany({
      where: {
        solved:"unsolved"
      },
    });
    console.log("All prblems",allProblems);
    return NextResponse.json(allProblems);
  } catch (error) {
    console.error("Error fetching user's MCQ problems:", error);
    return NextResponse.json({ error: 'Failed to fetch user MCQ problems' }, { status: 500 });
  }
}