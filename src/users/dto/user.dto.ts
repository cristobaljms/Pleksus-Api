import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class UserDTO {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsEmail()
  readonly username: string;

  @IsNotEmpty()
  @IsString()
  readonly password: string;
}
