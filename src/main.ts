import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();

//ate agora apenas iniciamos nosso ouvinte HTTP, que permite que o aplicativo aguarde solicitações HTTP de entrada.