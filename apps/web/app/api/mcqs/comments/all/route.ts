import { getServerSession } from "next-auth";
import { db } from "../../../../db";
import { NextResponse } from "next/server";
import { authOptions } from "../../../../lib/auth";
import exp from "constants";

async function POST(request: Request) {
  try {
    const { mcqId } = await request.json();
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
export default POST;