/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable prettier/prettier */

import { Controller, Post, Body, BadRequestException, Logger } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto, LoginDto, ForgotPasswordDto, ResetPasswordDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);

  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signup(@Body() signupDto: SignupDto) {
    return this.authService.signup(signupDto);
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    const { token, userType } = await this.authService.login(loginDto);
    return { message: 'Login successful', token, userType };
  }

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

      // Log the received data for debugging
      this.logger.log(`Received reset request - Token: ${resetToken}, New Password: ${newPassword}`);

      if (!resetToken || !newPassword) {
        throw new BadRequestException('Reset token and new password are required');
      }

      return await this.authService.resetPassword(resetPasswordDto);
    } catch (error) {
      this.logger.error('Error resetting password:', error);
      throw new BadRequestException(error.message || 'Failed to reset password');
    }
  }
}
