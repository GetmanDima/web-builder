import { Module } from '@nestjs/common';
import { AppConfigModule } from '../app-config/app-config.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    AppConfigModule,
  ],
  controllers: [AppController],
  providers: [AppService],
  exports: [
    AppService
  ]
})
export class AppModule {}
