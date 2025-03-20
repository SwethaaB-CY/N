/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { AuthGuard } from '@nestjs/passport';

const prisma = new PrismaClient();

@Controller()
export class AppController {
  @Get('me') // Updated route to fetch only the logged-in user
  @UseGuards(AuthGuard('jwt')) // Protect the route with JWT authentication
  async getLoggedInUser(@Request() req) {
    const userId = req.user.id; // Assuming user ID is stored in JWT payload

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { fullName: true }, // Fetch only the name
    });

    return user;
  }
}
