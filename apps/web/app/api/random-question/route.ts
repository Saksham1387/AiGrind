import { NextResponse } from 'next/server';
import { db } from '../../db';


export async function GET() {
  try {
    const totalMCQs = await db.mCQProblem.count();
    const totalCodingProblems = await db.problem.count();
    const total = totalMCQs + totalCodingProblems;

    const randomIndex = Math.floor(Math.random() * total);

    if (randomIndex < totalMCQs) {
      const mcq = await db.mCQProblem.findFirst({
        skip: randomIndex,
        take: 1,
      });
      return NextResponse.json({ type: 'mcq', id: mcq?.id });
    } else {
      const problem = await db.problem.findFirst({
        skip: randomIndex - totalMCQs,
        take: 1,
      });
      return NextResponse.json({ type: 'coding', id: problem?.id });
    }
  } catch (error) {
    console.error('Error fetching random question:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}