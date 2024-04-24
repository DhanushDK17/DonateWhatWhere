import React from "react";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";
import backgroundImage from "../assets/images/main2.png";
import home from "../assets/images/home.png";
import NavBar from "./NavBar";
const LandingPage = () => {
  const navigate = useNavigate();

  const handleJoinButton = () => {
    navigate("/option");
  };

  return (
    <div className="content-wrapper">
      <NavBar />
      <section className="hero">
        <div className="statistics">
          <div className="stat-item">
            <img
              src={home}
              alt="img"
              style={{ width: "60%", height: "auto" }}
            />
          </div>
          <div className="stat-item">
            <h1 style={{ fontSize: "24px" }}>Donation Platform Features</h1>
            <p style={{ fontSize: "18px" }}>
              A fundraising platform designed to offer top-notch features and
              functionality tailored to meet your organization's needs, all
              while being budget-friendly. Unlock the power of enterprise-level
              solutions at a fraction of the cost with Donate What Where.
            </p>
            <button className="cta-btn" onClick={handleJoinButton}>
              Get Started
            </button>
          </div>
        </div>
      </section>
      <div className="tag">
        <img
          src={backgroundImage}
          alt="Bobcat Carpool Logo"
          style={{ width: "100%", height: "auto" }}
        />
      </div>
      <section className="stats">
        <h2 className="title">Our Impact</h2>
        <div className="statistics">
          <div className="stat-item">
            <strong>15,000+</strong>
            <p>Donations</p>
          </div>
          <div className="stat-item">
            <strong>5,000+</strong>
            <p>Happy Users</p>
          </div>
          <div className="stat-item">
            <strong>10,000+</strong>
            <p>Lives Changed</p>
          </div>
        </div>
      </section>
      <section className="testimonials">
        <h2 className="title">What Our Users Say</h2>
        <div className="testimonial-card">
          <p>"The best donation experience I've had!"</p>
          <cite>- Jane Doe</cite>
        </div>
        {/* You can add more testimonial cards here */}
      </section>
      <Footer />
    </div>
  );
};

export default LandingPage;
