import React, { useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import { IoChatbubblesOutline } from "react-icons/io5";
import ChatComponent from "./ChatComponent";

export default function ChatTest() {
  const [showChat, setShowChat] = useState(true);
  const toggleChat = () => {
    setShowChat(!showChat);
  };

  return (
    <div>
      <div>
        <strong style={{ color: "#00aff5" }}>
          <IoChatbubblesOutline /> Contact
        </strong>
      </div>
      <div onClick={toggleChat}>
        <strong style={{ color: "#054957" }}>
          <FaArrowRight style={{ fontSize: "18px" }} />
        </strong>
      </div>
      <div>
        <div className="overlay" onClick={toggleChat}></div>
        <div
          className="user-profile-modal"
          style={{
            display: "flex",
            flexDirection: "column",
            textDecoration: "none",
          }}
        >
          <ChatComponent />
        </div>
      </div>
    </div>
  );
}
