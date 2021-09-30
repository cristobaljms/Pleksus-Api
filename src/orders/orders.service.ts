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

    if (!order) {
      throw new HttpException('Order do not exists', HttpStatus.BAD_REQUEST);
    }

    return order;
  }

  async delete(id: string) {
    const order = await this.model.findById(id);

    if (!order) {
      throw new HttpException('Order do not exists', HttpStatus.BAD_REQUEST);
    }

    return await order.delete();
  }

  async update(id: string, orderUpdateDTO: OrderUpdateDTO): Promise<Order> {
    const currentOrder = await this.model.findById(id);

    if (!currentOrder) {
      throw new HttpException('Order do not exists', HttpStatus.BAD_REQUEST);
    }

    if (orderUpdateDTO.place) {
      currentOrder.place = orderUpdateDTO.place;
    }

    if (orderUpdateDTO.business_type) {
      currentOrder.business_type = orderUpdateDTO.business_type;
    }

    if (orderUpdateDTO.property_type) {
      currentOrder.property_type = orderUpdateDTO.property_type;
    }

    if (orderUpdateDTO.location_from) {
      currentOrder.location_from = orderUpdateDTO.location_from;
    }

    if (orderUpdateDTO.location_until) {
      currentOrder.location_until = orderUpdateDTO.location_until;
    }

    if (orderUpdateDTO.street_from) {
      currentOrder.street_from = orderUpdateDTO.street_from;
    }

    if (orderUpdateDTO.street_until) {
      currentOrder.street_until = orderUpdateDTO.street_until;
    }

    if (orderUpdateDTO.location) {
      currentOrder.location = orderUpdateDTO.location;
    }

    if (orderUpdateDTO.street) {
      currentOrder.street = orderUpdateDTO.street;
    }

    if (orderUpdateDTO.year_old_from) {
      currentOrder.year_old_from = orderUpdateDTO.year_old_from;
    }

    if (orderUpdateDTO.year_old_until) {
      currentOrder.year_old_until = orderUpdateDTO.year_old_until;
    }

    if (orderUpdateDTO.max_price_from) {
      currentOrder.max_price_from = orderUpdateDTO.max_price_from;
    }

    if (orderUpdateDTO.max_price_until) {
      currentOrder.max_price_until = orderUpdateDTO.max_price_until;
    }

    if (orderUpdateDTO.area_from) {
      currentOrder.area_from = orderUpdateDTO.area_from;
    }

    if (orderUpdateDTO.area_until) {
      currentOrder.area_until = orderUpdateDTO.area_until;
    }

    if (orderUpdateDTO.rooms) {
      currentOrder.rooms = orderUpdateDTO.rooms;
    }

    if (orderUpdateDTO.bathroom) {
      currentOrder.bathroom = orderUpdateDTO.bathroom;
    }

    if (orderUpdateDTO.parking_lot) {
      currentOrder.parking_lot = orderUpdateDTO.parking_lot;
    }

    if (orderUpdateDTO.balcony) {
      currentOrder.balcony = orderUpdateDTO.balcony;
    }

    if (orderUpdateDTO.terrace) {
      currentOrder.terrace = orderUpdateDTO.terrace;
    }

    if (orderUpdateDTO.view) {
      currentOrder.view = orderUpdateDTO.view;
    }

    if (orderUpdateDTO.property_type_oldest) {
      currentOrder.property_type_oldest = orderUpdateDTO.property_type_oldest;
    }

    return await currentOrder.save();
  }
}
