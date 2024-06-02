import {
    Controller,
    Get,
    Param,
  } from '@nestjs/common';
import { teacherService } from './teacher.service';


interface Teacher {
    id: number;
    name: string;
    departament: string;
    assesments: string;
    teacherSubjects: string;
}

@Controller('teacher')
export class TeacherController {
    constructor(private readonly teacherService: teacherService) {}

    @Get()
    findAll(): Teacher[] {
    return this.teacherService.findAll();
    }

    @Get(':id')
    findUser(@Param('id') id: number): Teacher {
    return this.teacherService.findTeacher(Number(id));
    }
}