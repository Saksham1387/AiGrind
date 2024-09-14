import { NextRequest, NextResponse } from "next/server";
import { db } from "../../../../db";

export async function GET(request: Request) {
    const url = new URL(request.url);

    const mcqProblemId = url.pathname.split('/').pop();
    console.log(mcqProblemId);
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
  