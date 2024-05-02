import React, { useState, useEffect } from "react";
import "./Claims.css"; // Import the CSS file
import home from "../../assets/images/home.png";
import ChatIcon from "@mui/icons-material/Chat";
import ChatList from "../chat/ChatList";
import ChatComponent from "../chat/ChatComponent";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  AccordionActions,
  Button,
  Grid,
  IconButton,
  Stack,
  Typography,
  Chip,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PlaceIcon from "@mui/icons-material/Place";

const Claims = () => {
  const [claims, setClaims] = useState({});
  const [showChatList, setShowChatList] = useState(false);
  const [conversations, setConversations] = useState([]);
  const [conversationMap, setConversationMap] = useState({});
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [showChatComponent, setShowChatComponent] = useState(false);
  const [selectedDonation, setSelectedDonation] = useState(null); // Add state to store selected donation

  useEffect(() => {
    const fetchData = async () => {
      try {
        const access = JSON.parse(sessionStorage.getItem("access"));
        const userData = JSON.parse(sessionStorage.getItem("userData"));

        // Fetch conversations
        const conversationResponse = await fetch(
          "http://localhost:8000/api/conversation",
          {
            headers: {
              Authorization: `Bearer ${access}`,
              "Content-Type": "application/json",
            },
          }
        );
        const conversationData = await conversationResponse.json();

        if (conversationResponse.ok) {
          // Ensure data is an array before setting state
          if (Array.isArray(conversationData.results)) {
            setConversations(conversationData.results);
            const newConversationMap = {};

            conversationData.results.forEach((conversation) => {
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
            console.log("Conversation", conversationData);
            console.log("newConversationMap", newConversationMap);
          } else {
            console.error(
              "Conversation data is not an array:",
              conversationData
            );
          }
        } else {
          console.error(
            "Failed to fetch conversation data. Server returned:",
            conversationResponse.status,
            conversationResponse.statusText
          );
        }

        // Fetch claims
        const claimResponse = await fetch("http://localhost:8000/api/claim", {
          headers: {
            Authorization: `Bearer ${access}`,
            "Content-Type": "application/json",
          },
        });
        const claimData = await claimResponse.json();

        if (claimResponse.ok) {
          setClaims(claimData);
        } else {
          console.error(
            "Failed to fetch claims data. Server returned:",
            claimResponse.status,
            claimResponse.statusText
          );
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleChatIconClick = (donation) => {
    setSelectedDonation(donation);
    const claimant_id = donation.donation.donated_by.id;
    const my_id = donation.claimant.id;
    const key = [my_id, claimant_id].join("_");
    let conversation = {};
    if (conversationMap.hasOwnProperty(key)) {
      conversation = conversationMap[key];
    } else {
      conversation = {
        person1: donation.claimant,
        person2: donation.donation.donated_by,
        conversation_id: "",
      };
    }
    setSelectedConversation(conversation);
    setShowChatComponent(true);
  };

  return (
    <div className="main-claim-container">
      {/*<h1 className="heading">My Claims</h1>*/}
      <div className="claim-container">
        {claims.results?.length > 0 ? (
          <div className="donation-list">
            {claims.results &&
              claims.results.map((donation, index) => (
                <>
                  <Accordion style={{ border: "1.5px solid #f55951" }}>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1-content"
                      id="panel1-header"
                    >
                      <Grid item xs={7}>
                        <Stack
                          direction="row"
                          alignItems="center"
                          justifyContent="space-between"
                        >
                          <Typography sx={{ mr: 1 }}>
                            {donation.donation.item}
                          </Typography>
                          <Chip
                            label={donation.donation.category}
                            variant="outlined"
                          />
                          <Stack direction="row" alignItems="center">
                            <PlaceIcon sx={{ fontSize: 19 }} />
                            <Typography sx={{ fontSize: 15, mt: 0.3 }}>
                              Austin
                            </Typography>
                          </Stack>
                        </Stack>
                      </Grid>
                    </AccordionSummary>
                    <AccordionActions>
                      <Button size="small">Cancel</Button>
                      <IconButton
                        color="primary.main"
                        size="small"
                        onClick={() => handleChatIconClick(donation)}
                      >
                        <ChatIcon />
                      </IconButton>
                    </AccordionActions>
                  </Accordion>
                </>
              ))}
          </div>
        ) : (
          <div>
            <img src={home} className="no-history-image" alt="No claims" />
            <p>No claims available</p>
          </div>
        )}
      </div>
      <div className="chat-container">
        {showChatComponent && (
          <ChatComponent conversation={selectedConversation} />
        )}
      </div>
    </div>
  );
};

export default Claims;
