import React, { useState } from "react";
import { MdLogin } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import NavBar from "../NavBar";
import dollar from "../../assets/images/dollar.png";

export default function Option() {
  const [userType, setUserType] = useState("");
  const navigate = useNavigate();

  const handleSupportButton = () => {
    navigate("/support");
  };

  const handleRegister = (type) => {
    // Set the userType state
    setUserType(type);

    // Navigate to the Register page with the userType parameter
    navigate("/register", { state: { userType: type } });
  };

  return (
    <div className="main-login-register">
      {/* <NavBar /> */}
      <section className="login-container">
        <div className="statistics">
          <div className="stat-item">
            <p>Who are you?</p>
            <button
              className="login-register"
              style={{ border: "1.5px solid #f55951" }}
              onClick={() => handleRegister("ORGANIZATION")}
            >
              <h1>A Non Profit Organization</h1>
              <p>
                I work for a non profit Organization, and I would like to create
                a account for them
              </p>
            </button>
            <p></p>
            <button
              className="login-register"
              style={{ border: "1.5px solid #f55951" }}
              onClick={() => handleRegister("PERSONAL")}
            >
              <h1>An Individual</h1>
              <p>I would like to createan account for myself</p>
            </button>
          </div>
          <div className="stat-item">
            <h1 style={{ fontSize: "24px", color: "#f55951" }}>
              Trusted by thousands of nonprofits, schools, and businesses
            </h1>
            <img
              src={dollar}
              alt="img"
              style={{ width: "30%", height: "auto" }}
            />
            <p style={{ fontSize: "18px" }}>Simple to Use and Customize</p>
            <p style={{ fontSize: "18px" }}>No Hidden Fees or Add-on Costs</p>
            <p style={{ fontSize: "18px" }}>Safe, Secure Pages & Forms</p>
            <p style={{ fontSize: "18px" }}>Great Customer Support</p>

            <button className="cta-btn" onClick={handleSupportButton}>
              Talk to our Support Team
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
