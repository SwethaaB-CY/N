import {
  Controller,
  Post,
  Body,
  Get,
  Req,
  UseGuards,
  UnauthorizedException,
} from '@nestjs/common';
import { QuizService } from './quiz.service';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { GenerateQuizDto } from './dto/generate-quiz.dto';
import { Request } from 'express';
import { JwtAuthGuard } from '../auth/jwt-auth.guard'; // ⚠️ adjust path as needed

interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    email?: string;
  };
}

@Controller('quiz')
export class QuizController {
  constructor(private readonly quizService: QuizService) {}

  @Post('generate')
  async generateQuiz(@Body() generateQuizDto: GenerateQuizDto) {
    return this.quizService.generateQuiz(generateQuizDto);
  }

  @UseGuards(JwtAuthGuard)
@Post('submit')
async submitQuiz(@Body() createQuizDto: CreateQuizDto, @Req() req: AuthenticatedRequest) {
  const userId = req.user?.id;
  if (!userId) {
    throw new UnauthorizedException('User must be authenticated to submit quiz');
  }
  return this.quizService.submitQuiz(userId, createQuizDto);
}





  @UseGuards(JwtAuthGuard)
  @Get('latest-score')
  async getLatestScore(@Req() req: AuthenticatedRequest) {
    const userId = req.user?.id;
    if (!userId) {
      throw new UnauthorizedException('User must be authenticated to view score');
    }
    return this.quizService.getLatestScore(userId);
  }

  @UseGuards(JwtAuthGuard)
@Get('leaderboard')
async getLeaderboard(@Req() req: AuthenticatedRequest) {
  const userId = req.user?.id;
  if (!userId) {
    throw new UnauthorizedException('User must be authenticated to view leaderboard');
  }
  return this.quizService.getLeaderboardByUser(userId);
}


@UseGuards(JwtAuthGuard)
@Get('leaderboard/user')
async getUserLeaderboard(@Req() req: AuthenticatedRequest) {
  const userId = req.user?.id;
  if (!userId) {
    throw new UnauthorizedException('User must be authenticated');
  }
  return this.quizService.getLeaderboardByUser(userId);
}

}
