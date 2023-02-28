import { Module } from '@nestjs/common';
import { RedisModule } from 'src/utils/redis/redis.module';
import { ChatGateway } from '../chat/gateway/chat.gateway';
import { ChatService } from '../chat/service/chat.service';
import { AppController } from './controller/app.controller';
import { AppService } from './service/app.service';

@Module({
  imports: [RedisModule.forRoot("127.0.0.1", 6379),],
  controllers: [AppController],
  providers: [AppService, ChatGateway, ChatService],
})
export class AppModule { }
