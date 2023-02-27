import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app/app.module';

async function bootstrap() {
  const logger=new Logger('main')
  const app = await NestFactory.create(AppModule);
  const port=8080
  await app.listen(port,()=>{
    logger.log(`Server is running on port : ${port}`)
  });
}
bootstrap();
