import { Injectable } from '@nestjs/common';
import { Socket } from 'socket.io/dist/socket';
import { CreateChatDto } from '../dto/create-chat.dto';
import { Chat } from '../entities/chat.entity';

@Injectable()
export class ChatService {

  messages: Chat[] = []
  searchUser = {}
  create(createChatDto: CreateChatDto) {
    try {
      const message = { ...createChatDto }
      this.messages.push(message)
      return message
    } catch (e) {
      console.log(e);
      throw e
    }
  }

  async findAll() {
    try {
      return this.messages;
    } catch (e) {
      console.log(e);
      throw e

    }
  }

  async handleJoinRoom(sender_name: string, client_id: string) {
    try {
      this.searchUser[client_id] = sender_name
      return Object.values(this.searchUser[client_id])
    } catch (e) {
      console.log(e);
      throw e
    }
  }

  async getClientName(client_id: string) {
    try {
      return this.searchUser[client_id]
    } catch (e) {
      console.log(e);
      throw e
    }
  }

  async handleTyping(isTyping: boolean, client: Socket) {
    try {
      const sender_name = await this.getClientName(client.id)
      client.broadcast.emit('typing',{sender_name,isTyping})
    } catch (e) {
      console.log(e);
      throw e
    }
  }

}
