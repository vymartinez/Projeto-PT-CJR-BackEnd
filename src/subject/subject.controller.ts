import { Controller, Get, Param } from '@nestjs/common';
import { subjectService } from './subject.service';
@Controller('subject')
export class SubjectController {
  constructor(private readonly subjectService: subjectService) {}

  @Get()
  findAll() {
    return this.subjectService.findAll();
  }

  @Get(':id')
  findUser(@Param('id') id: number) {
    return this.subjectService.findSubject(Number(id));
  }
}
