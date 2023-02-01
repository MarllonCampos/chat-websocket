import { ChatService } from './../services/chatService';
import { AuthorService } from './../services/authorService';
import { Router } from 'express'

const router = Router();

router.post("/", async (req, res) => {
  const { name, groupName } = req.body
  const authorService = new AuthorService();
  const chatService = new ChatService();
  try {

    const groupAlreadyExists = await chatService.find(groupName)
    const authorAlreadyExists = await authorService.findByName(name)

    const chatInfo = groupAlreadyExists ?? await chatService.create(groupName)
    const authorInfo = authorAlreadyExists ?? await authorService.create(name)

    const response = {
      groupId: chatInfo.id,
      userId: authorInfo.id
    }

    const status = groupAlreadyExists ? 200 : 201

    return res.status(status).json(response)

  } catch (error) {

    return res.status(500).json({ message: "Something badly happen, sorry :(", error })
  }

})


export default router