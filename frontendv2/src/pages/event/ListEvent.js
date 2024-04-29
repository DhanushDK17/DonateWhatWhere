import React, { useState, useEffect } from "react";
//import claims from "./claims.json";
import "../user/Claims.css"; // Import the CSS file
import NavBar from "../NavBar";
import home from "../../assets/images/home.png";
const DonationCard = ({ donation }) => {
  const { name, description, datetime } = donation;

  return (
    <div className="card">
      <p className="text">Name: {name}</p>
      <p className="text">description: {description}</p>
      <p className="text">Date and Time: {datetime}</p>
    </div>
  );
};

const DonationList = ({ donations }) => {
  return (
    <div className="donation-list">
      {donations &&
        donations.map((donation, index) => (
          <DonationCard key={index} donation={donation} />
        ))}
    </div>
  );
};

const ListEvent = () => {
  const [events, setEvents] = useState({});

  /*
   useEffect(() => {
    // Simulating fetching data from API
    setData(claims);
  }, []);

  */

  useEffect(() => {
    const fetchEventsData = async () => {
      try {
        // Make an API call here to get the ride history data
        const access = JSON.parse(sessionStorage.getItem("access"));
        const response = await fetch("http://localhost:8000/api/event", {
          headers: {
            Authorization: `Bearer ${access}`,
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        if (response.ok) {
          setEvents(data);
        } else {
          console.error(
            "Failed to fetch claims data. Server returned:",
            response.status,
            response.statusText
          );
        }
        // Set the fetched data to the state
      } catch (error) {
        console.error("Error fetching claims data:", error);
      }
    };
    // Call the function to fetch data when the component mounts
    fetchEventsData();
  }, []);

  return (
    <div className="main-claim-container">
      <NavBar />
      <div className="claim-container">
        <h1 className="heading">Events</h1>
        {events.results?.length > 0 ? (
          <DonationList donations={events.results} />
        ) : (
          <div>
            <img src={home} className="no-history-image" />
            <p>No events available</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ListEvent;
