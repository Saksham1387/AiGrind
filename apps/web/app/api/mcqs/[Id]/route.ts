import { NextResponse } from 'next/server';
import { db } from "../../../db"; 
import { getServerSession } from "next-auth";
import { authOptions } from "../../../lib/auth";
import { updateStreak } from '../../../db/updateStreak';


export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const id = url.pathname.split('/').pop(); 

    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }

    const mcq = await db.mCQProblem.findUnique({
      where: { id },
      include: {
        options: true,
      },
    });

    if (mcq) {
      return NextResponse.json(mcq);
    } else {
      return NextResponse.json({ message: 'MCQ not found' }, { status: 404 });
    }
  } catch (error) {

    console.error(error);
    return NextResponse.json({ error: 'Failed to fetch MCQ' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
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
    const { selectedOptionId } = await request.json();
    const url = new URL(request.url);
    const mcqId = url.pathname.split('/').pop();

    if (!mcqId || !selectedOptionId || !userId) {
      return NextResponse.json({ error: 'mcqId, selectedOptionId, and userId are required' }, { status: 400 });
    }

    const mcq = await db.mCQProblem.findUnique({
      where: { id: mcqId },
      include: {
        options: true,
      },
    });

    if (!mcq) {
      return NextResponse.json({ error: 'MCQ not found' }, { status: 404 });
    }
    const correctOption = mcq.options.find(option => option.isCorrect);

    if (!correctOption) {
      return NextResponse.json({ error: 'No correct option found' }, { status: 500 });
    }

    const isCorrect = selectedOptionId === correctOption.id;

    await db.mCQSubmission.create({
      data: {
        userId,
        mcqProblemId: mcqId,
        selectedOptionId,
        result: isCorrect ? 'true' : 'false',
      },
    });

    if (isCorrect) {
      const userMCQProblem = await db.userMCQProblem.findUnique({
        where: {
          userId_mcqProblemId: {
            userId,
            mcqProblemId: mcqId,
          },
        },
      });

      if (userMCQProblem) {
        await db.userMCQProblem.update({
          where: {
            userId_mcqProblemId: {
              userId,
              mcqProblemId: mcqId,
            },
          },
          data: {
            solved: "solved",
          },
        });
      } else {
        await db.userMCQProblem.create({
          data: {
            userId,
            mcqProblemId: mcqId,
            solved: "solved",
          },
        });
      }

      await updateStreak(userId);
    }

    return NextResponse.json({
      isCorrect,
      message: isCorrect ? 'Correct answer!' : 'Incorrect answer.',
    });

  } catch (error) {
    console.error("Error in submission handler:", error);
    return NextResponse.json({ error: 'Failed to process submission' }, { status: 500 });
  }
}