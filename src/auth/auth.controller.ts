import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginRequestBody } from './dto/loginRequestBody.dto';
import { Public } from './decorator/isPublic.decorator';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  login(@Body() LoginRequestBody: LoginRequestBody) {
    return this.authService.login(LoginRequestBody);
  }

  @Get('me') //so se for verdadeiro ele executa essa rota e as que vierem dps tambem
  getProfile(@Request() req) {
    return req.user; //retorna os dados do user a partir da requisicao para mostrar q o token esta funcionando
  }
}
