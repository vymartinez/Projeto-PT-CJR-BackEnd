import { Module } from '@nestjs/common';
import { AssessmentModule } from './assessment/assessment.module';
import { UserModule } from './user/user.module';
import { CommentModule } from './comment/comment.module';

@Module({
  imports: [UserModule, AssessmentModule, CommentModule],
})
export class AppModule {}
