import { serverHttp } from "./src/http";
import "./src/websocket"
const PORT = process.env.PORT
serverHttp.listen(PORT, () => {
  console.log(`Server listen on port ${PORT}`)
})