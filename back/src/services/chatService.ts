import prismaClient from "../../prisma"


export class ChatService {
  async create(groupName: string,) {
    return await prismaClient.chat.create({
      data: {
        name: groupName,
      }
    })
  }

  async find(groupName: string) {
    console.log("find")
    try {
      const chat = await prismaClient.chat.findFirst({
        where: {
          name: groupName
        },
      })
      return chat ?? null

    } catch (error) {
      console.log(error)
    }
  }


  async getOldMessages(groupId: string) {
    const oldMessages = await prismaClient.chat.findMany({
      where: {
        id: groupId
      },
      select: {
        messages: {
          select: {
            authorId: true,
            text: true,
            createdAt: true,
            id: true,
            author: {
              select: {
                name: true
              }
            }
          },

        },
      }


    })

    if (!oldMessages) return []
    return oldMessages[0].messages

  }
}

