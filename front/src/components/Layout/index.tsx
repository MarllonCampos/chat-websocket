import {
  ChangeEvent,
  FormEvent,
  KeyboardEventHandler,
  useEffect,
  useRef,
  useState,
} from "react";
import { FiSend } from "react-icons/fi";
import { io } from "socket.io-client";
import {
  getActualGroup,
  getUserName,
} from "../../helpers/user";
import { validateEmpty } from "../../helpers/validateString";
import Message from "../Message";
const message =
  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis enim eveniet, nemo amet at sed, repellat perspiciatis dolorem quis quasi minus animi asperiores cumque ut aliquid laboriosam similique labore esse.";

const Layout = () => {
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [socketIo, setSocketIo] = useState("");

  useEffect(() => {
    const socket = io("http://localhost:3003");

    socket.on("message", (data) => {
      console.log(data);
    });
  }, []);

  const handleInputChange = (event: ChangeEvent) => {
    if (!inputRef.current) return;
    inputRef.current.style.height = "auto";
    inputRef.current.style.height = `${event.target.scrollHeight}px`;
  };

  const handleKeyPress = (
    event: React.KeyboardEvent<HTMLTextAreaElement>
  ) => {
    if (event.key === "Enter") {
      event.preventDefault();
      return handleSendMessage();
    }
  };
  const handleSendMessage = (event?: FormEvent) => {
    event?.preventDefault();
    if (!inputRef.current) return;
    const { value: message } = inputRef.current;
    if (validateEmpty(message)) return;

    console.log("send message", {
      message,
      owner: getUserName(),
      groupId: getActualGroup(),
    });
  };
  return (
    <div className="layout">
      <div className="layout__chat">
       
      </div>
      <footer className="layout__bottom">
        <form className="layout__bottom-form">
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
          <button className="layout__bottom-submit">
            <FiSend size={20} />
          </button>
        </form>
      </footer>
    </div>
  );
};

export { Layout };
