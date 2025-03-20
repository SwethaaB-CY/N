/* eslint-disable prettier/prettier */
import { IsOptional, IsString, IsEmail } from "class-validator";

export class UpdateStudentDto {
  @IsOptional()
  @IsString()
  fullName?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  phoneNumber?: string;

  @IsOptional()
  @IsString()
  gender?: string;

  @IsOptional()
  @IsString()
  collegeName?: string;

  @IsOptional()
  @IsString()
  profilePicture?: string;
  skills: any;
  certifications: any;
  achievements: any;
  projects: any;
  socialLinks: any;
  resumeFile: string;
}
