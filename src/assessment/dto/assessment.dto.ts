import { IsNumber, IsString, IsBoolean } from 'class-validator';

export class AssessmentDTO {
  @IsString()
  content: string;

  @IsBoolean()
  published: boolean;

  @IsNumber()
  userId: number;

  @IsNumber()
  subjectId: number;

  @IsNumber()
  teacherId: number;
}
