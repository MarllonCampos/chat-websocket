import React from "react";

// import { Container } from './styles';

interface Props {
  author: string;
}
const UserConnectedChip = ({ author }: Props) => {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100%" }}>
      <span style={{ backgroundColor: "#1c5560", color: "#f8f8ec", padding: "4px 16px", borderRadius: "8px" }}>
        {author} se conectou
      </span>
    </div>
  );
};

export default UserConnectedChip;
