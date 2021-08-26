import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ORDER } from 'src/common/models/models';
import { OrderDTO } from './dto/orders.dto';
import { OrderUpdateDTO } from './dto/ordersUpdate.dto';
import { Order } from './schemas/orders.schema';

@Injectable()
export class OrdersService {
  constructor(@InjectModel(ORDER.name) private readonly model: Model<Order>) {}

  async create(orderDTO: OrderDTO): Promise<Order> {
    const newOrder = new this.model(orderDTO);
    return await newOrder.save();
  }

  async findAll(): Promise<Order[]> {
    return await this.model.find();
  }

  async findOne(id: string): Promise<Order> {
    const order = await this.model.findById(id).populate('user');

    if(!order) {
      throw new HttpException('Order do not exists', HttpStatus.BAD_REQUEST);
    }

    return order;
  }

  async delete(id: string) {
    const order = await this.model.findById(id)

    if(!order) {
      throw new HttpException('Order do not exists', HttpStatus.BAD_REQUEST);
    }

    return await order.delete();
  }

  async update(id: string, orderUpdateDTO: OrderUpdateDTO): Promise<Order> {
    const currentOrder = await this.model.findById(id);

    if(!currentOrder) {
      throw new HttpException('Order do not exists', HttpStatus.BAD_REQUEST);
    }

    if (orderUpdateDTO.businessType) {
      currentOrder.businessType = orderUpdateDTO.businessType;
    }

    if (orderUpdateDTO.propertyType) {
      currentOrder.propertyType = orderUpdateDTO.propertyType;
    }

    if (orderUpdateDTO.direction) {
      currentOrder.direction = orderUpdateDTO.direction;
    }

    if (orderUpdateDTO.maxPrice) {
      currentOrder.maxPrice = orderUpdateDTO.maxPrice;
    }

    if (orderUpdateDTO.rooms) {
      currentOrder.rooms = orderUpdateDTO.rooms;
    }

    if (orderUpdateDTO.description) {
      currentOrder.description = orderUpdateDTO.description;
    }

    return await currentOrder.save();
  }
}
