import express from 'express'
import { Server } from 'socket.io'
import http from 'http'
import cors from 'cors'
import prismaClient from './prisma';
import { AuthorService } from './services/authorService';
import { ChatService } from './services/chatService';
import { MessageService } from './services/messageService';

const app = express();
app.use(cors())
app.use(express.json())


app.post('/', async (req, res) => {
  const { name, groupName } = req.body
  const authorService = new AuthorService();
  const chatService = new ChatService();

  try {

    const groupAlreadyExists = await chatService.find(groupName)
    const authorAlreadyExists = await authorService.find(name)


    const chatInfo = groupAlreadyExists ?? await chatService.create(groupName)
    const authorInfo = authorAlreadyExists ?? await authorService.create(name)

    const response = {
      groupId: chatInfo.id,
      userId: authorInfo.id
    }

    const status = groupAlreadyExists ? 200 : 201


    return res.status(status).json(response)
  } catch (error) {
    return res.status(500).json({ message: "Something badly happen, sorry :(" })
  }

})


const server = http.createServer(app)

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {

  socket.on("connect-group", async ({ groupId, userId }) => {
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
      io.to(socket.id).emit("oldMessages", oldMessagesWithOwner)
    } catch (error) {
      console.log(error)
    }

  })
  socket.on("disconnect", () => {
    console.log(`Usuário ${socket.id} desconectado`)
  })


  socket.on("chat-message", async (message) => {
    console.log(message)
    const messageService = new MessageService()
    try {
      const logs = await messageService.create(message)
      console.log(logs)
      socket.broadcast.emit("chat-message", message)
    } catch (error) {
      console.log("ERROR - Failed to send message for everyone ", error)
    }
  })
  console.log(`Usuário conectado no socket ${socket.id}`)
})


server.listen(3003, () => {
  console.log("Server listen PORT 3003")
})