export class CreateQuizDto {
  title: string;
  totalQuestions: number;
  score: number;
  difficulty: string;
  time?: number; // optional time field, in seconds
}
