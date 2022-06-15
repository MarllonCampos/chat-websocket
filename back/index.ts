import express from 'express'
import { Server } from 'socket.io'
import http from 'http'
import cors from 'cors'
import { CreateAuthorService, CreateChatService, CreateMessageOnChatService, CreateMessageService } from './services';
import prismaClient from './prisma';

const app = express();
app.use(cors())
app.use(express.json())

const server = http.createServer(app)

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log(`Usuário conectado no socket ${socket.id}`)
})


app.post('/', async (req, res) => {
  const { name, groupId } = req.body
  // const createMessageService = new CreateMessageService();
  // const createMessageOnChatService = new CreateMessageOnChatService()
  const createAuthorService = new CreateAuthorService();
  const createChatService = new CreateChatService();
  const { name: authorName } = await createAuthorService.create(name)

  const searchForGroup = await prismaClient.chat.findFirst({
    where: {
      name: groupId
    }
  })

  const response = {
    groupName: searchForGroup?.name || "",
    groupId: searchForGroup?.id || "",
    name: authorName
  }

  if (searchForGroup) {

    return res.status(200).json(response)
  }

  const { id, name: groupName } = await createChatService.create(groupId)
  response.groupId = id,
    response.groupName = groupName

  return res.status(201).json(response)


})

app.get('/', async (req, res) => {



  // const messageOnChat = await createMessageOnChatService.create({ author_id, chat_id, message_id, text })
  // console.log(messageOnChat)
  return res.status(201).json({ message: "WORKS" })
})

server.listen(3003, () => {
  console.log("Server listen PORT 3003")
})