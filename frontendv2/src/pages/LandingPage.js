import React from "react";
import Footer from "./Footer";
import { SiGooglemaps } from "react-icons/si";
import { useNavigate } from "react-router-dom";
import backgroundImage from "../assets/images/main2.png";

const LandingPage = () => {
  const navigate = useNavigate();
  const handleJoinButton = () => {
    navigate("/register");
  };

  return (
    <div className="content-wrapper">
      <section className="hero">
        <h1>Welcome to Donate What Where</h1>
        <p>Transform Lives: Donate to Create Brighter Futures!.</p>
        <button className="cta-btn" onClick={handleJoinButton}>
          Join Us Today!
        </button>
      </section>
      <div className="tag">
        <img
          src={backgroundImage}
          alt="Bobcat Carpool Logo"
          style={{ width: "100%", height: "auto" }}
        />
        <h2 className="tagline1">Be the Change You Wish to See. Donate!</h2>
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
