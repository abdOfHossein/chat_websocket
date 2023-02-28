import { Chat } from "../entities/chat.entity"

export class CreatePvMessageDto {
     messages: Chat[]
     sender_name: string
     client_id: string
     text: string
     audience_id: string
     audience_name: string
}
