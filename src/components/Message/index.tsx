import classNames from "classnames";

interface IMessage {
  name: string;
  message: string;
  time: string;
  owner: boolean;
}

const Message = ({
  message,
  name,
  time,
  owner,
}: IMessage) => {
  const date = new Date().toLocaleTimeString(
    navigator.language,
    { hour: "2-digit", minute: "2-digit" }
  );

  const randomColor = Math.floor(
    Math.random() * 16777215
  ).toString(16);
  const formatName = `~${name}`;
  const formatTime = time.replace;
  const messagecn = classNames("message", {
    "message--owner": owner,
  });
  return (
    <div className={messagecn}>
      <div className="message__container">
        <div
          className="message__header"
          style={{ color: `#${randomColor}` }}
        >
          {formatName}
        </div>
        <div className="message__text">{message}</div>
        <div className="message__footer">{date}</div>
      </div>
    </div>
  );
};

export default Message;
