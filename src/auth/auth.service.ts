import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserEntity } from 'src/user/entities/user.entity';
import { compareSync } from 'bcrypt'
import { User } from '@prisma/client';
import { ConfigService } from '@nestjs/config';
import { LoginRequestBody } from './dto/loginRequestBody.dto';
import * as bcrypt from 'bcrypt';
import { UserService } from 'src/user/user.service';
import { UserPayload } from './types/UserPayload';
import { UserToken } from './types/UserToken';



@Injectable()
export class AuthService {

    constructor(
        private readonly jwtService: JwtService,
        private readonly userService: UserService,
        private readonly configService: ConfigService,
    ) {}

    async login(LoginRequestBody: LoginRequestBody): Promise<UserToken>{
        const user = await this.validationUser(LoginRequestBody.email, LoginRequestBody.password)

        if(!user){
            throw new UnauthorizedException('Credenciais inválidas');
        }

        const payload : UserPayload = {email: user.email, sub: user.id}; //define os dados que vamos passar para  a identificacao do user no token 
        
        const jwtToken = this.jwtService.sign(payload, { expiresIn: '1d', secret: this.configService.get('JWT_SECRET') }) //usa a nossa chave secreta para gerar o token
        //else
        return{
            access_token: jwtToken, //gera o token
        };
    }

    async validationUser(email: string, password: string){
        const user = await this.userService.findByEmail(email);
        
        if (user){
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (isPasswordValid){
                return {
                    ...user, //carrega todos os dados do user exceto a senha
                    senha: undefined};
            }
        }
        //else:
        return null;
        
    }
    
}
