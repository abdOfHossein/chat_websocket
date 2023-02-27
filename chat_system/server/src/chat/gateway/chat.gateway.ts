import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { CreateChatDto } from '../dto/create-chat.dto';
import { ChatService } from '../service/chat.service';

@WebSocketGateway()
export class ChatGateway {
  constructor(private readonly chatService: ChatService) { }

  @WebSocketServer()
  server;

  @SubscribeMessage('createChat')
  async create(@MessageBody() createChatDto: CreateChatDto) {
    const messsage = await this.chatService.create(createChatDto);
    this.server.emit('message', `${messsage.sender_name} : ${messsage.text}`)
    return messsage
  }

  @SubscribeMessage('findAllChat')
  findAll() {
    return this.chatService.findAll();
  }

  @SubscribeMessage('join')
  handleJoinRoom(@MessageBody('sender_name') sender_name: string, @ConnectedSocket() client: Socket) {
    return this.chatService.handleJoinRoom(sender_name, client.id);
  }

  @SubscribeMessage('typing')
  async handleTyping(@MessageBody('isTyping') isTyping: boolean, @ConnectedSocket() client: Socket) {
    await this.chatService.handleTyping(isTyping, client);
  }
}
