import * as mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User } from 'src/users/schema/user.schema';

export type OrderDocument = Order & mongoose.Document;

@Schema({
  timestamps: true,
})
export class Order {
  @Prop({ required: true })
  businessType: string;

  @Prop({ required: true })
  propertyType: string;

  @Prop({ required: true })
  direction: string;

  @Prop()
  maxPrice: string;

  @Prop()
  rooms: string;

  @Prop()
  description: string;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
