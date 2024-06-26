import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { MdLogin } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import NavBar from "../NavBar";
import dollar from "../../assets/images/dollar.png";
import { useDispatch, useSelector } from "react-redux";
import { setUserInfo } from "../../store/slices/user";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch()

  const navigate = useNavigate();

  const handleSupportButton = () => {
    navigate("/support");
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    const apiUrl = "http://localhost:8000/api/login";

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      if (!response.ok) {
        if (response.status === 400) {
          alert("Please confirm your email in inbox before proceeding");
        } else if (response.status === 403) {
          alert("Incorrect credentials!");
        } else {
          alert("An error occurred!");
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
      } else {
        const data = await response.json();

        // Handle the data here
        console.log("Login successful:", data);

        // Assuming your response structure is { name, email, phone, has_car, access, refresh }
        const { name, email, phone, has_car, access, refresh } = data;

        sessionStorage.setItem("profile", JSON.stringify(data.user));
        sessionStorage.setItem("access", JSON.stringify(access));
        sessionStorage.setItem("refresh", JSON.stringify(refresh));
        // Now you can handle the logged-in user, access token, and refresh token
        console.log("Logged in user:", data.user.first_name);
        console.log("Access token:", data.access);
        console.log("Refresh token:", data.refresh);
        dispatch(setUserInfo(data.user))
        navigate('/')
      }
    } catch (error) {
      // Handle errors here
      console.error("Error:", error.message);
    }
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSignUp = () => {
    // Navigate to the Register page
    navigate("/register");
  };

  return (
    <div className="main-login-register">
      {/* <NavBar /> */}
      <section className="login-container">
        <div className="statistics">
          <div className="stat-item">
            <div className="login-register">
              <form onSubmit={handleLogin} className="login-form">
                <h2 className="login-register-title">
                  Log in <MdLogin style={{ color: "#98ed64" }} />
                </h2>
                <div style={{ textAlign: "center", fontSize: "14px" }}>
                  Together, We Make a Difference
                </div>
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />

                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <div className="eye-icon" onClick={handleTogglePassword}>
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </div>

                <button type="submit" className="submit-btn">
                  Login
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
                  Don't have an account?
                </div>
                <button
                  type="button"
                  className="signup-btn"
                  style={{ background: "#543c52", color: "#fff" }}
                  onClick={handleSignUp}
                >
                  Sign up
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;
