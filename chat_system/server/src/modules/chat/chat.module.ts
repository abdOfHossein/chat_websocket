import { Module } from '@nestjs/common';
import { RedisModule } from 'src/utils/redis/redis.module';
import { ChatGateway } from './gateway/chat.gateway';
import { ChatService } from './service/chat.service';

@Module({
  imports: [
    RedisModule.forRoot("127.0.0.1" , 6379),
  ],
  providers: [ChatGateway, ChatService,]
})
export class ChatModule { }
