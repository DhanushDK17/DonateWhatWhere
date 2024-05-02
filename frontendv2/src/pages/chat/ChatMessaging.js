import React, { useEffect, useState } from "react";
import ChatComponent from "./ChatComponent";
import "./ChatList.css";
import default_profile_photo from "../../assets/images/profile.png";
import home from "../../assets/images/home.png";
import ChatIcon from "@mui/icons-material/Chat";
import ChatList from "../chat/ChatList";
import "../user/Claims.css";

const DonationCard = ({ donation }) => {
  const { item, category, donated_by } = donation;

  return (
    <div className="card">
      <h3>{item}</h3>
      <p className="text">Category: {category}</p>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignContent: "center",
          justifyContent: "center",
        }}
      >
        <p className="text">
          Donated By: {donated_by.first_name} {donated_by.last_name}
        </p>
        <ChatIcon style={{ padding: "7px" }} />
      </div>

      <p className="text">Email: {donated_by.email}</p>
    </div>
  );
};

const DonationList = ({ donations }) => {
  return (
    <div className="donation-list">
      {donations &&
        donations.map((donation, index) => (
          <DonationCard key={index} donation={donation.donation} />
        ))}
    </div>
  );
};

function ChatMessaging() {
  const [conversations, setConversations] = useState([]);
  const [conversationMap, setConversationMap] = useState({});
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [claims, setClaims] = useState({});
  const [showChatList, setShowChatList] = useState(false);

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

  const handleConversationClick = (conversationId) => {
    console.log("chat list conversationId", conversationId);
    setSelectedConversation(conversationId);
  };

  return (
    <div className="main-chat">
      {conversations.length === 0 ? (
        <div className="no-chats-message">
          <img src={home} className="no-history-image" alt="No claims" />
          <p>No chats available</p>
        </div>
      ) : (
        <>
          <div className="chat-list-container">
            <ul className="chat-list">
              {Object.values(conversationMap).map((conversation, index) => (
                <li
                  key={index}
                  className="chat-item"
                  onClick={() => handleConversationClick(conversation)}
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
                        marginTop: "15px",
                      }}
                    >
                      {`${conversation.person2.first_name} ${conversation.person2.last_name}`}
                      <div className="chat-message">
                        {conversation.message.text}
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="chat-component-container">
            {selectedConversation && (
              <ChatComponent conversation={selectedConversation} />
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default ChatMessaging;
