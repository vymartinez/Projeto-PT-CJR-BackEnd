import { Injectable } from '@nestjs/common'; //é um decorador que marca a classe como uma provedora de serviços que pode ser injetada em outros componentes no futuro
import { PrismaService } from 'src/prisma/prisma.service'; //serviço que encapsula o prismaclient para realizar operações com o banco de dados
import { AvaliacaoDTO } from './dto/avaliacao.dto'; //nos fornece uma estrutura de dados para atualizar nossa avalialiacao
import { UpdateAvaliacaoDTO } from './dto/update-avaliacao.dto'; //nos fornece uma estrutura de dados usada para criar uma avaliacao

//o avaliacao.services lida com a lógica de negócio

//definindo a classe como injetavel
@Injectable()
export class AvaliacaoService { 
    constructor(private prisma: PrismaService){} //define um construtor que recebe o prismaService para realizar operacoes de banco de dados
    
    async create(data: AvaliacaoDTO){ 
        const {authorId, disciplinaId, professorId, ...rest } = data;
        return this.prisma.avaliacao.create({
            data: {
                ...rest,
                author:{ connect: {id: authorId} },
                disciplina: { connect: {id: disciplinaId} },
                professor: { connect: { id: professorId } },
            },
        });
    }

    async findAll(){
        return this.prisma.avaliacao.findMany({
            include:{
                author: true,
                disciplina: true,
                professor: true,
                comentarios: true,
            },
        });
    }

    async findOne(id: number){
        return this.prisma.avaliacao.findUnique({
            where: {id},
            include:{
                author: true,
                disciplina: true,
                professor: true,
                comentarios: true,
            },
        });
    }

    async update(id: number, data: UpdateAvaliacaoDTO){
        const { authorId, disciplinaId, professorId, ...rest } = data;
        return this.prisma.avaliacao.update({
            where: { id },
            data: {
                ...rest,
                author: authorId ? {connect: {id: authorId}} : undefined,
                disciplina: disciplinaId ? {connect: {id: disciplinaId}} : undefined,
                professor: professorId ? {connect: {id: professorId}} : undefined,
            },
        });
    }

    async remove(id: number){
        return this.prisma.avaliacao.delete({
            where: {id},
        });
    }

}

