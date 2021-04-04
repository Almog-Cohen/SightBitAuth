import React from "react";
import { Avatar } from "@material-ui/core";
import "./SidebarChat.css";

const SidebarChat = ({ roomName }) => {
  return (
    <div className="side-bar-chat">
      <Avatar />
      <div className="side-bar-chatInfo">
        <h1>{roomName}</h1>
        <p>Welcome to room {roomName}</p>
      </div>
    </div>
  );
};

export default SidebarChat;
