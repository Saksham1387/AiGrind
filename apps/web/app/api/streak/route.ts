import { db } from '../../db';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try{
        const { userId } = await request.json();
        const streak = await db.streak.findUnique({
            where: { userId },
          });
        
        return NextResponse.json({streak});
    }
    catch(error){
        console.error(error);
        return NextResponse.json({ error: 'Failed to fetch streak' }, { status: 500 });
    }
}