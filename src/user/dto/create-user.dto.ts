import { IsEmail, IsNumber, IsString, MinLength } from "class-validator";

export class CreateUserDto {
    @IsString() /*esses e os outros são validadores */
    username: String;
    @IsEmail()
    email: String;
    @IsString()
    nome: String;
    @IsNumber()
    age: number;
    @IsString()
    @MinLength(6)
    password: string;
}