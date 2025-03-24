import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

interface JwtPayload {
  userId: string;
  email: string;
  fullName: string;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get<string>('JWT_SECRET'), // ✅ Use ConfigService
    });
  }

  async validate(payload: JwtPayload) {
    if (!payload?.userId) {
      throw new UnauthorizedException('Invalid or expired token');
    }

    return { id: payload.userId, email: payload.email, fullName: payload.fullName };
  }
}
