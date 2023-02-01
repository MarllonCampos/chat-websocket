import classNames from "classnames";
import { HTMLProps } from "react";
import { getUserName } from "../../helpers/user";

export interface IMessage {
  name: string;
  message: string;
  time: Date;
}
const randomColor = Math.floor(Math.random() * 16777215).toString(16); // Generate a hex RandomColor

const Message = ({ message, name, time }: IMessage) => {
  const owner = name === getUserName();
  const date = new Date(time).toLocaleTimeString(navigator.language, { hour: "2-digit", minute: "2-digit" });

  const formatName = `~${name}`;
  const messagecn = classNames("message", {
    "message--owner": owner,
  });
  return (
    <div className={messagecn}>
      <div className="message__container">
        <div className="message__header" style={{ color: `#FFF` }}>
          {formatName}
        </div>
        <div className="message__text">{message}</div>
        <div className="message__footer">{date}</div>
      </div>
    </div>
  );
};

export default Message;
