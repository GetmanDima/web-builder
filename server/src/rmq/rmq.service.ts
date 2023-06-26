import { Dependencies, Injectable } from '@nestjs/common';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as AdmZip from 'adm-zip';
import { Project } from 'src/projects/schemas/project.schema';
import { File } from 'src/files/schemas/file.schema';
import { FrontParser } from './front-parser/FrontParser';
import { ServerParser } from './server-parser/ServerParser';

@Injectable()
@Dependencies([getModelToken(Project.name), getModelToken(File.name)])
export class RMQService {
  constructor(private projectModel: Model<Project>, private fileModel: Model<File>) {}

  async generateCode(projectId: string) {
    const project = await this.projectModel.findById(projectId);
    const frontParser = new FrontParser(project.frontendConfig);
    const frontCode = frontParser.parse();
    const serverParser = new ServerParser(project.frontendConfig);
    const serverCode = serverParser.parse();
    const zipName = this.generateZipName(projectId);

    const zip = new AdmZip();
    zip.addLocalFolder('./src/rmq/project-template-code');
    zip.addFile('client/src/index.js', Buffer.from(frontCode, 'utf8'));
    zip.addFile('server/src/constant.js', Buffer.from(serverCode, 'utf8'));
    zip.writeZip(`./uploads/${zipName}`);

    const newFile = new this.fileModel({
      name: `Архив с кодом ${projectId}`,
      type: 'code/zip',
      url: '/uploads/' + zipName,
      user: project.user
    });
    
    await newFile.save();
  }

  private generateZipName(projectId: string) {
    const randomStr = Array(5)
      .fill(null)
      .map(() => Math.round(Math.random() * 16).toString(16))
      .join('');
  
    return randomStr + '-' + projectId + '-' + (new Date()).toISOString().replace(/[:.]/g, '-') + '.zip';
  };
}
