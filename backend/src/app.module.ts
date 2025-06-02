/* eslint-disable prettier/prettier */
import { Module } from "@nestjs/common";
import { AuthModule } from "./auth/auth.module";
import { StudentModule } from "./student/student.module";
import { ConfigModule } from "@nestjs/config";
import { InterviewModule } from './interview/interview.module';
import { QuizModule } from './quiz/quiz.module';


@Module({
  imports: [ConfigModule.forRoot(), AuthModule, StudentModule, InterviewModule, QuizModule,],
})
export class AppModule {}
