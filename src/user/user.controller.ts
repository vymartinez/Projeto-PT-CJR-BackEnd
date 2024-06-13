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
import { Public } from 'src/auth/decorator/isPublic.decorator';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Public()
  @Post()
  createUser(@Body(ValidationPipe) userData: CreateUserDto) {
    return this.userService.createUser(userData);
  }

  @Public()
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Public()
  @Get(':id')
  findUser(@Param('id') id: number) {
    return this.userService.findUser(Number(id));
  }

  @Patch(':id')
  updateUser(
    @Param('id') id: string,
    @Body(ValidationPipe) updateData: UpdateUserDto,
    @CurrentUser() currentUser: UserPayload,
  ) {
    if (Number(id) === currentUser.sub) {
      return this.userService.updateUser(Number(id), updateData);
    }
    throw new UnauthorizedException(
      'Você só pode atualizar seu próprio perfil',
    );
  }

  @Delete(':id')
  deleteUser(@Param('id') id: string, @CurrentUser() currentUser: UserPayload) {
    if (Number(id) !== currentUser.sub) {
      throw new UnauthorizedException(
        'Você só pode excluir seu próprio perfil',
      );
    }
    return this.userService.deleteUser(Number(id));
  }
}
