import { IsNumber, IsString } from 'class-validator';

export class CreateCommentDTO {
  @IsString()
  content: string;

  @IsNumber()
  userId: number;

  @IsNumber()
  assessmentId: number;
}
