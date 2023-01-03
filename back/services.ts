import prismaClient from "./prisma";

class CreateMessageService {
  async create(text: string) {
    return await prismaClient.message.create({
      data: {
        text
      }
    })
  }
}

interface IMessageOnChat {
  author_id: string, chat_id: string, message_id: string
  text: string;
}
class CreateMessageOnChatService {
  async create({ author_id, chat_id, message_id, text }: IMessageOnChat) {
    return await prismaClient.messageOnChat.create({
      data: {
        author_id,
        chat_id,
        message_id,
        text
      }
    })
  }
}


export { CreateMessageService, CreateMessageOnChatService }