import { PrismaClient } from '@prisma/client';

export const prisma = new PrismaClient();

//criando um novo usuario
async function createTeacher() {
  try {
    const newTeacher = await prisma.teacher.create({
      data: {
        name: 'Carla Castanho',
        departament: 'CIC',
      },
    });
    console.log('Professor adicionado.', newTeacher);
  } catch (error) {
    console.log('Erro ao adicionar professor.', error);
  }
}

async function createUser() {
  try {
    const newUser = await prisma.user.create({
      data: {
        name: 'Adrielly',
        username: 'AdriellyLima',
        email: 'limaadrielly@example.com',
        password: '1234567',
        departament: 'CIC',
        course: 'Ciência da Computação',
        photo: Buffer.from(
          'https://rockntech.com.br/wp-content/uploads/2015/02/selfies-de-gatos_2.jpg',
        ),
      },
    });
    console.log('Novo usuário criado:', newUser);
  } catch (error) {
    console.log('Erro ao criar usuário', error);
  }
}

async function createAssessment() {
  try {
    const newAssessment = await prisma.assessment.create({
      data: {
        content: 'avaliação um',
        published: true,
        userId: 1,
        subjectId: 1,
        teacherId: 1,
      },
    });
    console.log('Nova avaliação criada.', newAssessment);
  } catch (error) {
    console.error('Erro ao criar avaliação.', error);
  }
}

async function createComment() {
  try {
    const newComment = await prisma.comment.create({
      data: {
        content: 'comentario um',
        published: true,
        userId: 1,
        assessmentId: 1,
      },
    });
    console.log('Novo comentário adicionado.', newComment);
  } catch (error) {
    console.log('Erro ao adicionar comentário.', error);
  }
}

async function createSubjects() {
  try {
    const newSubjects = await prisma.subject.create({
      data: {
        name: 'APC',
      },
    });
    console.log('Disciplina adicionada.', newSubjects);
  } catch (error) {
    console.log('Erro ao adicionar disciplina.', error);
  }
}

async function main() {
  await createTeacher();
  await createUser();
  await createSubjects();
  await createAssessment();
  await createComment();
}

main()
  .catch((e) => {
    console.error('Error updating users:', e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
