import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from 'user/user.module';
import { AvaliaçãoModule } from './avaliação/avaliação.module';

@Module({
  imports: [UserModule, AvaliaçãoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
