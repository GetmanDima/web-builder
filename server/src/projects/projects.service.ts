import { Dependencies, Inject, Injectable } from '@nestjs/common';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { defaultApiConfig, defaultDbConfig, defaultFrontConfig } from 'src/projects/constant';
import { CreateProjectDto, UpdateFrontendConfigDto, UpdateApiConfigDto, UpdateDbConfigDto, UpdateProjectDto } from "./dto/projects.dto";
import { Project } from "./schemas/project.schema";
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
@Dependencies([getModelToken(Project.name)])
export class ProjectsService {
  constructor(@Inject('CODE_SERVICE') private client: ClientProxy, private projectModel: Model<Project>) {
  }

  async getUserProjects(dto: {user: string}) {
    const projects = await this.projectModel.find({user: dto.user}, {name: 1, createdAt: 1, user: 1, settings: 1})
    return {
      projects
    };
  }

  async getProject(projectId: string, configs: string[]) {
    const selectedFieldsMap: any = {
      name: 1,
      settings: 1
    };

    if (configs.includes('frontend')) {
      selectedFieldsMap['frontendConfig'] = 1;
    }

    if (configs.includes('api')) {
      selectedFieldsMap['apiConfig'] = 1;
    }

    if (configs.includes('db')) {
      selectedFieldsMap['dbConfig'] = 1;
    }

    const project = await this.projectModel.findById(projectId, selectedFieldsMap);
  
    return {
      project: project.toJSON()
    };
  }

  async createProject(dto: CreateProjectDto & {user: string}) {
    const newProject = new this.projectModel({
      name: dto.name,
      settings: dto.settings,
      frontendConfig: defaultFrontConfig,
      dbConfig: defaultDbConfig,
      apiConfig: defaultApiConfig,
      user: dto.user
    });
    const savedProject = await newProject.save();

    return {
      project: savedProject.toJSON()
    }
  }

  updateProject(projectId: string, dto: UpdateProjectDto) {
    return this.projectModel.findByIdAndUpdate(projectId, dto);
  }

  deleteProject(projectId: string) {
    return this.projectModel.findByIdAndDelete(projectId);
  }

  async updateFrontendConfig(projectId: string, dto: UpdateFrontendConfigDto) {
    const project = await this.projectModel.findByIdAndUpdate(projectId, dto);
    return {
      _id: project.id,
      frontendConfig: dto.frontendConfig
    }
  }

  async updateApiConfig(projectId: string, dto: UpdateApiConfigDto) {
    const project = await this.projectModel.findByIdAndUpdate(projectId, dto);
    return {
      _id: project.id,
      apiConfig: dto.apiConfig
    }
  }

  async updateDbConfig(projectId: string, dto: UpdateDbConfigDto) {
    const project = await this.projectModel.findByIdAndUpdate(projectId, dto);
    return {
      _id: project.id,
      dbConfig: dto.dbConfig
    }
  }

  async generateCode(projectId: string) {
    this.client.emit('generate-code', {projectId});
  }
}

