import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtModule } from '@nestjs/jwt';
import { GoogleStrategy } from 'src/user/auth/GoogleStrategy';
import { AccessTokenStrategy } from 'src/user/auth/AccessTokenStrategy';
import { RefreshTokenStrategy } from 'src/user/auth/RefreshTokenStrategy';
import { UserController } from './user.controller';
import { DatabaseModule } from 'src/config/database/database.module';

@Module({
  imports: [JwtModule.register({}), DatabaseModule],
  controllers: [UserController],
  providers: [
    UserService,
    GoogleStrategy,
    AccessTokenStrategy,
    RefreshTokenStrategy,
  ],
  exports: [UserService],
})
export class UserModule {}
