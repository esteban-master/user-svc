import { Injectable, Inject } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy, StrategyOptions } from 'passport-jwt';
import commonEnv from 'src/config/CommonEnv.config';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private readonly userService: UserService,
    @Inject(commonEnv.KEY) commonEnvConfig: ConfigType<typeof commonEnv>,
  ) {
    const options: StrategyOptions = {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: commonEnvConfig.JWT_ACCESS_SECRET,
    };
    super(options);
  }

  async validate({ email }: any) {
    return await this.userService.find({ email });
  }
}
