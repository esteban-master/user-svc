import { Injectable, BadRequestException } from '@nestjs/common';
import { Prisma, Student } from '@prisma/client';
import { PrismaService } from 'src/config/database/prisma.service';

@Injectable()
export class StudentService {
  constructor(private readonly prisma: PrismaService) {}

  async get(options: Prisma.StudentFindManyArgs): Promise<Student[]> {
    return await this.prisma.student.findMany(options);
  }

  async create({ userId }: { userId: number }): Promise<Student> {
    const student = await this.find({ userId });

    if (student) {
      throw new BadRequestException('Ya existe un estudiante con ese usuario');
    }
    const createStudent = await this.prisma.student.create({
      data: {
        userId,
      },
    });
    return createStudent;
  }

  async find(where: Prisma.StudentWhereInput): Promise<Student> {
    return await this.prisma.student.findFirst({ where });
  }
}
