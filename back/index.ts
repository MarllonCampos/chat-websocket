import { serverHttp } from "./src/http";
import "./src/websocket"
serverHttp.listen(3003, () => {
  console.log("Server listen on port 3003")
})