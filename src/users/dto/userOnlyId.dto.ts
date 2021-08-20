import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UserOnlyIdDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly id: string;
}
