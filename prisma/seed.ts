import { PrismaClient } from '@prisma/client';

export const prisma = new PrismaClient();

//criando um novo usuario
async function createTeacher(name, departament) {
  try {
    const newTeacher = await prisma.teacher.create({
      data: {
        name,
        departament,
      },
    });
    console.log('Professor adicionado.', newTeacher);
  } catch (error) {
    console.log('Erro ao adicionar professor.', error);
  }
}

async function createUser(name, username, email, password, departament, course, photo) {
  try {
    const newUser = await prisma.user.create({
      data: {
        name,
        username,
        email,
        password,
        departament,
        course,
        photo: Buffer.from(photo),
      },
    });
    console.log('Novo usuário criado:', newUser);
  } catch (error) {
    console.log('Erro ao criar usuário', error);
  }
}

async function createAssessment(content, published, userId, subjectId, teacherId) {
  try {
    const newAssessment = await prisma.assessment.create({
      data: {
        content,
        published,
        userId,
        subjectId,
        teacherId,
      },
    });
    console.log('Nova avaliação criada.', newAssessment);
  } catch (error) {
    console.error('Erro ao criar avaliação.', error);
  }
}

async function createComment(content, published, userId, assessmentId) {
  try {
    const newComment = await prisma.comment.create({
      data: {
        content,
        published,
        userId,
        assessmentId,
      },
    });
    console.log('Novo comentário adicionado.', newComment);
  } catch (error) {
    console.log('Erro ao adicionar comentário.', error);
  }
}

async function createSubjects(name) {
  try {
    const newSubjects = await prisma.subject.create({
      data: {
        name,
      },
    });
    console.log('Disciplina adicionada.', newSubjects);
  } catch (error) {
    console.log('Erro ao adicionar disciplina.', error);
  }
}

async function main() {
  await createTeacher('Carla Castanho', 'CIC');
  await createUser('Adrielly', 'AdriellyLima', 'limaadrielly@example.com', '1234567', 'CIC', 'Ciência da Computação', 'https://rockntech.com.br/wp-content/uploads/2015/02/selfies-de-gatos_2.jpg');
  await createSubjects('APC');
  await createAssessment('avaliação um', true, 1, 1, 1);
  await createComment('comentario um', true, 1, 1);
  await createSubjects('Cálculo I');
  await createSubjects('Álgebra Linear');
  await createSubjects('Cálculo II');
  await createSubjects('Compiladores');
  await createSubjects('Redes de Computadores');
  await createSubjects('Programação Orientada a Objetos');
  await createSubjects('Sistemas Operacionais');
  await createSubjects('Sistemas Distribuídos');
  await createSubjects('Banco de Dados I');
  await createSubjects('Banco de Dados II');
  await createSubjects('Cálculo III');
  await createSubjects('Estrutura de Dados I');
  await createSubjects('Estrutura de Dados II');
  await createSubjects('Linguagem de Programação');
  await createSubjects('Matemática Discreta');
  await createSubjects('Probabilidade e Estatística');
  await createSubjects('Teoria dos Grafos');
  await createSubjects('Teoria da Computação');
  await createSubjects('Física II');
  await createTeacher('Péricles', 'CIC');
  await createTeacher('Irineu', 'CIC');
  await createTeacher('Aristóteles', 'CIC');
  await createTeacher('Fulano', 'Matemática');
  await createTeacher('Ciclano', 'Matemática');
  await createTeacher('Flavin do Pneu', 'Rochas');
  await createTeacher('Beltrano', 'CIC');
  await createTeacher('José', 'Física');
  await createTeacher('Anibol', 'Física');
  await createTeacher('Natasha Caldeirão', 'CIC');
  await createTeacher('Taylor Shift', 'CIC');
  await createTeacher('Ana Banana', 'CIC');
  await createTeacher('Brad Peach', 'Matemática');
  await createTeacher('Marcelo Martelo', 'CIC');
  await createTeacher('Vin Gasolina', 'Estatística');
}

main()
  .catch((e) => {
    console.error('Error updating users:', e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
