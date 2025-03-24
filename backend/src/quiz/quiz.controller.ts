import { Controller, Post, Body, Req, UnauthorizedException, Inject } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { firstValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';

// ✅ DTO for validation
class QuizDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsNumber()
  totalQuestions: number;

  @IsNotEmpty()
  @IsNumber()
  score: number;
}

@Controller('quiz')
export class QuizController {
  constructor(
    private readonly jwtService: JwtService, // ✅ Inject JwtService
    @Inject(HttpService) private readonly httpService: HttpService // ✅ Inject HttpService
  ) {}

  @Post('submit')
async submitQuiz(@Req() req: Request, @Body() quizData: QuizDto) {
  console.log("🔹 Received Quiz Submission Request");

  const authHeader = req.headers.authorization;
  console.log("🔹 Authorization Header:", authHeader);

  if (!authHeader) {
    console.error("❌ Authorization header missing");
    throw new UnauthorizedException('Authorization header missing');
  }

  const token = authHeader.split(' ')[1];
  if (!token) {
    console.error("❌ JWT token missing");
    throw new UnauthorizedException('JWT token missing');
  }

  try {
    const decodedUser = this.jwtService.verify(token);
    console.log("✅ Decoded User:", decodedUser);

    if (!decodedUser.userId) {
      console.error("❌ User ID missing in token");
      throw new UnauthorizedException('User ID missing in token');
    }

    // ✅ Ensure the title is correctly set before sending to Project B
    const quizSubmission = {
      userId: decodedUser.userId, // ✅ Ensure userId is sent
      title: quizData.title, // ✅ Ensure title is passed correctly
      totalQuestions: quizData.totalQuestions,
      score: quizData.score,
    };

    console.log("✅ Sending quiz data to Project B (5001):", quizSubmission);

    // ✅ Send request to Project B
    const response = await firstValueFrom(
      this.httpService.post('http://localhost:5001/quiz/submit', quizSubmission, {
        headers: { Authorization: `Bearer ${token}` },
      })
    );

    console.log("✅ Response from Project B:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Error submitting quiz:", error.response?.data || error.message);
    throw new UnauthorizedException('Error submitting quiz');
  }
}
}