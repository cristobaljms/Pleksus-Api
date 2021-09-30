import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class UserDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly firstName: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly lastName: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  readonly username: string;

  @ApiProperty()
  @IsString()
  readonly password: string;

  @IsNotEmpty()
  @IsBoolean()
  readonly admin: boolean = false;

  readonly isEmailConfirmed: boolean = false;

  readonly phone: string = null;

  readonly photo: string = null;

  readonly signUpByGoogle: boolean = false;

  readonly verificationCode: string;
}
