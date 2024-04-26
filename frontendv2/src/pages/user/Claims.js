import React, { useState, useEffect } from "react";
//import claims from "./claims.json";
import "./Claims.css"; // Import the CSS file
import NavBar from "../NavBar";
import home from "../../assets/images/home.png";
const DonationCard = ({ donation }) => {
  const { item, category, donated_by } = donation;

  return (
    <div className="card">
      <h3>{item}</h3>
      <p className="text">Category: {category}</p>
      <p className="text">
        Donated By: {donated_by.first_name} {donated_by.last_name}
      </p>
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

  /*
   useEffect(() => {
    // Simulating fetching data from API
    setData(claims);
  }, []);

  */

  useEffect(() => {
    const fetchClaimsData = async () => {
      try {
        // Make an API call here to get the ride history data
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
        // Set the fetched data to the state
      } catch (error) {
        console.error("Error fetching claims data:", error);
      }
    };
    // Call the function to fetch data when the component mounts
    fetchClaimsData();
  }, []);

  return (
    <div className="main-claim-container">
      <NavBar />
      <div className="claim-container">
        <h1 className="heading">My Claims</h1>
        {claims.results?.length > 0 ? (
          <DonationList donations={claims.results} />
        ) : (
          <div>
            <img src={home} className="no-history-image" />
            <p>No claims available</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Claims;
