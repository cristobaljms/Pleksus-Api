import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class userOnlyIdDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly id: string;
}
