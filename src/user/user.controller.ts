import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { GoogleAuthGuard } from 'src/user/auth/GoogleAuthGuard';
import { Request } from 'express';
import { AccessTokenGuard } from './auth/AccessTokenGuard';
import { RefreshTokenGuard } from './auth/RefreshTokenGuard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('google/login')
  @UseGuards(GoogleAuthGuard)
  login() {
    return;
  }

  @Get('google/redirect')
  @UseGuards(GoogleAuthGuard)
  redirect(@Req() req: Request) {
    return req.user;
  }

  @Post('/logout')
  @UseGuards(AccessTokenGuard)
  @HttpCode(HttpStatus.OK)
  logout(@Req() req: Request) {
    return this.userService.logout(req.user['id']);
  }

  @Post('/refresh')
  @UseGuards(RefreshTokenGuard)
  @HttpCode(HttpStatus.OK)
  refresh(@Req() req: Request) {
    return this.userService.refreshTokens(req.user['id']);
  }

  @Post('/validate')
  @UseGuards(AccessTokenGuard)
  @HttpCode(HttpStatus.OK)
  validate(@Req() req: Request) {
    return {
      id: req.user['id'],
      email: req.user['email'],
    };
  }
}
