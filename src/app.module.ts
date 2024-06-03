import { Module } from '@nestjs/common';
import { AssessmentModule } from './assessment/assessment.module';
import { UserModule } from './user/user.module';
import { CommentModule } from './comment/comment.module';
import { TeacherModule } from './teacher/teacher.module';
import { SubjectModule } from './subject/subject.module';

@Module({
  imports: [
    UserModule,
    AssessmentModule,
    CommentModule,
    TeacherModule,
    SubjectModule,
  ],
})
export class AppModule {}
