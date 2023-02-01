import React from "react";
import Message, { IMessage } from "../Message";
import UserConnectedChip from "../UserConnectedChip";
// import { Container } from './styles';

interface ExcludesNameProperty extends Omit<React.HTMLProps<HTMLDivElement>, "name"> {}
interface MessagePoolProps extends ExcludesNameProperty, IMessage {
  type: MessageType;
}

export enum MessageType {
  message = "message",
  alert = "alert",
}
const MessagePool: React.FC<MessagePoolProps> = ({ message, time, name, type, ...props }) => {
  console.log({ type, name, message, isMessage: type === MessageType.message });
  return (
    <div {...props}>
      {type === MessageType.message ? (
        <Message name={name} message={message} time={time} key={`${message}-${time.toString()}`} />
      ) : (
        <UserConnectedChip author={name} />
      )}
    </div>
  );
};

export default MessagePool;
