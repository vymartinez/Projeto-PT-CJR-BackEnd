import { Module } from '@nestjs/common';
import { teacherService } from './teacher.service';
import { TeacherController } from './teacher.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [TeacherController],
  providers: [teacherService, PrismaService],
})
export class TeacherModule {}
