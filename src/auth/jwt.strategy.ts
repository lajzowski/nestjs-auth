import { Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Request } from 'express';
import { User } from 'src/user/entities/user.entity';

export interface JwtPayload {
  id: string;
}


function cookieExtractor(req: Request): null | string {
  return (req && req.cookies) ? (req.cookies?.token ?? null) : null;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: cookieExtractor,
      ignoreExpiration: false,
      secretOrKey: process.env.secretKeyAuth,
    });
  }

  async validate(payload: JwtPayload, done: (error, user) => void) {
    if (!payload || !payload.id) {
      return done(new UnauthorizedException(), false);
    }

    const user = await User.findOne({
      where: {
        token: payload.id,
      } });

    if (!user) {
      return done(new UnauthorizedException(), false);
    }

    done(null, user);
  }
}