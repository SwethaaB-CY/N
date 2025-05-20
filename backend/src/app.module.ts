/* eslint-disable prettier/prettier */
import { Module } from "@nestjs/common";
import { AuthModule } from "./auth/auth.module";
import { StudentModule } from "./student/student.module";
import { ConfigModule } from "@nestjs/config";
import { InterviewModule } from './interview/interview.module';

@Module({
  imports: [ConfigModule.forRoot(), AuthModule, StudentModule, InterviewModule],
})
export class AppModule {}
