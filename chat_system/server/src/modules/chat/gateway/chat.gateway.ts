import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { CreateChatDto } from '../dto/create-chat.dto';
import { CreatePvMessageDto } from '../dto/create-pv-message.dto';
import { ChatService } from '../service/chat.service';

@WebSocketGateway()
export class ChatGateway {
  constructor(private readonly chatService: ChatService) { }

  @WebSocketServer()
  server;

  @SubscribeMessage('createChat')
  async create(@MessageBody() createChatDto: CreateChatDto, @ConnectedSocket() client: Socket) {
    createChatDto.client_id = client.id
    const messsage = this.chatService.create(createChatDto);
    this.server.emit('message', `${messsage.sender_name} : ${messsage.text}`)
    return messsage
  }

  @SubscribeMessage('findAllChat')
  findAll(@MessageBody('sender_name') sender_name: string, @ConnectedSocket() client: Socket) {
    return this.chatService.findAll(sender_name, client.id);
  }

  @SubscribeMessage('join')
  handleJoinRoom(@MessageBody('sender_name') sender_name: string, @ConnectedSocket() client: Socket) {
    return this.chatService.handleJoinRoom(sender_name, client.id);
  }

  @SubscribeMessage('typing')
  async handleTyping(@MessageBody('isTyping') isTyping: boolean, @ConnectedSocket() client: Socket) {
    await this.chatService.handleTyping(isTyping, client);
  }

  @SubscribeMessage('messagePv')
  async handlePrivateRoom(@MessageBody() createDto: CreatePvMessageDto, @ConnectedSocket() client: Socket) {
    createDto.client_id = client.id
    const result = await this.chatService.handlePrivateRoom(createDto);
    this.server.to(createDto.audience_id).emit('messagePv', `${result.sender_name} : ${result.text}`)
    return result
  }
  @SubscribeMessage('findAllMsgPv')
  async findAllMsgPv(@MessageBody('audience_id') audience_id:string, @ConnectedSocket() client: Socket) {
    return this.chatService.findAllMsgPv(audience_id, client.id);
  }
}
