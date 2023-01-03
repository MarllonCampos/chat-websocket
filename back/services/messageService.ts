import { UserErrors } from "../errors/user-errors"
import prismaClient from "../prisma"
import { AuthorService } from "./authorService"

interface MessageServiceInterface {
  message: string,
  name: string,
  groupId: string
}
export class MessageService {
  async create({ message, name, groupId }: MessageServiceInterface) {
    const authorService = new AuthorService()


    const author = await authorService.find(name)
    console.log(author, await prismaClient.author.findMany({
      where: { name: { not: "null" } }
    }))
    if (!author) return UserErrors.UserNotFound()
    return await prismaClient.message.create({
      data: {
        text: message,
        authorId: author.id,
        chatId: groupId,
      }
    })


  }
}

