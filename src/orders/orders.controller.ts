import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { stringify } from 'querystring';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UniqueIdSell, UniqueIdToLease } from 'src/common/helpers/helpers';
import { OrderDTO } from './dto/orders.dto';
import { OrderUpdateDTO } from './dto/ordersUpdate.dto';
import { OrdersService } from './orders.service';
import { Order } from './schemas/orders.schema';


@ApiTags('orders')
@Controller('api/orders')
export class OrdersController {
  constructor(private readonly orderService: OrdersService) {}

  @Get()
  findAll() {
    return this.orderService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderService.findOne(id);
  }

  @Get('findByUser/:userId')
  @UseGuards(JwtAuthGuard)
  async findByUserId(@Param('userId') userId: string) {
    const result = await this.orderService.findAll();
    return result.filter((order: any) => order.user == userId);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Body() orderDTO: OrderDTO) {
    if(orderDTO.business_type.includes('sell')){
      const correlativo = await this.orderService.correlativo();
      orderDTO.code = `${UniqueIdSell()}` + `${correlativo}`;
    }else if(orderDTO.business_type.includes('toLease')){
      const correlativo = await this.orderService.correlativo();
      orderDTO.code = `${UniqueIdToLease()}` + `${correlativo}`;
    }
    return this.orderService.create(orderDTO);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  update(@Param('id') id: string, @Body() order: OrderUpdateDTO) {
    return this.orderService.update(id, order);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  delete(@Param('id') id: string) {
    return this.orderService.delete(id);
  }
}
