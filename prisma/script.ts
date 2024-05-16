import { PrismaClient } from '@prisma/client';
import { main } from './main';

export const prisma = new PrismaClient();



//criando um novo usuario
async function createUser(){
    try{
        const newUser = await prisma.user.create({
            data:{
                name: 'Adrielly',
                email: 'limaadrielly@example.com',
                password: '1234567',
                departamento: 'CIC',
                curso: 'Ciência da Computação',
                photo: Buffer.from("https://rockntech.com.br/wp-content/uploads/2015/02/selfies-de-gatos_2.jpg")
            }
        });
        console.log("Novo usuário criado:", newUser);
    }catch(error){
        console.log("Erro ao criar usuário", error)
    }
}
createUser();

async function createAvaliacao(){
    try{
        const newAvaliacao = await prisma.avaliacao.create({
            data:{
                    content: "avaliação um",
                    published: true,
                    authorId: 1,
                    disciplinaId: 1,
                    professorId: 1
            }
        });
        console.log('Nova avaliação criada.', newAvaliacao);
    }catch(error){
        console.error('Erro ao criar avaliação.', error);
    }
}
createAvaliacao();

async function createComentario() {
    try{
        const newComentario = await prisma.comentario.create({
            data:{
                content: "comentario um",
                published: true,
                authorId: 1,
                avaliacaoId: 1
            }
        });
        console.log('Novo comentário adicionado.', newComentario);
    }catch(error){
        console.log('Erro ao adicionar comentário.', error);
    }
}
createComentario();

async function createDisciplina() {
    try{
        const newDisciplina = await prisma.disciplina.create({
            data:{
                name: "APC"
            }
        }); 
        console.log('Disciplina adicionada.', newDisciplina);
    }catch(error){
        console.log('Erro ao adicionar disciplina.', error);
    }
}
createDisciplina();

async function createProfessor(){
    try{
        const newProfessor = await prisma.professor.create({
            data:{
                name: 'Carla Castanho',
                departamento: 'CIC'
            }
        });
        console.log('Professor adicionado.', newProfessor);;
    }catch(error){
        console.log('Erro ao adicionar professor.', error);
    }finally{ //mover o finally para o final da ultima classe
        await prisma.$disconnect();
    }
}
createProfessor();

main()
  .catch((e) => {
    console.error('Error updating users:', e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
