import { IsNumber, IsString } from 'class-validator';

export class AssessmentDTO {
  @IsString()
  content: string;

  @IsNumber()
  userId: number;

  @IsNumber()
  subjectId: number;

  @IsNumber()
  teacherId: number;
}
