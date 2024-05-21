import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDTO } from './dto/create-comment.dto';
import { UpdateCommentDTO } from './dto/update-comment.dto';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post()
  async create(@Body() comment: CreateCommentDTO) {
    return this.commentService.create(comment);
  }

  @Get()
  async findAll() {
    return this.commentService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.commentService.findOne(Number(id));
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateCommentDTO: UpdateCommentDTO,
  ) {
    return this.commentService.update(Number(id), updateCommentDTO);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return this.commentService.remove(Number(id));
  }
}
