/* eslint-disable prettier/prettier */
import { IsEmail, IsOptional, IsString } from "class-validator";

export class UpdatePersonalInfoDto {
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
  profilePicture?: string; // Store image URL
}
