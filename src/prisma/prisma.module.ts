import {PrismaService} from "./prisma.service";
import { Global, Module } from "@nestjs/common";

/*colocamos aqui o que vamos importar e exportar (nesse caso não vamos importar nada) */
/*esse é um decorater, pega um método e atribui algum comportamento a ele (o comportamento atribuido fica dentro c=dos colchetes)*/
@Global()
@Module({
    providers: [PrismaService],
    exports: [PrismaService]
})
export class PrismaModule {};