import { Injectable, Inject } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy, VerifyCallback } from 'passport-google-oauth20';
import authConfig from '../../config/AuthEnv.config';
import { ConfigType } from '@nestjs/config';
import { UserService } from 'src/user/user.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(authConfig.KEY) authEnvConfig: ConfigType<typeof authConfig>,
    private readonly userService: UserService,
  ) {
    super({
      clientID: authEnvConfig.CLIENT_ID,
      clientSecret: authEnvConfig.CLIENT_SECRET,
      callbackURL: authEnvConfig.CALLBACK_URL,
      scope: ['email', 'profile'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    cb: VerifyCallback,
  ) {
    const user = await this.userService.validateUser({
      email: profile._json.email,
      name: profile._json.name,
    });
    cb(null, user);
  }
}
