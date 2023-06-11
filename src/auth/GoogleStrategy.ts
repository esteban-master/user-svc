import { Injectable, Inject } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy, VerifyCallback } from 'passport-google-oauth20';
import { AppService } from 'src/app.service';
import authConfig from '../config/AuthEnv.config';
import { ConfigType } from '@nestjs/config';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(authConfig.KEY) authEnvConfig: ConfigType<typeof authConfig>,
    private readonly appService: AppService,
  ) {
    super({
      clientID: authEnvConfig.CLIENT_ID,
      clientSecret: authEnvConfig.CLIENT_SECRET,
      callbackURL: 'http://localhost:3000/auth/google/redirect',
      scope: ['email', 'profile'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    cb: VerifyCallback,
  ) {
    const user = await this.appService.validateUser({
      email: profile._json.email,
      name: profile._json.name,
    });
    cb(null, user);
  }
}
