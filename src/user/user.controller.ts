import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UnauthorizedException,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CurrentUser } from 'src/auth/decorator/CurrentUser.decorator';
import { UserPayload } from 'src/auth/types/UserPayload';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  createUser(@Body(ValidationPipe) userData: CreateUserDto) {
    return this.userService.createUser(userData);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findUser(@Param('id') id: number) {
    return this.userService.findUser(Number(id));
  }

  @Patch(':id')
  updateUser(
    @Param('id') id: number,
    @Body(ValidationPipe) updateData: UpdateUserDto,
    @CurrentUser() currentUser: UserPayload,
  ) {
    if (id !== currentUser.sub){
      throw new UnauthorizedException('Você só pode atualizar seu próprio perfil');
    }
    return this.userService.updateUser(Number(id), updateData);
  }

  @Delete(':id')
  deleteUser(
    @Param('id') id: number,
    @CurrentUser() currentUser: UserPayload,
  ) {
    if (id !== currentUser.sub){
      throw new UnauthorizedException('Você só pode excluir seu próprio perfil');
    }
    return this.userService.deleteUser(Number(id));
  }
}
