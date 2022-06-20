import { IsEmail, IsString } from 'class-validator';

export class CreateUserDto {
  @IsEmail({}, { message: 'You must provide a valid e-mail' })
  email: string;

  @IsString()
  password: string;
}
