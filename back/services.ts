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


class CreateAuthorService {
  async create(name: string) {
    return await prismaClient.author.create({
      data: {
        name
      }
    })
  }
}

class CreateChatService {
  async create(name: string) {
    return await prismaClient.chat.create({
      data: {
        name
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


export { CreateAuthorService, CreateChatService, CreateMessageService, CreateMessageOnChatService }