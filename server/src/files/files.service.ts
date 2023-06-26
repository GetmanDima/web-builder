import { Dependencies, Injectable } from '@nestjs/common';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { File } from "./schemas/file.schema";

@Injectable()
@Dependencies([getModelToken(File.name)])
export class FilesService {
  constructor(private fileModel: Model<File>) {
  }

  async getUserFiles(dto: {user: string}) {
    const files = await this.fileModel.find({user: dto.user})
    return {
      files
    };
  }

  createFile(dto: {file: Express.Multer.File, user: string}) {
    const newFile = new this.fileModel({
      name: dto.file.originalname,
      type: dto.file.mimetype,
      url: '/uploads/' + dto.file.filename,
      user: dto.user
    });

    return newFile.save();
  }

  deleteFile(fileId: string) {
    return this.fileModel.findByIdAndDelete(fileId);
  }
}
