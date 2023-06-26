import { Body, Controller, Post} from '@nestjs/common';
import { AppService } from './app.service';

@Controller('')
export class AppController {
  constructor(private appService: AppService) {}

  @Post('/api')
  previewApi(@Body() dto: any) {
    return this.appService.previewApi(dto);
  }
}
