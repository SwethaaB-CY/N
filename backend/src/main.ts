/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable prettier/prettier */
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import * as express from "express";
import { join } from "path";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ✅ Serve static files from 'uploads' folder
  app.use("/uploads", express.static(join(__dirname, "..", "uploads")));

  // ✅ Enable CORS (in case it's causing issues)
  app.enableCors();

  await app.listen(5000);
  console.log(`🚀 Server running on http://localhost:5000`);
}

bootstrap();
