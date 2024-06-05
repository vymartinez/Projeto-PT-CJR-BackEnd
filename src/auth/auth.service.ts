import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserEntity } from 'src/user/entities/user.entity';
import { compareSync } from 'bcrypt'
import { User } from '@prisma/client';

@Injectable()
export class AuthService {

    constructor(
        private readonly jwtService: JwtService,
        private readonly prismaService: PrismaService,
    ) {}

    async login(user: any) {
        const payload = {
            sub: user.id,
            email: user.email,
        };

        const token = await this.jwtService.sign(payload)

        return { access_token: token };
    }

    async validateUser(email: string, password: string) {
        let user : UserEntity; 

        try {
            user = await this.prismaService.user.findUniqueOrThrow({
                where: {
                    email: email,
                },
            })
        } catch (err) {
            return null;
        }

        const isPassword = await compareSync(password, user.password);

        if (isPassword) return user;
        return null;
    }
}
