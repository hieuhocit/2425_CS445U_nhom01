import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as express from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.use(express.json());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: false,
    }),
  );
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
