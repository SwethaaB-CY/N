/* eslint-disable prettier/prettier */
import { Global, Module } from "@nestjs/common";
import { PrismaService } from "../prisma.service";

@Global() // ✅ Make PrismaService available globally
@Module({
  providers: [PrismaService],
  exports: [PrismaService], // ✅ Export PrismaService
})
export class PrismaModule {}
