import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { Request } from 'express';

interface JwtPayload {
  sub: string;
  iat: number;
  [key: string]: any;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(config: ConfigService) {
    const secret = config.get<string>('JWT_SECRET');

    if (!secret) {
      throw new Error('JWT_SECRET is not defined');
    }

    const cookieExtractor = (req: Request): string | null => {
      const cookies = req.cookies as { access_token?: string } | undefined;
      return cookies?.access_token ?? null;
    };

    super({
      jwtFromRequest: cookieExtractor,
      secretOrKey: secret,
    });
  }

  validate(payload: JwtPayload): JwtPayload {
    return payload;
  }
}
