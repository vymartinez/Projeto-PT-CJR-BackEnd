import { Module } from '@nestjs/common';
import { AvaliacaoModule } from './subject/subject.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [UserModule, AvaliacaoModule],
})
export class AppModule {}
