import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MongooseModule } from '@nestjs/mongoose';
import { ProjectsController } from './projects.controller';
import { ProjectsService } from './projects.service';
import { PreviewApiService } from './preview-api.service';
import { Project, ProjectSchema } from "./schemas/project.schema";

@Module({
  controllers: [ProjectsController],
  imports: [
    ClientsModule.register([{
      name: 'CODE_SERVICE',
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://localhost:5672'],
        queue: 'code_queue',
        queueOptions: {
          durable: false
        }
      }
    }]),
    MongooseModule.forFeature([
      { name: Project.name, schema: ProjectSchema },
    ])
  ],
  providers: [ProjectsService, PreviewApiService],
  exports: [
    ProjectsService,
    PreviewApiService
  ]
})
export class ProjectsModule {}
