import * as mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  timestamps: true,
})
export class User extends mongoose.Document {
  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true })
  username: string;

  @Prop()
  password: string;

  @Prop()
  admin: boolean;

  @Prop()
  isEmailConfirmed: boolean;

  @Prop()
  phone: string;

  @Prop()
  photo: string;

  @Prop()
  signUpByGoogle: boolean;

  @Prop()
  verificationCode: string;

  @Prop()
  type: string;

  @Prop()
  interest: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
