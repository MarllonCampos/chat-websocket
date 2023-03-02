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
  return (
    <>
      {type === MessageType.message ? (
        <Message name={name} message={message} time={time} key={`${message}-${time.toString()}`} />
      ) : (
        <UserConnectedChip author={name} />
      )}
    </>
  );
};

export default MessagePool;
