/* eslint-disable prettier/prettier */
import { IsOptional, IsString, IsEmail, IsArray, IsNumber } from "class-validator";

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
  profilePicture?: string;

  @IsOptional()
  @IsString()
  collegeName?: string;

  @IsOptional()
  @IsArray()
  skills?: { name: string; level: string }[]; // ✅ Ensure it's an array of objects
}
