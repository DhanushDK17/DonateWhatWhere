import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./ChatList.css";
import default_profile_photo from "../../assets/images/profile.png";

function ChatList() {
  const [conversations, setConversations] = useState([]);
  const [conversationMap, setConversationMap] = useState({});

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const access = JSON.parse(sessionStorage.getItem("access"));
        const userData = JSON.parse(sessionStorage.getItem("userData"));
        const response = await fetch("http://localhost:8000/api/conversation", {
          headers: {
            Authorization: `Bearer ${access}`,
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();

        if (response.ok) {
          // Ensure data is an array before setting state
          if (Array.isArray(data.results)) {
            setConversations(data.results);
            const newConversationMap = {};

            data.results.forEach((conversation) => {
              const { initiator, receiver, last_message } = conversation;
              if (last_message) {
                // Check if last_message is not undefined
                const person1Id = userData.id;
                const person2Id =
                  userData.id !== initiator.id ? initiator.id : receiver.id;
                const key = [person1Id, person2Id].join("_");

                if (
                  !newConversationMap[key] ||
                  last_message?.timestamp >
                    newConversationMap[key].message.timestamp
                ) {
                  newConversationMap[key] = {
                    person1:
                      userData.id === initiator.id ? initiator : receiver,
                    person2:
                      userData.id !== initiator.id ? initiator : receiver,
                    message: last_message,
                    conversation_id: conversation.id,
                  };
                }
              }
            });
            setConversationMap(newConversationMap);
            console.log("Conversation", data);
            console.log("newConversationMap", newConversationMap);
          } else {
            console.error("Conversation data is not an array:", data);
          }
        } else {
          console.error(
            "Failed to fetch conversation data. Server returned:",
            response.status,
            response.statusText
          );
        }
      } catch (error) {
        console.error("Error fetching conversation data:", error);
      }
    };

    fetchConversations();
  }, []);

  return (
    <div className="main-chat">
      <div className="main-chat-container">
        <h2 className="chat-heading">Chats</h2>
        <ul className="chat-list">
          {Object.values(conversationMap).map((conversation, index) => (
            <li key={index} className="chat-item">
              <Link
                to={{
                  pathname: `/chat/${conversation.conversation_id}`,
                  state: { person: conversation.person2 },
                }}
                className="chat-link"
              >
                <div
                  className="chat-sender"
                  style={{ display: "flex", flexDirection: "row" }}
                >
                  <img
                    src={default_profile_photo}
                    alt="Profile"
                    className="chat-profile-pic"
                  />
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      padding: "15px",
                    }}
                  >
                    {`${conversation.person2.first_name} ${conversation.person2.last_name}`}
                    <div className="chat-message">
                      {conversation.message.text}
                    </div>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ChatList;
