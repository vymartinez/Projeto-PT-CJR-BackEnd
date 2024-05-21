import { Injectable } from '@nestjs/common'; //é um decorador que marca a classe como uma provedora de serviços que pode ser injetada em outros componentes no futuro
import { PrismaService } from 'src/prisma/prisma.service'; //serviço que encapsula o prismaclient para realizar operações com o banco de dados
import {AssessmentDTO } from './dto/assessment.dto'; //nos fornece uma estrutura de dados para atualizar nossa avalialiacao
import { UpdateAssessmentDTO } from './dto/update-assessment.dto'; //nos fornece uma estrutura de dados usada para criar uma subject


//o subject.services lida com a lógica de negócio

//definindo a classe como injetavel
@Injectable()
export class assessmentService { 
    constructor(private prisma: PrismaService){} //define um construtor que recebe o prismaService para realizar operacoes de banco de dados
    
    async create(data: AssessmentDTO){ 
        const {userId, subjectId, teacherId, ...rest } = data;
        return this.prisma.assessment.create({
            data: {
                ...rest,
                user:{ connect: {id: userId} },
                subject: { connect: {id: subjectId} },
                teacher: { connect: { id: teacherId } },
            },
        });
    }

    async findAll(){
        return this.prisma.assessment.findMany({
            include:{
                user: true,
                subject: true,
                teacher: true,
                comments: true,
            },
        });
    }

    async findOne(id: number){
        return this.prisma.assessment.findUnique({
            where: {id},
            include:{user: true,
                subject: true,
                teacher: true,
                comments: true,
            },
        });
    }

    async update(id: number, data: AssessmentDTO){
        const {userId, subjectId, teacherId, ...rest } = data;
        return this.prisma.assessment.update({
            where: { id },
            data: {
                ...rest,
                user : userId ?  {connect: {id: userId}} : undefined,
                subject: subjectId ? {connect: {id: subjectId}} : undefined,
                teacher: teacherId ? {connect: {id: teacherId}} : undefined,
            },
        });
    }

    async remove(id: number){
        return this.prisma.assessment.delete({
            where: {id},
        });
    }

}

