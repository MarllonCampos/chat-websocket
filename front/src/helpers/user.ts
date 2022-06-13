const getUserName = (): string => {
  return window.localStorage.getItem("chat-websocket-name") || ""
}

const getActualGroup = (): string => {
  return window.localStorage.getItem("chat-websocket-groupId") || ""
}
export { getUserName, getActualGroup }