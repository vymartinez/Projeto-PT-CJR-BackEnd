import { IsEmail, IsNotEmpty, IsString, isNotEmpty } from "class-validator";

export class LoginRequestBody {
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    password: string;
}