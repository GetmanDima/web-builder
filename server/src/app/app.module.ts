import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppConfigModule } from '../app-config/app-config.module';
import { UsersModule } from '../users/users.module';
import { AuthModule } from 'src/auth/auth.module';
import { ProjectsModule } from 'src/projects/projects.module';

@Module({
  imports: [
    AppConfigModule,
    MongooseModule.forRoot('mongodb://localhost/nest'),
    UsersModule,
    AuthModule,
    ProjectsModule
  ],
})
export class AppModule {}
