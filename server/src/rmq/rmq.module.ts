import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Project, ProjectSchema } from 'src/projects/schemas/project.schema';
import { File, FileSchema } from 'src/files/schemas/file.schema';
import { RMQController } from './rmq.controller';
import { RMQService } from './rmq.service';

@Module({
  controllers: [RMQController],
  imports: [
    MongooseModule.forRoot(process.env.MONGODB_CONNECTION),
    MongooseModule.forFeature([
      { name: Project.name, schema: ProjectSchema },
      { name: File.name, schema: FileSchema },
    ]),
  ],
  providers: [RMQService],
  exports: [RMQService],
})
export class RMQModule {}
