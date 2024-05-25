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

async function createTeacherSubjects(teacherId, subjectId) {
  try {
    const newTeacherSubjects = await prisma.teacherSubject.create({
      data: {
        teacherId,
        subjectId,
      },
    });
    console.log('Disciplina adicionada.', newTeacherSubjects);
  } catch (error) {
    console.log('Erro ao adicionar disciplina.', error);
  }
}

async function main() {
  await createTeacher('Carla Castanho', 'CIC'); //t1
  await createUser('Adrielly', 'AdriellyLima', 'limaadrielly@example.com', '1234567', 'CIC', 'Ciência da Computação', 'https://rockntech.com.br/wp-content/uploads/2015/02/selfies-de-gatos_2.jpg');
  await createSubjects('APC'); //1
  await createAssessment('avaliação um', true, 1, 1, 1);
  await createComment('comentario um', true, 1, 1);
  await createSubjects('Cálculo I'); //2
  await createSubjects('Álgebra Linear'); //3
  await createSubjects('Cálculo II'); //4
  await createSubjects('Compiladores'); //5
  await createSubjects('Redes de Computadores'); //6
  await createSubjects('Programação Orientada a Objetos'); //7
  await createSubjects('Sistemas Operacionais'); //8
  await createSubjects('Sistemas Distribuídos'); //9
  await createSubjects('Banco de Dados I'); //10
  await createSubjects('Banco de Dados II'); //11
  await createSubjects('Cálculo III'); //12
  await createSubjects('Estrutura de Dados I'); //13
  await createSubjects('Estrutura de Dados II'); //14
  await createSubjects('Linguagem de Programação'); //15
  await createSubjects('Matemática Discreta'); //16
  await createSubjects('Probabilidade e Estatística'); //17
  await createSubjects('Geologia'); //18
  await createSubjects('Teoria da Computação'); //19
  await createSubjects('Física II'); //20
  await createTeacher('Péricles', 'CIC'); //t2
  await createTeacher('Irineu', 'CIC'); //t3
  await createTeacher('Aristóteles', 'CIC'); //t4
  await createTeacher('Fulano', 'Matemática'); //t5
  await createTeacher('Ciclano', 'Matemática'); //t6
  await createTeacher('Flavin do Pneu', 'Rochas'); //t7
  await createTeacher('Beltrano', 'CIC'); //t8
  await createTeacher('José', 'Física'); //t9
  await createTeacher('Anibol', 'Física'); //t10
  await createTeacher('Natasha Caldeirão', 'CIC'); //t1
  await createTeacher('Taylor Shift', 'CIC'); //t12
  await createTeacher('Ana Banana', 'CIC'); //t13
  await createTeacher('Brad Peach', 'Matemática'); //t14
  await createTeacher('Marcelo Martelo', 'CIC'); //t15
  await createTeacher('Vin Gasolina', 'Estatística'); //t16
  await createTeacherSubjects(1, 1);
  await createTeacherSubjects(2, 2);
  await createTeacherSubjects(4, 3);
  await createTeacherSubjects(6, 4);
  await createTeacherSubjects(13, 5);
  await createTeacherSubjects(3, 6);
  await createTeacherSubjects(7, 7);
  await createTeacherSubjects(10, 8);
  await createTeacherSubjects(8, 9);
  await createTeacherSubjects(4, 10);
  await createTeacherSubjects(11, 11);
  await createTeacherSubjects(9, 12);
  await createTeacherSubjects(6, 13);
  await createTeacherSubjects(11, 14);
  await createTeacherSubjects(5, 15);
  await createTeacherSubjects(16, 16);
  await createTeacherSubjects(12, 17);
  await createTeacherSubjects(7, 18);
  await createTeacherSubjects(15, 19);
  await createTeacherSubjects(2, 20);
}

main()
  .catch((e) => {
    console.error('Error updating users:', e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
