import { io } from "./http"
import { ChatService } from "./services/chatService"
import { MessageService } from "./services/messageService"

io.on("connection", (client) => {

  client.on("connect-group", async ({ groupId, userId }) => {
    const chatService = new ChatService()
    console.log("connectGroup")
    try {
      const oldMessages = await chatService.getOldMessages(groupId)

      const oldMessagesWithOwner = oldMessages.map(messages => (
        {
          ...messages,
          owner: messages.authorId === userId,
          name: messages.author.name,
          time: messages.createdAt,
          message: messages.text
        }
      ))
      io.to(client.id).emit("oldMessages", oldMessagesWithOwner)
    } catch (error) {
      console.log(error)
    }

  })
  client.on("disconnect", () => {
    console.log(`Usuário ${client.id} desconectado`)
  })


  client.on("chat-message", async (message) => {
    console.log(message)
    const messageService = new MessageService()
    try {
      const logs = await messageService.create(message)
      console.log(logs)
      client.broadcast.emit("chat-message", message)
    } catch (error) {
      console.log("ERROR - Failed to send message for everyone ", error)
    }
  })
  console.log(`Usuário conectado com o id ${client.id}`)
})


export default io