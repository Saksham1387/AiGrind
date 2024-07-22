import { getServerSession } from "next-auth";
import { db } from "../../../db";
import { NextResponse } from "next/server";
import { authOptions } from "../../../lib/auth";

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const mcqId = url.pathname.split("/").pop();
    console.log(mcqId);
    const comments = await db.comment.findMany({
      where: {
        MCQProblemId: mcqId,
      },
      include: {
        user: true,
      },
    });

    if (comments.length === 0) {
      return new Response("No comments found", { status: 200 });
    }

    return NextResponse.json(comments);
  } catch (error) {
    console.error(error);
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return new Response("Unauthorized", { status: 401 });
    }

    const { text, mcqId } = await request.json();
    const userId = session?.user?.id;

    if (!mcqId || !userId) {
      return new Response("Bad Request", { status: 400 });
    }

    const comment = await db.comment.create({
      data: {
        text,
        // MCQProblemId: mcqId,
        mcqProblem: {
          connect: {
            id: mcqId,
          },
        },
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });
    return NextResponse.json(comment);
  } catch (error) {
    console.error(error);
  }
}
