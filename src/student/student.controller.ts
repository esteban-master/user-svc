import { Controller, Body, Post, Get } from '@nestjs/common';
import { StudentService } from './student.service';

@Controller('student')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Post()
  create(@Body() body: { userId: number }) {
    return this.studentService.create({ userId: body.userId });
  }

  @Get()
  get() {
    return this.studentService.get({ include: { user: true } });
  }
}
