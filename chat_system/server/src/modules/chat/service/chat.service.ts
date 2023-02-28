import { Injectable } from '@nestjs/common';
import { Socket } from 'socket.io/dist/socket';
import { CreateChatDto } from '../dto/create-chat.dto';
import { CreatePvMessageDto } from '../dto/create-pv-message.dto';
import { Chat } from '../entities/chat.entity';

@Injectable()
export class ChatService {

  messages: Chat[] = []
  messagesPv: Chat[] = []
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

  async findAll(sender_name: string, client_id: string) {
    try {
      const res: any = {}
      res.client_id = client_id
      res.messages = this.messages;
      if (sender_name)
        this.searchUser[client_id] = sender_name
      res.users = this.searchUser
      console.log(this.searchUser);

      return res
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
      client.broadcast.emit('typing', { sender_name, isTyping })
    } catch (e) {
      console.log(e);
      throw e
    }
  }

  async handlePrivateRoom(createChatDto: CreatePvMessageDto) {
    try {
      const result = { ...createChatDto }
      this.messagesPv.push(result)
      result.messages = this.messagesPv
      return result
    } catch (e) {
      console.log(e);
      throw e
    }
  }


  async findAllMsgPv(audience_id: string, client_id: string) {
    try {
      const res: any = {}
      const audience_name = await this.getClientName(audience_id)
      const client_name = await this.getClientName(client_id)
      res.audience_name = audience_name
      res.audience_id = audience_id
      res.client_id = audience_name
      res.client_name = client_name
      res.messages = this.messagesPv
      return res
    } catch (e) {
      console.log(e);
      throw e
    }
  }

}