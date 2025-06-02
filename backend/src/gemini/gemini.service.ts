// src/quiz/gemini.service.ts
import { Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class GeminiService {
  private readonly apiKey = process.env.GEMINI_API_KEY;
  private readonly apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent`;

  async generateQuestions(topics: string, difficulty: string, count: number) {
    if (!this.apiKey) {
      throw new UnauthorizedException('GEMINI_API_KEY is not set in environment variables');
    }

    const promptText = `Generate ${count} ${difficulty}-level multiple-choice questions on the following topics: ${topics}. 
Each question should be in the following JSON format:

[
  {
    "question": "Your question here?",
    "options": ["Option A", "Option B", "Option C", "Option D"],
    "correctAnswer": "Correct Option"
  }
]

Only return a JSON array of objects in this format. Do not include any explanation or extra text.`;

    const maxRetries = 5;

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        const response = await axios.post(
          `${this.apiUrl}?key=${this.apiKey}`,
          {
            contents: [
              {
                parts: [{ text: promptText }],
              },
            ],
          },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          },
        );

        const raw = response.data?.candidates?.[0]?.content?.parts?.[0]?.text;
        if (!raw) {
          throw new InternalServerErrorException('No generated text in Gemini API response');
        }

        const cleanText = this.extractJsonArray(raw);

        try {
          const questions = JSON.parse(cleanText);
          if (!Array.isArray(questions)) throw new Error();
          return questions;
        } catch {
          console.warn('Failed to parse JSON. Raw cleaned output:', cleanText);
          throw new InternalServerErrorException('Gemini API did not return valid JSON array');
        }
      } catch (error: any) {
        const statusCode = error.response?.status;
        if (statusCode === 503 && attempt < maxRetries) {
          console.warn(`Gemini API overloaded. Retry attempt ${attempt} after delay.`);
await new Promise(res => setTimeout(res, 3000 * Math.pow(2, attempt - 1)));
          continue;
        }
        console.error('Error calling Gemini API:', error.response?.data || error.message || error);
        throw new InternalServerErrorException('Failed to generate questions from Gemini API');
      }
    }

    throw new InternalServerErrorException('Gemini API overloaded, please try again later.');
  }

  private extractJsonArray(text: string): string {
    const start = text.indexOf('[');
    const end = text.lastIndexOf(']');
    if (start === -1 || end === -1 || end <= start) {
      throw new InternalServerErrorException('No JSON array found in Gemini response');
    }
    return text.slice(start, end + 1).trim();
  }
}
