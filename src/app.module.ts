import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import authEnvConfig from './config/AuthEnv.config';
import commonEnvConfig from './config/CommonEnv.config';
import { StudentModule } from './student/student.module';
import { UserModule } from './user/user.module';
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
        DATABASE_URL: Joi.string().required(),
      }),
    }),
    UserModule,
    StudentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
