import { Injectable } from '@nestjs/common';
import { CreateCommentDTO } from './dto/create-comment.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CommentService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateCommentDTO) {
    const { userId, assessmentId, ...rest } = data;
    return this.prisma.comment.create({
      data: {
        ...rest,
        user: { connect: { id: userId } },
        assessment: { connect: { id: assessmentId } },
      },
    });
  }

  async findAll() {
    return this.prisma.comment.findMany({
      include: {
        user: true,
        assessment: true,
      },
    });
  }

  async findOne(id: number) {
    return this.prisma.comment.findUnique({
      where: { id },
      include: {
        user: true,
        assessment: true,
      },
    });
  }

  async update(id: number, data: CreateCommentDTO) {
    const { userId, assessmentId, ...rest } = data;
    return this.prisma.comment.update({
      where: { id },
      data: {
        ...rest,
        user: userId ? { connect: { id: userId } } : undefined,
        assessment: assessmentId
          ? { connect: { id: assessmentId } }
          : undefined,
      },
    });
  }

  async remove(id: number) {
    return this.prisma.comment.delete({
      where: { id },
    });
  }
}
