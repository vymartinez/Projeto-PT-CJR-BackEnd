import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [
    ConfigModule.forRoot(), 
    UserModule, 
    JwtModule.register({
      privateKey: process.env.JWT_SECRET_KEY,
      signOptions: {
        expiresIn: '86400s',
      },
    }),
    PrismaModule, 
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
