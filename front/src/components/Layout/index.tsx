import { ChangeEvent, FormEvent, KeyboardEventHandler, useEffect, useRef, useState } from "react";
import { FiSend } from "react-icons/fi";
import { io } from "socket.io-client";
import { getActualGroup, getUserId, getUserName } from "../../helpers/user";
import { validateEmpty } from "../../helpers/validateString";
import Message, { IMessage } from "../Message";
const socket = io("http://localhost:3003");

interface MessageState extends Exclude<IMessage, "owner"> {}

const Layout = () => {
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [socketIo, setSocketIo] = useState("");
  const [messages, setMessages] = useState<MessageState[]>([]);
  useEffect(() => {
    socket.on("chat-message", (message: any) => {
      setMessages((prevState) => [...prevState, message]);
    });
    const groupId = getActualGroup();
    const userId = getUserId();

    socket.emit("connect-group", { groupId, userId });
    socket.on("oldMessages", (oldMessages) => {
      console.log("oldMessages", oldMessages);
      const formattedOldMessages = oldMessages.map((oldMessage: any) => ({
        ...oldMessage,
        time: new Date(oldMessage.time),
      }));
      setMessages((prevState) => [...prevState, ...formattedOldMessages]);
    });
    return () => {
      socket.off("disconnect");
      socket.disconnect();
    };
  }, []);

  const handleInputChange = (event: ChangeEvent) => {
    if (!inputRef.current) return;
    inputRef.current.style.height = "auto";
    inputRef.current.style.height = `${event.target.scrollHeight}px`;
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      return handleSendMessage(event);
    }
  };
  const handleSendMessage = (event: FormEvent) => {
    event.preventDefault();
    if (!inputRef.current) return;
    const { value: message } = inputRef.current;
    if (validateEmpty(message)) return;

    const messageObject: MessageState = {
      message,
      time: new Date(),
      name: getUserName(),
    };

    const socketObject = {
      ...messageObject,
      groupId: getActualGroup(),
    };
    setMessages((prevState) => [...prevState, messageObject]);
    inputRef.current.value = "";

    socket.emit("chat-message", socketObject);
  };
  console.log(messages);

  return (
    <div className="layout">
      <div className="layout__chat">
        {messages.map(({ message, time, name }) => (
          <Message name={name} message={message} time={time} key={time} />
        ))}
      </div>
      <footer className="layout__bottom">
        <form className="layout__bottom-form" onSubmit={handleSendMessage}>
          <textarea
            className="layout__bottom-input"
            name="message"
            autoFocus
            placeholder="Mensagem"
            rows={1}
            ref={inputRef}
            onChange={handleInputChange}
            onKeyDown={handleKeyPress}
          />
          <button className="layout__bottom-submit" type="submit">
            <FiSend size={20} />
          </button>
        </form>
      </footer>
    </div>
  );
};

export { Layout };
