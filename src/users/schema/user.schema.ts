
import * as mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Property } from 'src/properties/schema/property.schema';
import { Order } from 'src/orders/schema/orders.schema';

export type UserDocument = User & mongoose.Document;

@Schema({
  timestamps: true,
})
export class User {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  username: string;

  @Prop({ required: true })
  password: string;

  @Prop()
  admin: Boolean;

  @Prop()
  isEmailConfirmed: Boolean;

  @Prop()
  phone: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
