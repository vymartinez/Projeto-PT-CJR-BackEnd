/*prisma client = é oq de fato nos permite trabalhar com o ROM*/
import { PrismaClient } from "@prisma/client";
import { Injectable } from "@nestjs/common"; /*trabalha com injeção de dependencias (um serviço é injetado dentro de outro) */

@Injectable()
/*o prismaService vai fazer o papel do prismaClient no nosso programa */
export class PrismaService extends PrismaClient {};
