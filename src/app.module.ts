import { Module } from '@nestjs/common';
import { AssessmentModule } from './assessment/assessment.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [UserModule, AssessmentModule],
})
export class AppModule {}
