import PasswordResetMail from '../emails/password-reset-mail';
import { User } from '@prisma/client';
import { render } from '@react-email/render';
import nodemailer from 'nodemailer';

// Create a transporter with your Gmail account credentials
const transporter = nodemailer.createTransport({
  service: 'outlook',
  auth: {
    user: process.env.EMAIL_ACCOUNT,
    pass: process.env.EMAIL_ACCOUNT_PASSWORD,
  },
});

export const sendResetPasswordEmail = async (token: string, user: User) => {
  try {
    const emailHTML = render(PasswordResetMail({ token, user }));
    await transporter.sendMail({
      from: process.env.EMAIL_ACCOUNT,
      to: user.email,
      subject: 'Reset Password Instructions',
      html: emailHTML,
    });
  } catch (error) {
    console.log(
      '🚀 ~ file: mailer.ts:26 ~ sendResetPasswordEmail ~ error:',
      error
    );
  }
};

export default transporter;
