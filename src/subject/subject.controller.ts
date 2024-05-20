import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query } from '@nestjs/common';
import { subjectService } from './subject.service';
import { SubjectDTO } from './dto/subject.dto';
import { UpdateSubjectDTO } from './dto/update-subject.dto';


//o controlador lida com as requisições http
@Controller('avaliacao')
export class SubjectController{
  constructor(private readonly subjectService: subjectService){}

  @Post()
  async create(@Body() subjectDTO: SubjectDTO){
    return this.subjectService.create(subjectDTO);
  }

  @Get()
  async findAll(){
    return this.subjectService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string){
    return this.subjectService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateAvaliacaoDTO: UpdateSubjectDTO){
    return this.subjectService.update(+id, updateAvaliacaoDTO);
  }

  @Delete(':id')
  async remove(@Param('id') id: string){
    return this.subjectService.remove(+id);
  }
  

}
