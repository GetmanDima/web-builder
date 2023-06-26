import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  ParseFilePipe,
  MaxFileSizeValidator,
  Get,
  UseGuards,
  Delete,
  Request,
  HttpCode,
  Param
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { FilesService } from './files.service';
import { fileStorage } from './storage';

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  getUserFiles(@Request() req) {
    return this.filesService.getUserFiles({user: req.user.id});
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  @HttpCode(200)
  @UseInterceptors(
    FileInterceptor('file', {
      storage: fileStorage,
    }),
  )
  create(
    @UploadedFile(
      new ParseFilePipe({
        validators: [new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 10 })],
      }),
    ) file: Express.Multer.File,
    @Request() req
  ) {
    return this.filesService.createFile({file, user: req.user.id});
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/:id')
  deleteFile(@Param('id') id: string) {
    return this.filesService.deleteFile(id);
  }
}
