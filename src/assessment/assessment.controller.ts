import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UnauthorizedException,
  ValidationPipe,
} from '@nestjs/common';
import { assessmentService } from './assessment.service';
import { AssessmentDTO } from './dto/assessment.dto';
import { UpdateAssessmentDTO } from './dto/update-assessment.dto';
import { CurrentUser } from 'src/auth/decorator/CurrentUser.decorator';
import { UserPayload } from 'src/auth/types/UserPayload';

//o controlador lida com as requisições http
@Controller('assessment')
export class AssessmentController {
  constructor(private readonly assessmentService: assessmentService) {}

  @Post()
  async create(@Body(ValidationPipe) assessmentDTO: AssessmentDTO, @CurrentUser() currentUser: UserPayload) {
    if (assessmentDTO.userId !== currentUser.sub){
      throw new UnauthorizedException('Só é possível criar posts para si mesmo');
    } 
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
    @Param('id') id: number,
    @Body(ValidationPipe) updateAssessmentDTO: UpdateAssessmentDTO,
    @CurrentUser() currentUser: UserPayload
  ) {
    const assessment = await this.assessmentService.findOne(id);
    if (assessment.userId !== currentUser.sub){
      throw new UnauthorizedException('Você só pode atualizar seus próprios posts');
    }
    return this.assessmentService.update(+id, updateAssessmentDTO);
  }

  @Delete(':id')
  async remove(@Param('id') id: number, @CurrentUser() currentUser: UserPayload) {
    const assessment = await this.assessmentService.findOne(id);
    if(assessment.userId !== currentUser.sub){
      throw new UnauthorizedException('Você só pode excluir seu próprio post');
    }
    return this.assessmentService.remove(+id);
  }
}
