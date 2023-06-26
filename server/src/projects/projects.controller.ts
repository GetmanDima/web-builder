import { Body, Controller, Post, Get, Request, UseGuards, Patch, Param, Delete, Query } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ProjectsService } from './projects.service';
import { PreviewApiService } from './preview-api.service';
import { CreateProjectDto, UpdateApiConfigDto, UpdateDbConfigDto, UpdateFrontendConfigDto, UpdateProjectDto } from './dto/projects.dto';

@Controller('projects')
export class ProjectsController {
  constructor(private projectsService: ProjectsService, private previewApiService: PreviewApiService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  getUserProjects(@Request() req) {
    return this.projectsService.getUserProjects({user: req.user.id});
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  createProject(@Request() req, @Body() dto: CreateProjectDto) {
    return this.projectsService.createProject({...dto, user: req.user.id});
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:id')
  getProject(@Param('id') id: string, @Request() req, @Query('configs') configs: string[]) {
    return this.projectsService.getProject(id, configs);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('/:id')
  updateProject(@Param('id') id: string, @Request() req, @Body() dto: UpdateProjectDto) {
    return this.projectsService.updateProject(id, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/:id')
  deleteProject(@Param('id') id: string) {
    return this.projectsService.deleteProject(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('/:id/configs/frontend')
  updateFrontendConfig(@Param('id') id: string, @Body() dto: UpdateFrontendConfigDto) {
    return this.projectsService.updateFrontendConfig(id, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('/:id/configs/api')
  updateApiConfig(@Param('id') id: string, @Body() dto: UpdateApiConfigDto) {
    return this.projectsService.updateApiConfig(id, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('/:id/configs/db')
  updateDbConfig(@Param('id') id: string, @Body() dto: UpdateDbConfigDto) {
    return this.projectsService.updateDbConfig(id, dto);
  }
  
  @Post('/:id/api')
  previewApi(@Param('id') id: string, @Body() dto: any) {
    return this.previewApiService.previewApi(id, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/:id/code')
  generateCode(@Param('id') id: string) {
    return this.projectsService.generateCode(id);
  }
}
