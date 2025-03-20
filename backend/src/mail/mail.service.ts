/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  private transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.EMAIL_USER, // Ensure this is set in .env
      pass: process.env.EMAIL_PASS, // Use App Password if needed
    },
  });

  async sendPasswordResetEmail(email: string, resetToken: string) {
    const resetLink = `http://localhost:3000/reset-password?token=${resetToken}`;

    try {
      await this.transporter.sendMail({
        from: process.env.EMAIL_USER, // ✅ Ensure correct sender email
        to: email,
        subject: "Password Reset Request",
        text: `Click here to reset your password: ${resetLink}`,
        html: `<p>Click <a href="${resetLink}">here</a> to reset your password.</p>`,
      });

      console.log(`Password reset email sent to ${email}`);
    } catch (error) {
      console.error('Error sending email:', error);
      throw new InternalServerErrorException('Error sending password reset email');
    }
  }
}
