import * as mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User } from 'src/users/schema/user.schema';

@Schema({
  timestamps: true,
})
export class Order extends mongoose.Document{
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

  @Prop({type: mongoose.Types.ObjectId, required: true, ref: 'users'})
  user: User;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
