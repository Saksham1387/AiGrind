import { NextResponse } from "next/server";
import { db } from "../../../db";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from 'uuid';
import { sendResetEmail } from "../../../lib/emailer";

export async function POST(request: Request) {
    try {
        const { token, password } = await request.json();
        console.log(token);
        const resetToken = await db.resetToken.findUnique({
            where: { token },
            include: { user: true },
          });

        if (!resetToken || resetToken.expiration < new Date()) {
            return NextResponse.json({ message: 'Token is invalid or expired' },{status:400});
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        await db.user.update({
            where: { id: resetToken.userId },
            data: { password: hashedPassword },
        });
        await db.resetToken.delete({ where: { token } });
        return NextResponse.json({ message: 'Password reset successfully' },{status:200});
        
    } catch (error) {
      console.error("Error during sign-up:", error);
      return NextResponse.json(
        { error: "Internal Server Error" },
        { status: 500 }
      );
    }
  }
  