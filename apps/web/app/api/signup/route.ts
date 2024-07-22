import { NextResponse } from 'next/server';
import { db } from '../../db';
import bcrypt from 'bcrypt';

export async function POST(request: Request) {
  

  try {
    const { fullname, username, email, password } = await request.json();
    
    if (!fullname || !username || !email || !password) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }


    const existingUser = await db.user.findFirst({
      where: {
        email
      }
    });

    if (existingUser) {
      return NextResponse.json({ error: 'User already exists' }, { status: 400 });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await db.user.create({
      data: {
        name: fullname,
        username,
        email,
        password: hashedPassword
      }
    });

    return NextResponse.json(user, { status: 201 }); // 201 Created

  } catch (error) {
    console.error('Error during sign-up:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}