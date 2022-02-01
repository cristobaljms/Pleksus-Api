import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class OrderUpdateDTO {
  @ApiProperty()
  @IsOptional()
  @IsString()
  readonly place: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  readonly business_type: string;

  @ApiProperty()
  @IsOptional()
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
  @IsOptional()
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
  @IsOptional()
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
  @IsBoolean()
  readonly deposit: boolean;

  @ApiProperty()
  @IsOptional()
  @IsString()
  readonly description: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  readonly property_type_oldest: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  readonly code: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  readonly time_to_buy: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  readonly how_to_pay: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  readonly need_sell: boolean;

  @ApiProperty()
  @IsOptional()
  @IsString()
  readonly view: string;

}
