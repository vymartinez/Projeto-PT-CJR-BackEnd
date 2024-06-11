import { Controller, Get, Param } from '@nestjs/common';
import { teacherService } from './teacher.service';
import { Public } from 'src/auth/decorator/isPublic.decorator';
@Controller('teacher')
export class TeacherController {
  constructor(private readonly teacherService: teacherService) {}

  @Public()
  @Get()
  findAll() {
    return this.teacherService.findAll();
  }

  @Public()
  @Get(':id')
  findTeacher(@Param('id') id: number) {
    return this.teacherService.findTeacher(Number(id));
  }
}
