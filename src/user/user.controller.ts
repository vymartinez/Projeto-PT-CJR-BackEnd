import { Body, Controller, Delete, Get, Param, Patch, Post, ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  password: string;
}
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  createUser(@Body(ValidationPipe) userData: CreateUserDto): User {
    return this.userService.createUser(userData);
  }


  @Get()
  findAll(): User[] {
    return this.userService.findAll();
  }
  

  @Get(':id')
  findUser(@Param('id') id: number): User {
    return this.userService.findUser(Number(id));
  }

  @Patch(':id')
  updateUser(@Param('id') id: number, @Body(ValidationPipe) updateData: UpdateUserDto): User {
    return this.userService.updateUser(Number(id), updateData);
  }
  
  @Delete(':id')
  deleteUser(@Param('id') id: number): void {
    return this.userService.deleteUser(Number(id));
  }
}
