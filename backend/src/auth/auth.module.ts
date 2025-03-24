import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaService } from '../prisma.service';
import { JwtModule } from '@nestjs/jwt';
import { MailModule } from '../mail/mail.module';
import { JwtStrategy } from './jwt.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config'; // ✅ Import ConfigModule & ConfigService

@Module({
  imports: [
    ConfigModule.forRoot(), // ✅ Load environment variables
    JwtModule.registerAsync({
      imports: [ConfigModule], // ✅ Ensure ConfigModule is included
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET') || 'fallback_secret',
        signOptions: { expiresIn: '1h' },
      }),
    }),
    MailModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, PrismaService, JwtStrategy],
  exports: [AuthService, JwtStrategy],
})
export class AuthModule {}
