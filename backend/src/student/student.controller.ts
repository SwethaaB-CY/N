/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable prettier/prettier */

import { 
  Controller, 
  Get, 
  Put, 
  Body, 
  Request, 
  UseGuards, 
  UseInterceptors, 
  UploadedFile 
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { StudentService } from "./student.service";
import { UpdateStudentDto } from "../student/update-student.dto"; 
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { extname, join } from "path";
import { Express } from "express"; // ✅ Fix for Multer.File type

@Controller("student") // ✅ Base route: /student
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  // ✅ Get Full Student Profile
  @Get("me") // Route: GET /student/me
  @UseGuards(AuthGuard("jwt"))
  async getStudentProfile(@Request() req) {
    console.log("📢 Request User:", req.user);

    if (!req.user?.id) {
      console.error("❌ User ID is missing in the request!");
      throw new Error("User authentication failed");
    }

    return this.studentService.getStudentById(req.user.id);
  }

  // ✅ Update Student Personal Info with Profile Picture Upload
  @Put("me") // Route: PUT /student/me
  @UseGuards(AuthGuard("jwt"))
  @UseInterceptors(
    FileInterceptor("profilePicture", {
      storage: diskStorage({
        destination: join(__dirname, "../../uploads"), // ✅ Ensuring correct path
        filename: (req, file, callback) => {
          const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
          const newFileName = `${file.fieldname}-${uniqueSuffix}${extname(file.originalname)}`;
          console.log("📁 Saving file:", newFileName);
          callback(null, newFileName);
        },
      }),
    })
  )
  async updateStudentProfile(
    @Request() req,
    @Body() updateStudentDto: UpdateStudentDto,
    @UploadedFile() file: Express.Multer.File // ✅ Fix applied here
  ) {
    console.log("🔄 Updating Student ID:", req.user?.id);

    if (!req.user?.id) {
      console.error("❌ User ID is missing!");
      throw new Error("Unauthorized access");
    }

    if (file) {
      console.log("✅ Uploaded file:", file.filename);
      const filePath = `/uploads/${file.filename}`;
      updateStudentDto.profilePicture = filePath;
      console.log("📷 Profile picture path saved:", filePath);
    } else {
      console.warn("⚠️ No file uploaded, keeping existing profile picture.");
    }

    return this.studentService.updateStudent(req.user.id, updateStudentDto);
  }
}
