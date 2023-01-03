const getUserName = (): string => {
  return window.localStorage.getItem("chat-websocket-name") || ""
}

const getActualGroup = (): string => {
  return window.localStorage.getItem("chat-websocket-groupId") || ""
}

const getUserId = (): string => {
  return window.localStorage.getItem("chat-websocket-userId") || ""
}

interface ISaveKeysOnLocalStorage {
  name: string;
  groupName: string;
  groupId: string;
  userId: string;
}

const saveKeysOnLocalStorage = ({ name, groupName, groupId, userId }: ISaveKeysOnLocalStorage) => {
  window.localStorage.setItem(
    "chat-websocket-name",
    name
  );
  window.localStorage.setItem(
    "chat-websocket-groupName",
    groupName
  );
  window.localStorage.setItem(
    "chat-websocket-groupId",
    groupId
  );
  window.localStorage.setItem(
    "chat-websocket-userId",
    userId
  );
};

export { getUserName, getActualGroup, saveKeysOnLocalStorage, getUserId }