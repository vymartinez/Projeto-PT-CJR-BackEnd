import {
  IsEmail,
  IsNumber,
  IsString,
  MinLength,
  IsNotEmpty,
  IsOptional,
  IsBase64,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty({ message: 'Username is required' })
  username: string;

  @IsEmail({}, { message: 'Invalid email address' })
  @IsNotEmpty({ message: 'Email is required' })
  email: string;

  @IsString()
  @IsNotEmpty({ message: 'Name is required' })
  name: string;

  @IsNumber()
  @IsNotEmpty({ message: 'Registration must be a number' })
  registration: number;

  @IsString({ message: 'Departament must be a string' })
  @IsNotEmpty({ message: 'Departament is required' })
  departament: string;

  @IsString({ message: 'Course must be a string' })
  @IsNotEmpty({ message: 'Course is required' })
  course: string;

  @IsString()
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  password: string;

  @IsBase64()
  @IsOptional({ message: 'Photo is optional' })
  photo: Buffer;
}
