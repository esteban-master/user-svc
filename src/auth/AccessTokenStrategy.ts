import { Injectable, Inject } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy, StrategyOptions } from 'passport-jwt';
import { AppService } from 'src/app.service';
import commonEnv from 'src/config/CommonEnv.config';

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private readonly appService: AppService,
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
    return await this.appService.findUser(email);
  }
}
