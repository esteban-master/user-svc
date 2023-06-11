import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { GoogleAuthGuard } from './auth/GoogleAuthGuard';
import { Request } from 'express';
import { AccessTokenGuard } from './auth/AccessTokenGuard';
import { RefreshTokenGuard } from './auth/RefreshTokenGuard';

@Controller('auth')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('google/login')
  @UseGuards(GoogleAuthGuard)
  getHello(): string {
    return null;
  }

  @Get('google/redirect')
  @UseGuards(GoogleAuthGuard)
  handleRedirect(@Req() req: Request) {
    return req.user;
  }

  @Get('jwt')
  @UseGuards(AccessTokenGuard)
  useJwt(@Req() req: Request) {
    return req.user;
  }

  @Get('jwt-re')
  @UseGuards(RefreshTokenGuard)
  useRefreshJwt() {
    return 328;
  }
}
