import { db } from '../../../db';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try{
        const { userId } = await request.json();
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

