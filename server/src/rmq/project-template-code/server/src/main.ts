import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from "@nestjs/common";
import {NestExpressApplication} from "@nestjs/platform-express";
import { AppModule } from './app/app.module';
import { port } from './constant';

async function bootstrap() {
  const PORT = port;

  try {    
    const app = await NestFactory.create<NestExpressApplication>(AppModule);

    app.useGlobalPipes(new ValidationPipe());

    app.enableCors()

    await app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`)
    });
  } catch(e) {
    console.log(e);
  }
}

bootstrap();
