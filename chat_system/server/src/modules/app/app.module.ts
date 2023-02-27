import { Module } from '@nestjs/common';
import { ChatGateway } from 'src/chat/gateway/chat.gateway';
import { ChatService } from 'src/chat/service/chat.service';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, ChatGateway,ChatService],
})
export class AppModule { }
