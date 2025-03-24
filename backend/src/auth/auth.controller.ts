/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable prettier/prettier */

import { Controller, Post, Body, BadRequestException, Logger, Get, UseGuards, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto, LoginDto, ForgotPasswordDto, ResetPasswordDto } from './dto/auth.dto';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';  // ✅ Import Request and Response from Express


// ✅ Custom interface for req.user
interface AuthenticatedRequest extends Request {
  user?: any; // Change `any` to your User type if available
}

@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);

  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signup(@Body() signupDto: SignupDto) {
    return this.authService.signup(signupDto);
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto, @Res({ passthrough: true }) res: Response) {
    const { token, userType } = await this.authService.login(loginDto);

    res.cookie("token", token, {
      httpOnly: true,  
      secure: false,   
      sameSite: "none",  // ✅ Allow cross-domain cookies
      domain: "localhost", // ✅ Ensures it works on subdomains
    });
    return { message: 'Login successful', token, userType };
  }

  @Get('validate')
  @UseGuards(AuthGuard('jwt'))  // ✅ Ensure it's using the JWT guard
  validateUser(@Req() req: AuthenticatedRequest) {  // ✅ Use custom interface
    return req.user; // Return authenticated user details
  } // Return authenticated user details

  @Post('forgot-password')
  async forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto) {
    if (!forgotPasswordDto.email) {
      throw new BadRequestException('Email is required');
    }
    return this.authService.forgotPassword(forgotPasswordDto);
  }

  @Post('reset-password')
  async resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    try {
      const { resetToken, newPassword } = resetPasswordDto;

      this.logger.log(`Received reset request - Token: ${resetToken}, New Password: ${newPassword}`);

      if (!resetToken || !newPassword) {
        throw new BadRequestException('Reset token and new password are required');
      }

      return await this.authService.resetPassword(resetPasswordDto);
    } catch (error) {
      this.logger.error(`Error resetting password: ${error.message}`);
      throw new BadRequestException(error.message || 'Failed to reset password');
    }
  }
}
