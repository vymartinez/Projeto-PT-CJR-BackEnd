import { Injectable, NotFoundException } from '@nestjs/common'; //é um decorador que marca a classe como uma provedora de serviços que pode ser injetada em outros componentes no futuro
import { PrismaService } from 'src/prisma/prisma.service'; //serviço que encapsula o prismaclient para realizar operações com o banco de dados

interface Teacher {
    id: number;
    name: string;
    departament: string;
    assesments: string;
    teacherSubjects: string;
  }

@Injectable()
export class teacherService{
    private teachers: Teacher[] = [];
    private idCounter = 1;

    findAll(): Teacher[] {
        return this.teachers;
      }
    
    findTeacher(id: number): Teacher {
        const teacher = this.teachers.find((teacher) => teacher.id === id);
        if (!teacher){
          throw new NotFoundException('User not found');
        }
        return teacher;
    }
 
}