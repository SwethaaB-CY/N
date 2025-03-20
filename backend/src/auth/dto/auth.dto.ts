import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class SignupDto {
  @IsNotEmpty()
  fullName: string;

  @IsEmail()
  email: string;

  @MinLength(6)
  password: string;

  @IsNotEmpty()
  userType: 'user' | 'admin';
}

import { IsString } from 'class-validator';

export class LoginDto {
  @IsNotEmpty() // Ensures field is not empty
  @IsString() // Ensures input is treated as a string
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}

export class ForgotPasswordDto {
  email: string;
}

export class ResetPasswordDto {
  resetToken: string;
  newPassword: string;
}
