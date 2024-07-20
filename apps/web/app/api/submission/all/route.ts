import { db } from "../../../db";
import { NextResponse } from 'next/server';

export async function GET() {
    const problems = await db.problem.findMany({
        where: {
          hidden: false,
        },
        include: {
          defaultCode: true,
        },
      });
    return NextResponse.json(problems);
}