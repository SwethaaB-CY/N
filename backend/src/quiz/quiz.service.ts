// src/quiz/quiz.service.ts
import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { GenerateQuizDto } from './dto/generate-quiz.dto';
import { GeminiService } from '../gemini/gemini.service';

@Injectable()
export class QuizService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly geminiService: GeminiService,
  ) {}

  async generateQuiz(generateQuizDto: GenerateQuizDto) {
  try {
    const { topics, difficulty, count } = generateQuizDto;
    const questionsOrText = await this.geminiService.generateQuestions(topics, difficulty, count);

    // If questionsOrText is an array, return as is
    if (Array.isArray(questionsOrText)) {
      return { questions: questionsOrText };
    }

    // If raw string returned, wrap in object or throw error if needed
    // Here, we return raw text in a field so frontend can decide what to do
    return { rawOutput: questionsOrText };

  } catch (error) {
    console.error('Error in generateQuiz:', error);
    throw new InternalServerErrorException('Failed to generate quiz');
  }
}


  async submitQuiz(userId: string, createQuizDto: CreateQuizDto) {
  // Confirm student exists
  const student = await this.prisma.student.findUnique({ where: { userId } });
  if (!student) {
    throw new NotFoundException('Student profile not found');
  }

  // Save quiz result linked to student
  return await this.prisma.quiz.create({
    data: {
      userId,
      title: createQuizDto.title,
      totalQuestions: createQuizDto.totalQuestions,
      score: createQuizDto.score,
      difficulty: createQuizDto.difficulty,
        time: createQuizDto.time,  // Save the time here

    },
  });
}


  async getLatestScore(userId: string) {
    try {
      return await this.prisma.quiz.findFirst({
        where: { userId },
        orderBy: { createdAt: 'desc' },
      });
    } catch (error) {
      console.error('Error in getLatestScore:', error);
      throw new InternalServerErrorException('Failed to fetch latest score');
    }
  }

  async getLeaderboard() {
    try {
      return await this.prisma.quiz.findMany({
        orderBy: { score: 'desc' },
        take: 10,
        include: {
          student: {
            include: {
              user: true,
            },
          },
        },
      });
    } catch (error) {
      console.error('Error in getLeaderboard:', error);
      throw new InternalServerErrorException('Failed to fetch leaderboard');
    }
 }

 async getLeaderboardByUser(userId: string) {
  try {
    return await this.prisma.quiz.findMany({
      where: { userId },
      orderBy: [
        { score: 'desc' },
        { createdAt: 'asc' }
      ],
      include: {
        student: {
          include: {
            user: true,
          },
        },
      },
    });
  } catch (error) {
    console.error('Error in getLeaderboardByUser:', error);
    throw new InternalServerErrorException('Failed to fetch leaderboard');
  }
}


}
