import React, { useEffect, useState } from "react";
import axios from "axios";
import MessageList from "./MessageList";
import ChatInput from "./ChatInput";
import { useParams, useLocation } from "react-router-dom";

const ChatComponent = () => {
  const [messages, setMessages] = useState([]);
  const [userData, setUserData] = useState({});
  const [initiator, setInitiator] = useState({});
  const [receiver, setReceiver] = useState({});
  const [error, setError] = useState(null);
  const { conversation_id } = useParams();
  const [receiverName, setReceiverName] = useState("");
  const location = useLocation();
  const personDetails = location.state ? location.state.person : null;
  // Define fetchMessages function
  const fetchMessages = async () => {
    try {
      const access = JSON.parse(sessionStorage.getItem("access"));
      const response = await fetch(
        `http://localhost:8000/api/message/${conversation_id}`,
        {
          headers: {
            Authorization: `Bearer ${access}`,
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      console.log("Response", data);
      const formattedMessages = data.message_set.map((msg) => ({
        senderId: msg.sender,
        text: msg.text,
        timestamp: msg.timestamp,
      }));
      setInitiator(data.initiator);
      setReceiver(data.receiver);
      setMessages(formattedMessages);
      console.log("userData", userData);
      console.log("initiator", initiator);

      console.log("receiverName", receiverName);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem("userData"));
    console.log("User", user);
    setUserData(user);
    fetchMessages();
    // const intervalId = setInterval(fetchMessages, 3000);
    // return () => clearInterval(intervalId);
  }, []);

  const sendMessage = async (messageText) => {
    const email =
      userData.id === initiator.id ? receiver.email : initiator.email;
    console.log("Receiver email", email);

    if (userData) {
      const newMessage = {
        receiver: email,
        text: messageText,
        conversation_id: conversation_id,
      };

      try {
        const access = JSON.parse(sessionStorage.getItem("access"));
        const response = await axios.post(
          "http://localhost:8000/api/conversation",
          newMessage, // Pass the request body directly here
          {
            headers: {
              Authorization: `Bearer ${access}`,
              "Content-Type": "application/json",
            },
          }
        );
        //Uncomment these lines
        /*
        setTimeout(() => {
          fetchMessages();
        }, 10000);
       */
        // Do something with the response if needed
      } catch (error) {
        console.error("Error sending message:", error);
      }
    } else {
      console.error("User data is not loaded yet");
    }
  };

  if (error) {
    return <div>Error loading chat: {error}</div>;
  }

  if (!userData) {
    return <div>Loading...</div>; // or any other loading indicator
  }

  return (
    <div className="chat">
      <div className="chat-container">
        <div
          style={{
            backgroundColor: "#f55951",
            color: "#fff",
            padding: "20px",
            border: "1.5px solid #ccc",
          }}
        >
          {personDetails?.first_name}
        </div>
        <MessageList messages={messages} currentUserId={userData.id} />
        <ChatInput onSend={sendMessage} />
      </div>
    </div>
  );
};

export default ChatComponent;
