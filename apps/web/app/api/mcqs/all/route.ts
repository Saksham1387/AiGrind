import { NextRequest, NextResponse } from "next/server";
import { db } from "../../../db";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../lib/auth";

export async function GET(req: NextRequest, request: Request) {
  const session = await getServerSession(authOptions);

  const mcqs = await db.mCQProblem.findMany();

  return NextResponse.json(
    {
      mcqs,
    },
    {
      status: 200,
    }
  );
}
