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
import { CommentService } from './comment.service';
import { CreateCommentDTO } from './dto/create-comment.dto';
import { UpdateCommentDTO } from './dto/update-comment.dto';
import { Public } from 'src/auth/decorator/isPublic.decorator';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post()
  async create(@Body(ValidationPipe) comment: CreateCommentDTO) {
    return this.commentService.create(comment);
  }

  @Public()
  @Get()
  async findAll() {
    return this.commentService.findAll();
  }

  @Public()
  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.commentService.findOne(Number(id));
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body(ValidationPipe) updateCommentDTO: UpdateCommentDTO,
  ) {
    return this.commentService.update(Number(id), updateCommentDTO);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return this.commentService.remove(Number(id));
  }
}
