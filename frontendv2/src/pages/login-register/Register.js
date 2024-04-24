import React, { useState } from "react";
import { MdLogin } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import NavBar from "../NavBar";
import dollar from "../../assets/images/dollar.png";

const Register = () => {
  const navigate = useNavigate();

  // State for registration
  const [fullName, setFullName] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [photo, setPhoto] = useState(null);
  const [phone, setPhone] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    // Create the request body
    const requestBody = {
      name: fullName,
      email: registerEmail,
      password: registerPassword,
      phone: phone,
    };

    try {
      const response = await fetch("http://127.0.0.1:8000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (response.ok) {
        // Registration successful
        const formData = new FormData();
        formData.append("email", registerEmail);
        formData.append("profile_photo", photo);

        const imageResponse = await fetch("http://127.0.0.1:8000/api/image", {
          method: "POST",
          body: formData,
        }).then((imageResponse) => {
          // Handle the response
          if (!imageResponse.ok) {
            throw new Error("Network response was not ok.");
          }
          console.log(imageResponse.json());
        });
        alert("Registration successful!");
        navigate("/login");
      } else {
        // Registration failed
        alert("Registration failed!");
      }
    } catch (error) {
      console.error("Error during registration:", error);
      alert("An error occurred during registration. Please try again later.");
    }
  };

  const handleSupportButton = () => {
    navigate("/support");
  };

  const handleLogin = () => {
    // Navigate to the Register page
    navigate("/login");
  };

  return (
    <div className="main-login-register">
      <NavBar />
      <section className="login-container">
        <div className="statistics">
          <div className="stat-item">
            <div className="login-register">
              <form onSubmit={handleRegister} className="register-form">
                <h2 className="login-register-title">
                  Sign up <MdLogin style={{ color: "#98ed64" }} />
                </h2>
                <div style={{ textAlign: "center", fontSize: "14px" }}>
                  Every Donation Counts. Join Us!
                </div>
                <input
                  type="text"
                  placeholder="Full Name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="login-register-input"
                  required
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  value={registerEmail}
                  onChange={(e) => setRegisterEmail(e.target.value)}
                  className="login-register-input"
                  required
                />

                <input
                  type="password"
                  placeholder="Password"
                  value={registerPassword}
                  onChange={(e) => setRegisterPassword(e.target.value)}
                  className="login-register-input"
                  required
                />
                <input
                  type="password"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="login-register-input"
                  required
                />
                <input
                  type="number"
                  placeholder="Phone number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="login-register-input"
                  required
                />
                <input
                  type="file"
                  accept=".jpg, .jpeg, .png"
                  onChange={(e) => setPhoto(e.target.files[0])}
                  className="login-register-input"
                  placeholder="Upload your photo"
                />
                <button type="submit" className="submit-btn">
                  Sign Up
                </button>
                <div
                  style={{
                    textAlign: "center",
                    margin: "15px",
                    fontSize: "14px",
                  }}
                >
                  -------------OR-------------
                </div>
                <div
                  style={{
                    paddingLeft: "5px",
                    fontSize: "14px",
                    margin: "0px",
                  }}
                >
                  Already have an account?
                </div>
                <button
                  type="button"
                  className="signup-btn"
                  style={{ background: "#edd2cb", color: "#361d32" }}
                  onClick={handleLogin}
                >
                  Log In
                </button>
              </form>
            </div>
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
};

export default Register;
