import { Controller, Get, Param } from '@nestjs/common';
import { teacherService } from './teacher.service';
@Controller('teacher')
export class TeacherController {
  constructor(private readonly teacherService: teacherService) {}

  @Get()
  findAll() {
    return this.teacherService.findAll();
  }

  @Get(':id')
  findUser(@Param('id') id: number) {
    return this.teacherService.findTeacher(Number(id));
  }
}
