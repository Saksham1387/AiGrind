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

export async function GET(req: NextRequest) {
  const mcqProblemId = req.nextUrl.searchParams.get("mcqProblemId");

  try {
    const comments = await db.comment.findMany({
      where: {
        OR: [{ MCQProblemId: mcqProblemId as string }],
      },
      include: {
        user: true,
        problem: true,
        mcqProblem: true,
      },
    });

    const count = await db.comment.count({
      where: {
        OR: [{ MCQProblemId: mcqProblemId as string }],
      },
    });

    return NextResponse.json({
      comments: comments.map((comment) => ({
        ...comment,
        user: {
          id: comment.user.id,
          name: comment.user.name,
          email: comment.user.email,
          userImage: comment.user.userImage,
        },
      })),
      count,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to retrieve comments" },
      { status: 500 }
    );
  }
}
