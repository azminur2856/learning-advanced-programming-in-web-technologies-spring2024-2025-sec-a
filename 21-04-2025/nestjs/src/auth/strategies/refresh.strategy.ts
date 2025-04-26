import { ConfigType } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthJwtPayload } from '../types/auth-jwtPayload';
import { Inject, Injectable } from '@nestjs/common';
import refreshJwtConfig from '../config/refresh-jwt.config';
import { Request } from 'express';
import { AuthService } from '../auth.service';

@Injectable()
export class RefreshJwtStrategy extends PassportStrategy(
  Strategy,
  'refresh-jwt',
) {
  constructor(
    @Inject(refreshJwtConfig.KEY)
    private refreshJwtConfigeration: ConfigType<typeof refreshJwtConfig>,
    private authService: AuthService,
  ) {
    if (!refreshJwtConfigeration.secret) {
      throw new Error('JWT Refresh secret is not defined');
    }
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: refreshJwtConfigeration.secret,
      ignoreExpiration: false,
      passReqToCallback: true,
    });
  }

  //authorization: Bearer sldfk;lsdkf'lskald'sdkf;sdl
  validate(req: Request, payload: AuthJwtPayload) {
    const refreshToken = req
      .get('authorization')
      ?.replace('Bearer ', '')
      .trim();

    const userId = payload.sub;
    if (!refreshToken) {
      throw new Error('Refresh token is missing');
    }
    return this.authService.validateRefreshToken(userId, refreshToken);
  }
}
