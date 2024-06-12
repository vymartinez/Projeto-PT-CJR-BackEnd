import { Injectable } from '@nestjs/common'; //é um decorador que marca a classe como uma provedora de serviços que pode ser injetada em outros componentes no futuro
import { PrismaService } from 'src/prisma/prisma.service'; //serviço que encapsula o prismaclient para realizar operações com o banco de dados

@Injectable()
export class teacherService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return await this.prisma.teacher.findMany({
      select: {
        id: true,
        name: true,
        department: true,
        photo: true,
        teacherSubjects: true,
        assessments: true,
      },
    });
  }
  async findTeacher(id: number) {
    return this.prisma.teacher.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        department: true,
        photo: true,
        teacherSubjects: true,
        assessments: true,
      },
    });
  }
}
