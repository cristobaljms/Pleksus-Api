import { Body, Controller, Delete, Get, Param, Patch, Post, Put, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { stringify } from 'querystring';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { OrderDTO } from './dto/orders.dto';
import { OrderUpdateDTO } from './dto/ordersUpdate.dto';
import { OrdersService } from './orders.service';
import { Order } from './schemas/orders.schema';


@ApiTags('orders')
@UseGuards(JwtAuthGuard)
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
  async findByUserId(@Param('userId') userId: string) {
    const result = await this.orderService.findAll();
    return result.filter((order: any) => order.user == userId);
  }

  @Post()
  create(@Body() orderDTO: OrderDTO) {
    return this.orderService.create(orderDTO);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() order: OrderUpdateDTO) {
    return this.orderService.update(id, order);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.orderService.delete(id);
  }
}
