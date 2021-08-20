import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IOrder } from 'src/common/interfaces/order.interface';
import { ORDER } from 'src/common/models/models';
import { OrderDTO } from './dto/orders.dto';


@Injectable()
export class OrdersService {
  constructor(@InjectModel(ORDER.name) private readonly model: Model<IOrder>) {}

  async create(orderDTO: OrderDTO): Promise<IOrder> {
    const newOrder = new this.model(orderDTO);
    return await newOrder.save();
  }

  async findAll(): Promise<IOrder[]> {
    return await this.model.find();
  }

  async findOne(id: string): Promise<IOrder> {
    return await this.model.findById(id).populate('userId');
  }

  async delete(id: string) {
    await this.model.findByIdAndDelete(id);
    return { status: HttpStatus.OK, msg: 'Deleted' };
  }
}
