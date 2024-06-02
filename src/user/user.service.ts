import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async createUser(createUserDto: CreateUserDto) {
    const existingUser = await this.prisma.user.findUnique({
      where: { email: createUserDto.email },
    });
    if (existingUser) {
      throw new ConflictException('User already exists');
    }
    return await this.prisma.user.create({
      data: {
        ...createUserDto,
        password: createUserDto.password,
      },
    });
  }

  async findAll() {
    return await this.prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        assessments: true,
        created_at: true,
        updated_at: true,
      },
    });
  }

  async findUser(id: number) {
    const isValidId = Number.isInteger(id) && id > 0;
    if (!isValidId) {
      throw new NotFoundException('User not found');
    }
    return await this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        assessments: true,
        created_at: true,
        updated_at: true,
      },
    });
  }

  async findByEmail(email: string) {
    const User = await this.prisma.user.findUnique({ where: { email } });
    if (!User) {
      return null;
    }
    return User;
  }

  async updateUser(id: number, updateUserDto: UpdateUserDto) {
    const isValidId = Number.isInteger(id) && id > 0;
    if (!isValidId) {
      throw new NotFoundException('User not found');
    }
    return await this.prisma.user.update({
      where: { id },
      data: {
        ...updateUserDto,
        password: updateUserDto.password,
      },
      select: {
        id: true,
        name: true,
        email: true,
        assessments: true,
        created_at: true,
        updated_at: true,
      },
    });
  }

  async deleteUser(id: number) {
    const isValidId = Number.isInteger(id) && id > 0;
    if (!isValidId) {
      throw new NotFoundException('User not found');
    }
    return await this.prisma.user.delete({
      where: { id },
    });
  }
}
