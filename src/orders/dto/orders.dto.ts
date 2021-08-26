import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';


//https://www.youtube.com/watch?v=SNrMmG9L4kI
export class OrderDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly businessType: string;
  /*
  Venta / arriendo
  */

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly propertyType: string;
  /*
  - Apartaestudio
  - Apartamento
  - Bodega
  - Cabaña
  - Casa
  - Casa Campestre
  - Casa lote
  - Consultorio
  */

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly direction: string;

  @ApiProperty()
  @IsString()
  readonly maxPrice: string;

  @ApiProperty()
  @IsString()
  readonly rooms: string; // check box

  @ApiProperty()
  @IsString()
  readonly description: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly user: string;
}
