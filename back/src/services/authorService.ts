import { UserErrors } from "../errors/user-errors"
import prismaClient from "../../prisma"

export class AuthorService {
  async create(name: string) {
    const user = await prismaClient.author.findFirst({
      where: {
        name: name
      },

    })
    if (user) {
      throw UserErrors.AlreadyExists()
    }
    return await prismaClient.author.create({
      data: {
        name
      }
    })
  }


  async find(name: string) {
    const user = await prismaClient.author.findFirst({
      where: { name }
    })
    return user ?? null
  }

}

