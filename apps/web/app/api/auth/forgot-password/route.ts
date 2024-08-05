import { NextResponse } from "next/server";
import { db } from "../../../db";
import { v4 as uuidv4 } from 'uuid';
import { sendResetEmail } from "../../../lib/emailer";

export async function POST(request: Request) {
    try {
        const { email } = await request.json();
        console.log(email);
        const user = await db.user.findUnique({ where: { email } });
        if (!user) {
            return NextResponse.json({ message: 'User not found' }, { status: 404 });
        }

        const token = uuidv4();
        const expiration = new Date();
        expiration.setHours(expiration.getHours() + 1);

        await db.resetToken.create({
            data: {
              token,
              userId: user.id,
              expiration,
            },
        });
        console.log("control here")
        console.log(token);
        await sendResetEmail(user.email, token);
        console.log("control here")
        return NextResponse.json({ message: 'Password reset link sent.Please check your Inbox' }, { status: 200 });
    } catch (error) {
      console.error("Error during sign-up:", error);
      return NextResponse.json(
        { error: "Internal Server Error" },
        { status: 500 }
      );
    }
  }
  