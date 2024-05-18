import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from 'user/user.module';
import { AvaliaçãoModule } from './avaliacao/avaliacao.module';
import { AvaliacaoModule } from './avaliacao/avaliacao.module';

@Module({
  imports: [UserModule, AvaliaçãoModule, AvaliacaoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
