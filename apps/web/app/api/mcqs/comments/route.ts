import { NextRequest, NextResponse } from "next/server";
import { db } from "../../../db";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../lib/auth";

export async function POST(request: Request) {
  const { text, mcqProblemId } = await request.json();
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return NextResponse.json(
      {
        message: "You must be logged in to submit a problem",
      },
      {
        status: 401,
      }
    );
  }

  const userId = session.user.id;

  try {
    const comment = await db.comment.create({
      data: {
        text,
        userId,
        MCQProblemId: mcqProblemId,
      },
    });

    return NextResponse.json(comment);
  } catch (error) {
    return NextResponse.json({ error: "Failed to create comment" });
  }
}
