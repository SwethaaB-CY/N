import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { UpdateStudentDto } from "./update-student.dto";

@Injectable()
export class StudentService {
  constructor(private prisma: PrismaService) {}

  // ✅ Get Student Profile
  async getStudentById(id: string) {
    console.log("🔍 Fetching Student by ID:", id);

    if (!id) {
      console.error("❌ Missing user ID.");
      throw new Error("User ID is required.");
    }

    try {
      const student = await this.prisma.user.findUnique({
        where: { id },
        select: {
          fullName: true,
          email: true,
          phoneNumber: true,
          gender: true,
          profilePicture: true,
          student: {
            select: {
              collegeName: true,
              skills: true,
            },
          },
        },
      });

      if (!student) {
        console.warn("⚠️ No student found with ID:", id);
        throw new Error("Student not found.");
      }

      // ✅ Parse skills JSON before sending response
      if (student.student?.skills) {
        try {
          student.student.skills = Array.isArray(student.student.skills) 
            ? student.student.skills 
            : typeof student.student.skills === 'string' 
              ? JSON.parse(student.student.skills) 
              : [];
        } catch (error) {
          console.warn("⚠️ Failed to parse skills JSON. Returning empty array.");
          student.student.skills = [];
        }
      }
      

      return student;
    } catch (error) {
      console.error("❌ Error fetching student:", error);
      throw new Error("Failed to retrieve student profile.");
    }
  }

  // ✅ Update Student Profile (Including Profile Picture & Skills)
  async updateStudent(id: string, data: UpdateStudentDto) {
    console.log("🔄 Updating Student:", id, data);
    console.log("🛠 Received skills data:", data.skills);
  
    if (!id) {
      console.error("❌ Missing User ID.");
      throw new Error("User ID is required.");
    }
  
    try {
      // ✅ Ensure `skills` is stored as JSON
      const formattedSkills = data.skills && Array.isArray(data.skills) 
        ? JSON.stringify(data.skills) 
        : "[]"; // Default to empty array if undefined
  
      console.log("📌 Storing formatted skills:", formattedSkills);
  
      const updatedUser = await this.prisma.user.update({
        where: { id },
        data: {
          fullName: data.fullName,
          email: data.email,
          phoneNumber: data.phoneNumber,
          gender: data.gender,
          profilePicture: data.profilePicture || undefined,
          student: {
            upsert: {
              create: {
                collegeName: data.collegeName || "Unknown College",
                skills: formattedSkills, // ✅ Store JSON string
              },
              update: {
                collegeName: data.collegeName,
                skills: formattedSkills, // ✅ Ensure update happens
              },
            },
          },
        },
        include: { student: true },
      });
  
      console.log("✅ Student updated successfully:", updatedUser);
      return updatedUser;
    } catch (error) {
      console.error("❌ Error updating student:", error);
      throw new Error("Failed to update student profile.");
    }
  }
}  