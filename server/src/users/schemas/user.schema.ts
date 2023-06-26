import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

const Types = mongoose.Schema.Types;
export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({type: Types.String, isRequired: true})
  email: string;

  @Prop({type: Types.String, isRequired: true})
  password: string;

  @Prop({type: Types.String, isRequired: true})
  type: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
