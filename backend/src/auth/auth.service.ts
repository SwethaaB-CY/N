/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable prettier/prettier */

import { Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma.service';
import { SignupDto, LoginDto, ForgotPasswordDto, ResetPasswordDto } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';
import { MailService } from '../mail/mail.service';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private mailService: MailService
  ) {}

  async signup(signupDto: SignupDto) {
  const { fullName, email, password, userType } = signupDto;

  const existingUser = await this.prisma.user.findUnique({ where: { email } });
  if (existingUser) throw new BadRequestException('User already exists');

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await this.prisma.user.create({
    data: { fullName, email, password: hashedPassword, userType },
  });

  return {
    message: 'Signup successful',
    user: {
      id: user.id,
      fullName: user.fullName,
      email: user.email,
      userType: user.userType,
    },
  };
}


  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;
    const user = await this.prisma.user.findUnique({ where: { email } });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new BadRequestException('Invalid credentials');
    }

    const token = this.jwtService.sign({
      userId: user.id,
      email: user.email,
      fullName: user.fullName, // Include full name in token
      userType: user.userType,
    });

    return { 
      message: 'Login successful', 
      token, 
      userType: user.userType,
      fullName: user.fullName // Send full name in response
    };
  }

  async forgotPassword(forgotPasswordDto: ForgotPasswordDto) {
    const { email } = forgotPasswordDto;
    const user = await this.prisma.user.findUnique({ where: { email } });
  
    if (!user) throw new BadRequestException("User with this email does not exist.");
  
    // Generate reset token and expiry (1 hour from now)
    const resetToken = Math.random().toString(36).substr(2, 10);
    const resetTokenExpiry = new Date();
    resetTokenExpiry.setHours(resetTokenExpiry.getHours() + 1);
  
    await this.prisma.user.update({
      where: { email },
      data: { resetToken, resetTokenExpiry },
    });
  
    await this.mailService.sendPasswordResetEmail(email, resetToken);
    return { message: "Password reset link sent to your email." };
  }
  
  async resetPassword(resetPasswordDto: ResetPasswordDto) {
    const { resetToken, newPassword } = resetPasswordDto;

    // Verify token exists & is not expired
    const user = await this.prisma.user.findFirst({
      where: { resetToken, resetTokenExpiry: { gt: new Date() } }, // Check expiry
    });

    if (!user) {
      throw new BadRequestException('Invalid or expired token');
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update user password & remove reset token
    await this.prisma.user.update({
      where: { id: user.id },
      data: { password: hashedPassword, resetToken: null, resetTokenExpiry: null },
    });

    return { message: 'Password reset successful! Now you can log in with your new password.' };
  }
}
