import {PrismaService} from "./prisma.service";
import { Module } from "@nestjs/common";

/*colocamos aqui o que vamos importar e exportar (nesse caso não vamos importar nada) */
@Global() /*esse é um decorater, pega um método e atribui algum comportamento a ele (o comportamento atribuido fica dentro c=dos colchetes)*/
@Module({
    providers: [PrismaService],
    exports: [PrismaService],
});