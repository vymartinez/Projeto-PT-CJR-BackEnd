import { Module } from '@nestjs/common';
import { teacherService } from './teacher.service';
import { TeacherController } from './teacher.controller';

@Module({
  controllers: [TeacherController],
  providers: [teacherService],
})
export class TeacherModule {}
