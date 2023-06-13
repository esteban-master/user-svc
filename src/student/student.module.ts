import { Module } from '@nestjs/common';
import { StudentController } from './student.controller';
import { PrismaService } from 'src/config/database/prisma.service';
import { StudentService } from './student.service';
import { DatabaseModule } from 'src/config/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [StudentController],
  providers: [StudentService, PrismaService],
})
export class StudentModule {}
