// src/prisma/prisma.service.ts
import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  findByEmail(email: any) {
      throw new Error('Method not implemented.');
  }
  async onModuleInit() {
    await this.$connect(); //conecta o bd
  }

  async onModuleDestroy() {
    await this.$disconnect(); //desconecta o bd
  }
}

//essa classe é usada para conectar o banco de dados
