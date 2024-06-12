import { Controller, Get, Param } from '@nestjs/common';
import { subjectService } from './subject.service';
import { Public } from 'src/auth/decorator/isPublic.decorator';
@Controller('subject')
export class SubjectController {
  constructor(private readonly subjectService: subjectService) {}

  @Public()
  @Get()
  findAll() {
    return this.subjectService.findAll();
  }

  @Public()
  @Get(':id')
  findUser(@Param('id') id: number) {
    return this.subjectService.findSubject(Number(id));
  }
}
