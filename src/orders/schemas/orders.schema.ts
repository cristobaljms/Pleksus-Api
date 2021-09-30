import * as mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User } from 'src/users/schema/user.schema';

@Schema({
  timestamps: true,
})
export class Order extends mongoose.Document {
  @Prop({ required: true })
  place: string;

  @Prop({ required: true })
  business_type: string;

  @Prop({ required: true })
  property_type: string;

  @Prop()
  location_from: string;

  @Prop()
  location_until: string;

  @Prop()
  street_from: string;

  @Prop()
  street_until: string;

  @Prop()
  location: string;

  @Prop()
  street: string;

  @Prop()
  year_old_from: string;

  @Prop()
  year_old_until: string;

  @Prop()
  max_price_from: string;

  @Prop()
  max_price_until: string;

  @Prop()
  area_from: string;

  @Prop()
  area_until: string;

  @Prop()
  rooms: string;

  @Prop()
  bathroom: string;

  @Prop()
  parking_lot: string;

  @Prop()
  balcony: boolean;

  @Prop()
  terrace: boolean;

  @Prop()
  view: string;

  @Prop()
  description: string;

  @Prop()
  property_type_oldest: string;

  @Prop()
  time_to_buy: string;

  @Prop()
  how_to_pay: string;

  @Prop()
  need_sell: boolean;

  @Prop({ type: mongoose.Types.ObjectId, required: true, ref: 'users' })
  user: User;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
