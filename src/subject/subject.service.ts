import { Injectable } from '@nestjs/common'; //é um decorador que marca a classe como uma provedora de serviços que pode ser injetada em outros componentes no futuro
import { PrismaService } from 'src/prisma/prisma.service'; //serviço que encapsula o prismaclient para realizar operações com o banco de dados
import { SubjectDTO } from './dto/subject.dto'; //nos fornece uma estrutura de dados para atualizar nossa avalialiacao
import { UpdateSubjectDTO } from './dto/update-subject.dto'; //nos fornece uma estrutura de dados usada para criar uma subject

//o subject.services lida com a lógica de negócio

//definindo a classe como injetavel
@Injectable()
export class subjectService { 
    constructor(private prisma: PrismaService){} //define um construtor que recebe o prismaService para realizar operacoes de banco de dados
    
    async create(data: SubjectDTO){ 
        const {authorId, assessmentsId, teacherId, ...rest } = data;
        return this.prisma.subject.create({
            data: {
                ...rest,
                authorId:{ connect: {id: authorId} },
                assessments: { connect: {id: assessmentsId} },
                teacher: { connect: { id: teacherId } },
            },
        });
    }

    async findAll(){
        return this.prisma.subject.findMany({
            include:{
                authorId: true,
                assessments: true,
                teacher: true,
                comentarios: true,
            },
        });
    }

    async findOne(id: number){
        return this.prisma.subject.findUnique({
            where: {id},
            include:{
                author: true,
                disciplina: true,
                professor: true,
                comentarios: true,
            },
        });
    }

    async update(id: number, data: UpdateSubjectDTO){
        const { authorId, subjectId, teacherId, ...rest } = data;
        return this.prisma.subject.update({
            where: { id },
            data: {
                ...rest,
                author: authorId ? {connect: {id: authorId}} : undefined,
                disciplina: subjectId ? {connect: {id: subjectId}} : undefined,
                professor: teacherId ? {connect: {id: teacherId}} : undefined,
            },
        });
    }

    async remove(id: number){
        return this.prisma.subject.delete({
            where: {id},
        });
    }

}

