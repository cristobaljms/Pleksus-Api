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
import { uniqueId } from 'src/common/helpers/helpers';
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

  //orderDTO.code = `${UniqueIdSell()}` + `${correlativo}`;
  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Body() orderDTO: OrderDTO) {
    if(orderDTO.business_type.includes('Sell')){
      const correlativo = await this.orderService.correlativo();
      orderDTO.code = uniqueId('C-000000', correlativo);
    }else if(orderDTO.business_type.includes('toLease')){
      
      const correlativo = await this.orderService.correlativo();
      orderDTO.code =  orderDTO.code = uniqueId('A-000000', correlativo);
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
