import { ChangeEvent, useRef, useState } from "react";
import { FiPlay, FiSend } from "react-icons/fi";
import Message from "../Message";

const Layout = () => {
  const [inputHeight, setInputHeight] = useState("auto");
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const handleInputChange = (event: ChangeEvent) => {
    if (inputRef.current) {
      inputRef.current.style.height = "auto";
      inputRef.current.style.height = `${event.target.scrollHeight}px`;
    }
  };
  return (
    <div className="layout">
      <div className="layout__chat">
        <Message
          message="Message"
          name="Marllon"
          time="22:04"
        />
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
          />
          <button className="layout__bottom-submit">
            <FiSend size={24} />
          </button>
        </form>
      </footer>
    </div>
  );
};

export { Layout };
