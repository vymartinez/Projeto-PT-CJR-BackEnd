import { IsOptional, IsString } from 'class-validator';

export class UserEntity {
  @IsString()
  id: number;

  @IsString()
  email: string;

  @IsString()
  password: string;

  @IsString()
  @IsOptional()
  name?: string;

  createdAt?: Date;
  updatedAt?: Date;
}
