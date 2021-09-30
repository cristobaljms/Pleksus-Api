import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class OrderDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly place: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly business_type: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly property_type: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  readonly location_from: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  readonly location_until: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  readonly street_from: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  readonly street_until: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  readonly location: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  readonly street: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  readonly year_old_from: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  readonly year_old_until: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  readonly max_price_from: string;

  @ApiProperty()
  @IsString()
  readonly max_price_until: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  readonly area_from: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  readonly area_until: string;

  @ApiProperty()
  @IsString()
  readonly rooms: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  readonly bathroom: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  readonly parking_lot: string;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  readonly balcony: boolean;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  readonly terrace: boolean;

  @ApiProperty()
  @IsOptional()
  @IsString()
  readonly view: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  readonly description: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  readonly property_type_oldest: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly user: string;
}
