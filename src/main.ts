import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'dotenv/config'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  console.log(process.env.NODE_ENV);
  await app.listen(process.env.PORT);
}
bootstrap();
