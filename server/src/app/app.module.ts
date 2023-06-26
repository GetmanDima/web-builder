import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppConfigModule } from '../app-config/app-config.module';
import { UsersModule } from '../users/users.module';
import { AuthModule } from 'src/auth/auth.module';
import { ProjectsModule } from 'src/projects/projects.module';
import { FilesModule } from 'src/files/files.module';

@Module({
  imports: [
    AppConfigModule,
    MongooseModule.forRoot(process.env.MONGODB_CONNECTION),
    UsersModule,
    AuthModule,
    ProjectsModule,
    FilesModule
  ],
})
export class AppModule {}
