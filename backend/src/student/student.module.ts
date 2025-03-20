/* eslint-disable prettier/prettier */
import { Module } from "@nestjs/common";
import { StudentController } from "./student.controller";
import { StudentService } from "./student.service";
import { PrismaModule } from "../prisma/prisma.module"; // ✅ Import PrismaModule

@Module({
  imports: [PrismaModule], // ✅ Ensure PrismaModule is imported
  controllers: [StudentController],
  providers: [StudentService],
})
export class StudentModule {}
