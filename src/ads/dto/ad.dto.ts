import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class AdDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly test: string;
}
