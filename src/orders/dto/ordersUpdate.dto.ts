import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';


export class OrderUpdateDTO {
  @ApiProperty()
  @IsOptional()
  @IsString()
  readonly businessType: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  readonly propertyType: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  readonly direction: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  readonly maxPrice: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  readonly rooms: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  readonly description: string;
}
