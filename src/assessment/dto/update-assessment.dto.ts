import { IsNumber, IsString, IsBoolean, IsOptional } from 'class-validator';

export class UpdateAssessmentDTO {
  @IsString()
  @IsOptional()
  content?: string;

  @IsBoolean()
  @IsOptional()
  published?: boolean;

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
