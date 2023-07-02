import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy, StrategyOptions } from 'passport-jwt';
import { Request } from 'express';
import commonEnv from 'src/config/CommonEnv.config';
import { ConfigType } from '@nestjs/config';

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor(
    @Inject(commonEnv.KEY) commonEnvConfig: ConfigType<typeof commonEnv>,
  ) {
    const options: StrategyOptions = {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      passReqToCallback: true,
      secretOrKey: commonEnvConfig.JWT_REFRESH_SECRET,
    };
    super(options);
  }

  async validate(_: Request, payload: any) {
    return payload;
  }
}
