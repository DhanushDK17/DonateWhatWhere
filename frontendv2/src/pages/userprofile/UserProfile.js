import React, { useEffect, useState } from "react";
import default_profile_photo from "../../assets/images/home.png";
import default_cover_photo from "../../assets/images/main2.png";
import NavBar from "../NavBar";

const UserProfile = () => {
  const [error, setError] = useState(null);
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        //You can uncomment these lines
        const access = JSON.parse(sessionStorage.getItem("access"));
        const response = await fetch("http://localhost:8000/api/profile", {
          headers: {
            Authorization: `Bearer ${access}`,
            "Content-Type": "application/json",
          },
        });

        /* you can commented out these lines to... */
        // const response = await fetch(
        //   "https://run.mocky.io/v3/d80c60c3-7f40-44f4-bace-31eaeada02ad"
        // );
        /*...here*/

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setUserInfo(data);
      } catch (e) {
        setError(e.message);
      }
    };

    fetchUserData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can perform actions like updating the user info here
    console.log("Updated user info:", userInfo);
  };

  return (
    <div className="user-profile-container">
      <NavBar />
      <div className="user-profile">
        <div className="cover-photo">
          <img
            src={default_cover_photo}
            alt="Cover"
            className="cover-photo-img"
          />
          <div className="profile-header">
            <img
              src={default_profile_photo}
              alt="Profile"
              className="profile-pic"
            />
            <h1 style={{ padding: "15px" }}>Your Profile</h1>
          </div>
        </div>
        <div className="profile-container">
          <form onSubmit={handleSubmit} className="login-form">
            <label>
              First Name:
              <input
                type="text"
                name="first_name"
                value={userInfo.first_name}
                onChange={handleChange}
              />
            </label>

            <label>
              Last Name:
              <input
                type="text"
                name="last_name"
                value={userInfo.last_name}
                onChange={handleChange}
              />
            </label>

            <label>
              Email:
              <input
                type="email"
                name="email"
                value={userInfo.email}
                onChange={handleChange}
                disabled
              />
            </label>

            <label>
              Phone:
              <input
                type="tel"
                name="phone"
                value={userInfo.phone}
                onChange={handleChange}
              />
            </label>

            <label>
              Account Type:
              <input
                type="user_type"
                name="user_type"
                value={userInfo.user_type}
                onChange={handleChange}
                disabled
              />
            </label>

            <label>
              Address:
              <input
                type="text"
                name="address"
                value={userInfo.address || ""}
                onChange={handleChange}
              />
            </label>
            <br />
            <button type="submit" className="submit-btn">
              Update
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
