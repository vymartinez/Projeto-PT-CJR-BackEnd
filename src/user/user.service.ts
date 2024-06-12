import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async createUser(createUserDto: CreateUserDto) {
    const existingUser = await this.prisma.user.findUnique({
      where: { email: createUserDto.email },
    });
    if (existingUser) {
      throw new ConflictException('Esse email já pertence a um usuário');
    }

    const hashedPassword = await bcrypt.hash(createUserDto.password, 10); //criando hash de senha

    return await this.prisma.user.create({
      data: {
        ...createUserDto,
        password: hashedPassword, //trocamos a senha inserida pelo user pelo hash de senha criada
      },
    });
  }

  async findAll() {
    return await this.prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        course: true,
        department: true,
        photo: true,
        assessments: true,
        comments: true,
        created_at: true,
        updated_at: true,
      },
    });
  }

  async findUser(id: number) {
    const isValidId = await this.prisma.user.findUnique({ where: { id } });
    if (!isValidId) {
      throw new NotFoundException('Usuário não encontrado');
    }
    return await this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        course: true,
        department: true,
        photo: true,
        assessments: true,
        comments: true,
        created_at: true,
        updated_at: true,
      },
    });
  }

  async findByEmail(email: string) {
    //procurando o user pelo email
    const User = await this.prisma.user.findUnique({ where: { email } });
    if (!User) {
      return null;
    }
    return User;
  }

  async updateUser(id: number, updateUserDto: UpdateUserDto) {
    const isValidId = await this.prisma.user.findUnique({ where: { id } });
    if (!isValidId) {
      throw new NotFoundException('Usuário não encontrado');
    }

    const hashedPassword = await bcrypt.hash(updateUserDto.password, 10); //repetindo o processo de hashing pois o user pode trocar de senha

    return await this.prisma.user.update({
      where: { id },
      data: {
        ...updateUserDto,
        password: hashedPassword,
      },
      select: {
        id: true,
        name: true,
        email: true,
        course: true,
        department: true,
        photo: true,
        assessments: true,
        comments: true,
        created_at: true,
        updated_at: true,
      },
    });
  }

  async deleteUser(id: number) {
    const isValidId = await this.prisma.user.findUnique({ where: { id } });
    if (!isValidId) {
      throw new NotFoundException('Usuário não encontrado');
    }
    return await this.prisma.user.delete({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        course: true,
        department: true,
        photo: true,
        assessments: true,
        comments: true,
        created_at: true,
        updated_at: true,
      },
    });
  }
}
