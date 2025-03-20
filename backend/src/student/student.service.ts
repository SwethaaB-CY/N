/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable prettier/prettier */
import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { UpdateStudentDto } from "../student/update-student.dto";

@Injectable()
export class StudentService {
  constructor(private prisma: PrismaService) {}

  // ✅ Get Student Profile
  async getStudentById(id: string) {
    console.log("🔍 Fetching Student by ID:", id); // Debugging log

    if (!id) {
      console.error("❌ User ID is undefined. Authentication might be failing.");
      throw new Error("User ID is missing. Cannot fetch student profile.");
    }

    try {
      const student = await this.prisma.user.findUnique({
        where: { id },
        select: {
          fullName: true,
          email: true,
          phoneNumber: true,
          gender: true,
          collegeName: true,
          profilePicture: true, // ✅ Ensure this field is in your Prisma schema
        },
      });

      if (!student) {
        console.warn("⚠️ No student found with ID:", id);
        throw new Error("Student not found.");
      }

      return student;
    } catch (error) {
      console.error("❌ Error fetching student:", error);
      throw new Error("Failed to retrieve student profile.");
    }
  }

  // ✅ Update Student Profile
  async updateStudent(id: string, data: UpdateStudentDto) {
    console.log("🔄 Updating Student in DB:", id, data); // Debugging log

    if (!id) {
      console.error("❌ Cannot update student: Missing ID.");
      throw new Error("User ID is missing. Cannot update student profile.");
    }

    // Handle profile picture update correctly
    const updateData: any = { ...data };
    if (data.profilePicture) {
      updateData.profilePicture = data.profilePicture; // ✅ Store the file path
    }

    try {
      const updatedStudent = await this.prisma.user.update({
        where: { id },
        data: updateData,
      });

      console.log("✅ Student updated successfully:", updatedStudent);
      return updatedStudent;
    } catch (error) {
      console.error("❌ Error updating student:", error);
      throw new Error("Failed to update student profile.");
    }
  }
}
