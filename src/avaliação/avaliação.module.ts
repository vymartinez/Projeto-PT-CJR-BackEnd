import { Module } from '@nestjs/common';
import { AvaliaçãoService } from './avaliação.service';
import { AvaliaçãoController } from './avaliação.controller';

@Module({
  controllers: [AvaliaçãoController],
  providers: [AvaliaçãoService],
})
export class AvaliaçãoModule {}
