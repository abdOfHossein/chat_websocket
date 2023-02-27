import { Module } from '@nestjs/common';
import { ChatService } from './service/chat.service';
import { ChatGateway } from './gateway/chat.gateway';

@Module({
  providers: [ChatGateway, ChatService]
})
export class ChatModule {}
