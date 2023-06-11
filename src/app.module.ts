import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GoogleStrategy } from './auth/GoogleStrategy';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { PrismaService } from './prisma.service';
import authEnvConfig from './config/AuthEnv.config';
import commonEnvConfig from './config/CommonEnv.config';
import { JwtModule } from '@nestjs/jwt';
import { AccessTokenStrategy } from './auth/AccessTokenStrategy';
import { RefreshTokenStrategy } from './auth/RefreshTokenStrategy';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [commonEnvConfig, authEnvConfig],
      isGlobal: true,
      validationSchema: Joi.object({
        PORT: Joi.number().required(),
        CLIENT_ID: Joi.string().required(),
        PROJECT_ID: Joi.string().required(),
        CLIENT_SECRET: Joi.string().required(),
        AUTH_URI: Joi.string().required(),
      }),
    }),
    JwtModule.register({}),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    PrismaService,
    GoogleStrategy,
    AccessTokenStrategy,
    RefreshTokenStrategy,
  ],
})
export class AppModule {}
