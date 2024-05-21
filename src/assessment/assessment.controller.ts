import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { assessmentService } from './assessment.service';
import { AssessmentDTO } from './dto/assessment.dto';
import { UpdateAssessmentDTO } from './dto/update-assessment.dto';

//o controlador lida com as requisições http
@Controller('assessment')
export class AssessmentController {
  constructor(private readonly assessmentService: assessmentService) {}

  @Post()
  async create(@Body(ValidationPipe) assessmentDTO: AssessmentDTO) {
    return this.assessmentService.create(assessmentDTO);
  }

  @Get()
  async findAll() {
    return this.assessmentService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.assessmentService.findOne(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body(ValidationPipe) updateAssessmentDTO: UpdateAssessmentDTO,
  ) {
    return this.assessmentService.update(+id, updateAssessmentDTO);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.assessmentService.remove(+id);
  }
}
