import { NestFactory } from '@nestjs/core';
import { PTModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(PTModule);
  await app.listen(3000);
}
bootstrap();

//ate agora apenas iniciamos nosso ouvinte HTTP, que permite que o aplicativo aguarde solicitações HTTP de entrada.