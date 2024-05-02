import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import MessageList from "./MessageList";
import ChatInput from "./ChatInput";
import { useParams, useLocation } from "react-router-dom";
import io from "socket.io-client";

const ChatComponent = ({ conversation }) => {
  const [messages, setMessages] = useState([]);
  const [userData, setUserData] = useState({});
  const [initiator, setInitiator] = useState({});
  const [receiver, setReceiver] = useState({});
  const [error, setError] = useState(null);
  const { conversation_id, person2, person1 } = conversation;
  const [receiverName, setReceiverName] = useState("");
  const location = useLocation();
  const personDetails = location.state ? location.state.person : null;

  const socket = useRef(null); // Change to useRef

  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem("userData"));
    console.log("User", user);
    setUserData(user);
    fetchMessages();

    // Subscribe to conversation_id channel
    if (conversation_id && socket.current) {
      // Check if socket exists before using it
      console.log("Channel exists");
      socket.current.emit("subscribe", { channel: conversation_id });
    }

    // Listen for incoming messages
    if (socket.current) {
      // Check if socket exists before using it
      socket.current.on("message", (message) => {
        console.log("Received message:", message);
        setMessages((prevMessages) => [...prevMessages, message]);
      });
    }

    return () => {
      // Clean up on component unmount
      if (socket.current) {
        // Check if socket exists before using it
        socket.current.disconnect();
      }
    };
  }, [conversation_id, person2]);

  const fetchMessages = async () => {
    if (conversation_id) {
      try {
        const access = JSON.parse(sessionStorage.getItem("access"));
        console.log("conversation_id", conversation_id);
        console.log("person2", person2);
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
    } else {
      setMessages([]);
    }
  };

  const sendMessage = async (messageText) => {
    if (userData) {
      let newMessage = {}; // Changed from const to let

      if (conversation_id) {
        const email =
          person1.id === initiator.id ? receiver.email : initiator.email;
        newMessage = {
          receiver: email,
          text: messageText,
          conversation_id: conversation_id,
        };
      } else {
        newMessage = {
          receiver: person2.email,
          text: messageText,
        };
      }
      console.log("Send Message newMessage", newMessage);
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
            backgroundColor: "#543c52",
            color: "#fff",
            padding: "20px",
            border: "1.5px solid #ccc",
          }}
        >
          {person2?.first_name + " " + person2?.last_name}
        </div>
        <MessageList messages={messages} currentUserId={userData.id} />
        <ChatInput onSend={sendMessage} />
      </div>
    </div>
  );
};

export default ChatComponent;
