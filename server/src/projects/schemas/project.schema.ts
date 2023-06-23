import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { User } from 'src/users/schemas/user.schema';

export type ProjectDocument = HydratedDocument<Project>;

@Schema()
export class Project {
  @Prop({isRequired: true})
  name: string;

  @Prop({type: mongoose.Schema.Types.Mixed})
  settings: any;
  
  @Prop({type: mongoose.Schema.Types.Mixed})
  frontendConfig: any;

  @Prop({type: mongoose.Schema.Types.Mixed})
  apiConfig: any;

  @Prop({type: mongoose.Schema.Types.Mixed})
  dbConfig: any;

  @Prop({type: mongoose.Schema.Types.Date, default: Date.now})
  createdAt: any;

  @Prop({isRequired: true, type: mongoose.Schema.Types.ObjectId, ref: 'User'})
  user: User;
}

export const ProjectSchema = SchemaFactory.createForClass(Project);
