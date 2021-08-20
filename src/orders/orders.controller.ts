import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { OrderDTO } from './dto/orders.dto';
import { OrdersService } from './orders.service';


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

  @Post()
  create(@Body() orderDTO: OrderDTO) {
    return this.orderService.create(orderDTO);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() orderDTO: OrderDTO) {
    // return this.orderService.update(id, orderDTO);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.orderService.delete(id);
  }
}
