/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable prettier/prettier */
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import * as express from "express";
import { join } from "path";
import { ValidationPipe } from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ✅ Serve static files from 'uploads' folder
  app.use("/uploads", express.static(join(__dirname, "..", "uploads")));

  app.useGlobalPipes(new ValidationPipe());

  // ✅ Enable CORS (in case it's causing issues)
  app.enableCors();

  app.enableCors({
    origin: ["http://localhost:3000", "http://localhost:3001"], // ✅ Allow both projects
    credentials: true, // ✅ Allow cookies to be sent with requests
});

  await app.listen(5000);
  console.log(`🚀 Server running on http://localhost:5000`);
}

bootstrap();
