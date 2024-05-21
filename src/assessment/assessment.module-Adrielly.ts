import { Global, Module } from '@nestjs/common';
import { assessmentService } from './assessment.service';
import { AssessmentController } from './assessment.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Global()
@Module({
  controllers: [AssessmentController],
  providers: [assessmentService, PrismaService]
})
export class AssessmentModule {}
