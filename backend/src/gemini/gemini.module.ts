// src/gemini/gemini.module.ts
import { Module } from '@nestjs/common';
import { GeminiService } from './gemini.service';
import { HttpModule } from '@nestjs/axios';

@Module({
    imports: [HttpModule], // ✅ Add this
  providers: [GeminiService],
  exports: [GeminiService], // 👈 make it available to other modules
})
export class GeminiModule {}
