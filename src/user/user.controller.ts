import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

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
  ) {
    return this.userService.updateUser(Number(id), updateData);
  }

  @Delete(':id')
  deleteUser(@Param('id') id: number) {
    return this.userService.deleteUser(Number(id));
  }
}
