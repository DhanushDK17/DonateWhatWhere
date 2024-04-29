import React, { useState } from "react";
import NavBar from "../NavBar";
import axios from "axios";
const CreateEvent = () => {
  const [eventData, setEventData] = useState({
    name: "",
    description: "",
    datetime: "",
  });

  const handleChange = (e) => {
    setEventData({ ...eventData, [e.target.name]: e.target.value });
  };

  const handleDateChange = (datetime) => {
    setEventData({ ...eventData, datetime });
  };

  const handleSubmit = async () => {
    try {
      const access = JSON.parse(sessionStorage.getItem("access"));
      const response = await axios.post(
        "http://localhost:8000/api/event",
        eventData, // Pass the request body directly here
        {
          headers: {
            Authorization: `Bearer ${access}`,
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      alert("Event created successfully!!");
    } catch (error) {
      console.error("Error while creating event:", error);
    }
  };

  return (
    <div className="user-profile-container">
      <NavBar />
      <div className="user-profile">
        <div>
          <h2>Create a Event</h2>
          <form onSubmit={handleSubmit} className="login-form">
            <div>
              <label>Name of the event:</label>
              <input
                type="text"
                name="name"
                value={eventData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label>Description:</label>
              <input
                type="text"
                name="description"
                value={eventData.description}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-group">
              <label>Date and Time:</label>
              <input
                type="datetime-local"
                value={eventData.datetime}
                onChange={(e) => handleDateChange(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="submit-btn">
              Create Event
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateEvent;
