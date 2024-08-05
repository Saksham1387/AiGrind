import { Resend } from 'resend';
import { EmailTemplate } from '../../components/email-template';

const resend = new Resend("re_6PfKsMVN_GtyfRAiuqa1tzsvtZNFb5YQf");

export const sendResetEmail = async (email:string, token:string) => {
  
  const resetUrl = `${process.env.NEXTAUTH_URL}/resetpassword?token=${token}`;

  const { data, error } = await resend.emails.send({
    from: 'Acme <onboarding@resend.dev>',
    to: email,
    subject: 'Password Reset',
    react: EmailTemplate( {resetUrl }),
  });
  if (error) {
    return "Error sending email";
  }
};


