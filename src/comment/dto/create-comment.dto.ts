import { IsNumber, IsString, IsBoolean } from 'class-validator';

export class CreateCommentDTO {
  @IsString()
  content: string;

  @IsNumber()
  userId: number;

  @IsNumber()
  assessmentId: number;

  @IsBoolean()
  published: boolean;
}
