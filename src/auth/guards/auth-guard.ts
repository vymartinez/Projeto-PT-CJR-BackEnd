import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { IS_PUBLIC_KEY } from '../decorator/isPublic.decorator';
import { Reflector } from '@nestjs/core';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    //diz se a rota pode ser acessada ou nao

    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      //verifica se a rota esta marcada como public ou nao
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }
    //se nao for publico:
    const request = context.switchToHttp().getRequest(); //pega a requisicao enviada por http do cliente ate o servidor
    const token = this.extractTokenFromHeader(request); //do cabeçalho da requisicao (header) extraimos o token
    if (!token) {
      //se o token nao existir
      throw new UnauthorizedException(); //sabemos ent que o user nao esta autorizado
    }
    try {
      const payload = await this.jwtService.verifyAsync(
        //se o token eh valido, pegamos o payload (parte de identificacao do user)
        token,
        {
          secret: this.configService.get('JWT_SECRET'), //usamos nossa chave secreta para verificar se o token eh valido
        },
      );
      // 💡 We're assigning the payload to the request object here
      // so that we can access it in our route handlers
      request['user'] = payload; //caso esteja tudo certo com o token, pegamos a parte de identificacao do user (PAYLOAD)
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    //recebe a requisicao e retorna uma string caso tenha o token
    const [type, token] = request.headers.authorization?.split(' ') ?? []; //pega a requisicao e faz um fatiamento da string
    return type === 'Bearer' ? token : undefined; //se a string tiver bearer ent o token existe
  }
}
