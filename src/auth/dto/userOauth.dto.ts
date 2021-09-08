import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UserOauthDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly idToken: string;
}
