import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { GoogleAuthGuard } from 'src/user/auth/GoogleAuthGuard';
import { Request } from 'express';

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

  @Get('test')
  test() {
    return 'TEST';
  }
}
