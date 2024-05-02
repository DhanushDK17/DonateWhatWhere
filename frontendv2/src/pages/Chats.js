import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../pages/chat/ChatList.css";
import default_profile_photo from "../assets/images/profile.png";
import ChatComponent from "../pages/chat/ChatComponent";
import ChatList from "../pages/chat/ChatList";

function Chats() {
  return (
    <div
      className="chats-page"
      style={{ display: "flex", flexDirection: "row" }}
    >
      <div className="chat-list-column">
        <ChatList />
      </div>
      <div className="chat-list-column">
        <ChatComponent />
      </div>
    </div>
  );
}

export default Chats;
