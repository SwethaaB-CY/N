import { Module } from '@nestjs/common';
import { QuizController } from './quiz.controller';
import { QuizService } from './quiz.service';
import { GeminiModule } from 'src/gemini/gemini.module';

@Module({
  imports: [GeminiModule], // 👈 include it here
  controllers: [QuizController],
  providers: [QuizService]
})
export class QuizModule {}
