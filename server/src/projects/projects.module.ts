import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProjectsController } from './projects.controller';
import { ProjectsService } from './projects.service';
import { PreviewApiService } from './preview-api.service';
import { Project, ProjectSchema } from "./schemas/project.schema";

@Module({
  controllers: [ProjectsController],
  imports: [
    MongooseModule.forFeature([
      { name: Project.name, schema: ProjectSchema },
    ])
  ],
  providers: [ProjectsService, PreviewApiService],
  exports: [
    ProjectsService
  ]
})
export class ProjectsModule {}
