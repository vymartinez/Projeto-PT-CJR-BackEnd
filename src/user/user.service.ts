import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

interface User {
    id: number;
    name: string;
    username: string;
    email: string;
    password: string;
}
@Injectable()
export class UserService {
    private users: User[] = [];
    private idCounter = 1;

    createUser(createUserDto: CreateUserDto): User {
        const newUser : User = { id: this.idCounter++, ...createUserDto };
        this.users.push(newUser);
        return newUser;
    }

findAll(): User[] {
    return this.users;
}

findUser(id: number): User {
    const user = this.users.find(user => user.id === id);
if (!user) {
    throw new NotFoundException('User not found');
}
return user;
}

updateUser(id: number, updateUserDto: UpdateUserDto): User {
    const user = this.findUser(id);
    Object.assign(user, updateUserDto);
    return user;
}


deleteUser(id: number): void {
    const index = this.users.findIndex(user => user.id === id);
    if (index === -1) {
        throw new NotFoundException('User not found')
    }
    this.users.splice(index, 1);
 }
}
