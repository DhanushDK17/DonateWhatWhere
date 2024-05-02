import React, { useState, useEffect } from "react";
import "./Claims.css"; // Import the CSS file
import NavBar from "../NavBar";
import home from "../../assets/images/home.png";
import ChatIcon from "@mui/icons-material/Chat";
import ChatList from "../chat/ChatList";

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

const Claims = () => {
  const [claims, setClaims] = useState({});
  const [showChatList, setShowChatList] = useState(false);

  useEffect(() => {
    const fetchClaimsData = async () => {
      try {
        const access = JSON.parse(sessionStorage.getItem("access"));
        const response = await fetch("http://localhost:8000/api/claim", {
          headers: {
            Authorization: `Bearer ${access}`,
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        if (response.ok) {
          setClaims(data);
        } else {
          console.error(
            "Failed to fetch claims data. Server returned:",
            response.status,
            response.statusText
          );
        }
      } catch (error) {
        console.error("Error fetching claims data:", error);
      }
    };
    fetchClaimsData();
  }, []);

  const toggleChatList = () => {
    setShowChatList(!showChatList);
  };

  return (
    <div className="main-claim-container">
      <NavBar />
      <div className="claim-container">
        <h1 className="heading">My Claims</h1>
        {claims.results?.length > 0 ? (
          <DonationList donations={claims.results} />
        ) : (
          <div>
            <img src={home} className="no-history-image" alt="No claims" />
            <p>No claims available</p>
          </div>
        )}
        {showChatList && <ChatList />}
        <ChatIcon className="chat-icon" onClick={toggleChatList} />
      </div>
    </div>
  );
};

export default Claims;
