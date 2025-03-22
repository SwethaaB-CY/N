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
import { UpdateStudentDto } from "./update-student.dto"; 
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { extname, join } from "path";
import { Express } from "express"; 

@Controller("student") // Base route: /student
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  // ✅ Get Student Profile
  @Get("me") 
  @UseGuards(AuthGuard("jwt"))
  async getStudentProfile(@Request() req) {
    console.log("📢 Request User:", req.user);

    if (!req.user?.id) {
      console.error("❌ User ID is missing!");
      throw new Error("User authentication failed");
    }

    return this.studentService.getStudentById(req.user.id);
  }

  // ✅ Update Student Profile with File Upload
  @Put("me") 
  @UseGuards(AuthGuard("jwt"))
  @UseInterceptors(
    FileInterceptor("profilePicture", {
      storage: diskStorage({
        destination: join(__dirname, "../../uploads/profile_pictures"), // Save in /uploads/profile_pictures
        filename: (req, file, callback) => {
          const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
          const newFileName = `profile-${uniqueSuffix}${extname(file.originalname)}`;
          console.log("📁 Saving file:", newFileName);
          callback(null, newFileName);
        },
      }),
      fileFilter: (req, file, callback) => {
        if (!file.mimetype.match(/\/(jpg|jpeg|png)$/)) {
          return callback(new Error("Only JPG, JPEG, and PNG images are allowed!"), false);
        }
        callback(null, true);
      },
    })
  )
  async updateStudentProfile(
    @Request() req,
    @Body() updateStudentDto: UpdateStudentDto,
    @UploadedFile() file?: Express.Multer.File
  ) {
    console.log("🔄 Updating Student ID:", req.user?.id);

    if (!req.user?.id) {
      console.error("❌ User ID is missing!");
      throw new Error("Unauthorized access");
    }

    try {
      // ✅ Handle profile picture upload
      if (file) {
        console.log("✅ Uploaded file:", file.filename);
        updateStudentDto.profilePicture = `/uploads/profile_pictures/${file.filename}`;
      } else {
        console.warn("⚠️ No profile picture uploaded.");
      }

      // ✅ Convert skills array to JSON string before saving
      if (updateStudentDto.skills) {
        updateStudentDto.skills = JSON.parse(JSON.stringify(updateStudentDto.skills)) as { name: string; level: string }[];
      }

      const updatedStudent = await this.studentService.updateStudent(req.user.id, updateStudentDto);
      console.log("✅ Student updated successfully:", updatedStudent);

      return { message: "Profile updated successfully", student: updatedStudent };
    } catch (error) {
      console.error("❌ Error updating student profile:", error);
      throw new Error("Failed to update student profile.");
    }
  }
}
