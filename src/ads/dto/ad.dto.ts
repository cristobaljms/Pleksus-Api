import { IsNotEmpty, IsString } from 'class-validator';

export class AdDTO {
  @IsNotEmpty()
  @IsString()
  readonly test: string;
}
