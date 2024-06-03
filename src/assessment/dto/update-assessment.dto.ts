import { IsNumber, IsString, IsOptional } from 'class-validator';

export class UpdateAssessmentDTO {
  @IsString()
  @IsOptional()
  content?: string;

  @IsNumber()
  @IsOptional()
  userId?: number;

  @IsNumber()
  @IsOptional()
  subjectId?: number;

  @IsNumber()
  @IsOptional()
  teacherId?: number;
}
