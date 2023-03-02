import { ChangeEvent, FormEvent, KeyboardEventHandler, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { FiSend } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import { getActualGroup, getUserId, getUserName } from "../../helpers/user";
import { validateEmpty } from "../../helpers/validateString";
import Message, { IMessage } from "../Message";
import MessagePool, { MessageType } from "../MessagePool";
import API_URL from "../../helpers/apiurl";
interface MessageState extends IMessage {
  type: MessageType;
}

const Layout = () => {
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const layoutChat = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<MessageState[]>([]);
  const socketState = useMemo(() => io(API_URL), []);
  const [authorConnected, setAuthorConnected] = useState<string>("");
  const navigate = useNavigate();

  function isUserValid() {
    const actualGroup = getActualGroup();
    const userId = getUserId();
    const userName = getUserName();

    return actualGroup || userId || userName;
  }

  useEffect(() => {
    if (!isUserValid()) {
      window.alert("User is not setted, going back to register page");
      navigate("/");
    }
    socketState.on("chat-message", (message: any) => {
      setMessages((prevState) => [...prevState, { ...message, type: MessageType.message }]);
    });
    socketState.on("oldMessages", (oldMessages) => {
      const formattedOldMessages = oldMessages.map((oldMessage: any) => ({
        ...oldMessage,
        time: new Date(oldMessage.time),
        type: MessageType.message,
      }));

      setMessages((prevState) => [...prevState, ...formattedOldMessages]);
    });

    return () => {
      socketState.off("disconnect");
      socketState.disconnect();
    };
  }, []);

  useEffect(() => {
    const groupId = getActualGroup();
    const userId = getUserId();
    socketState.emit("connect-group", { groupId, userId });
    socketState.on("author-connected", (author: string) => {
      console.log({ message: "", name: author, time: new Date(), type: MessageType.alert });
      setMessages((prevState) => [
        ...prevState,
        { message: "", name: author, time: new Date(), type: MessageType.alert },
      ]);
    });
  }, [socketState]);

  useEffect(() => {
    if (layoutChat.current) {
      console.log(layoutChat.current.scrollHeight);
      layoutChat.current?.scrollTo(0, layoutChat.current.scrollHeight);
    }
  }, [messages]);

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
      type: MessageType.message,
    };

    const socketObject = {
      ...messageObject,
      groupId: getActualGroup(),
    };
    setMessages((prevState) => [...prevState, messageObject]);
    inputRef.current.value = "";

    socketState.emit("chat-message", socketObject);
  };

  return (
    <div className="layout">
      <div className="layout__chat" ref={layoutChat}>
        {messages.map(({ message, time, name, type }) => (
          <MessagePool name={name} message={message} time={time} key={`${message}-${time.toString()}`} type={type} />
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
