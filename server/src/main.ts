import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import * as express from 'express';
import { join } from 'path';
import { AppModule } from './app/app.module';
import { RMQModule } from './rmq/rmq.module';

async function bootstrap() {
  const PORT = process.env.PORT || 5000;

  try {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);

    app.useGlobalPipes(new ValidationPipe());
    app.enableCors();
    app.use('/uploads', express.static(join(__dirname, '..', 'uploads')));

    await app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
    });
  } catch (e) {
    console.log(e);
  }
}

async function bootstrapRMQ() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    RMQModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://localhost:5672'],
        queue: 'code_queue',
        queueOptions: {
          durable: false,
        },
      },
    },
  );

  await app.listen();
  console.log(`RabbitMQ connected`);
}

bootstrapRMQ();
bootstrap();