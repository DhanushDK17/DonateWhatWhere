import React, { useState } from "react";
import NavBar from "../NavBar";
import axios from "axios";
import { createEvent } from "../../api/events";
import { useNavigate } from "react-router";
const CreateEvent = () => {
  const [eventData, setEventData] = useState({
    name: "",
    description: "",
    datetime: "",
  });

  const navigate = useNavigate()

  const handleChange = (e) => {
    setEventData({ ...eventData, [e.target.name]: e.target.value });
  };

  const handleDateChange = (datetime) => {
    setEventData({ ...eventData, datetime });
  };

  const handleSubmit = () => {
    createEvent(eventData)
    .then(data => navigate('/events'))
    .catch(error => console.error(error))
  };

  return (
    <div className="user-profile-container">
      <div className="user-profile">
        <div>
          <h2>Create a Event</h2>
          <form className="login-form">
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

            <button onClick={handleSubmit} className="submit-btn">
              Create Event
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateEvent;
