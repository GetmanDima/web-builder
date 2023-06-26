import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { User } from 'src/users/schemas/user.schema';

const Types = mongoose.Schema.Types;
export type ProjectDocument = HydratedDocument<Project>;

@Schema()
export class Project {
  @Prop({type: Types.String, isRequired: true})
  name: string;

  @Prop({type: Types.Mixed})
  settings: any;
  
  @Prop({type:Types.Mixed})
  frontendConfig: any;

  @Prop({type: Types.Mixed})
  apiConfig: any;

  @Prop({type: Types.Mixed})
  dbConfig: any;

  @Prop({type: Types.Date, default: Date.now})
  createdAt: any;

  @Prop({type: Types.ObjectId, isRequired: true, ref: 'User'})
  user: User;
}

export const ProjectSchema = SchemaFactory.createForClass(Project);
