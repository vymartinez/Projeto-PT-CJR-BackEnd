import {
  IsEmail,
  IsNumber,
  IsString,
  MinLength,
  IsOptional,
  IsBase64,
} from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  username?: string;

  @IsEmail({}, { message: 'Invalid email address' })
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  name?: string;

  @IsNumber({}, { message: 'Registration must be a number' })
  @IsOptional()
  registration?: number;

  @IsString({ message: 'Departament must be a string' })
  @IsOptional()
  departament: string

  @IsString({ message: 'Course must be a string' })
  @IsOptional()
  course: string

  @IsString()
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  @IsOptional()
  password?: string;

  @IsBase64()
  @IsOptional()
  photo: Buffer

}
