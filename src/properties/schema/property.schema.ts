import * as mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User } from 'src/users/schema/user.schema';

export type PropertyDocument = Property & mongoose.Document;

@Schema({
  timestamps: true,
})
export class Property {
  @Prop({ required: true })
  name: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  userId: User;
}

export const PropertySchema = SchemaFactory.createForClass(Property);
