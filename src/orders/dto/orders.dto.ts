import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';


export class OrderDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly businessType: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly propertyType: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly direction: string;

  @ApiProperty()
  @IsString()
  readonly maxPrice: string;

  @ApiProperty()
  @IsString()
  readonly rooms: string;

  @ApiProperty()
  @IsString()
  readonly description: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly user: string;
}
