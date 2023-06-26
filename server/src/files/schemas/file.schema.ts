import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { User } from 'src/users/schemas/user.schema';

const Types = mongoose.Schema.Types;
export type FileDocument = HydratedDocument<File>;

@Schema()
export class File {
  @Prop({type: Types.String, isRequired: true})
  name: string;

  @Prop({type: Types.String, isRequired: true})
  type: string;
  
  @Prop({type: Types.String, isRequired: true})
  url: string;

  @Prop({type: Types.Date, default: Date.now})
  createdAt: any;

  @Prop({type: Types.ObjectId, isRequired: true, ref: 'User'})
  user: User;
}

export const FileSchema = SchemaFactory.createForClass(File);
