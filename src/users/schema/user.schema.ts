
import * as mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  timestamps: true,
})
export class User extends mongoose.Document{
  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

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

  @Prop()
  photo: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
