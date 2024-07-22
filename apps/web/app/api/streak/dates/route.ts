import { db } from '../../../db';
import { NextResponse } from 'next/server';
import { getServerSession } from "next-auth";
import { authOptions } from '../../../lib/auth';

export async function GET(request: Request) {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    try{
        const userId = session.user.id;
        const streakDates = await db.streakDate.findMany({
            where: { userId },
            orderBy: { date: 'asc' },
          });
        
        return NextResponse.json({streakDates});
    }
    catch(error){
        console.error(error);
        return NextResponse.json({ error: 'Failed to fetch streak' }, { status: 500 });
    }
}

