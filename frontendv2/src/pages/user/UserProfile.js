import React, { useEffect, useState } from "react";
import default_profile_photo from "../../assets/images/profile.png";
import default_cover_photo from "../../assets/images/main2.png";
import NavBar from "../NavBar";

const UserProfile = () => {
  const [error, setError] = useState(null);
  const [userInfo, setUserInfo] = useState({});
  const [photo, setPhoto] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const access = JSON.parse(sessionStorage.getItem("access"));
        const response = await fetch("http://localhost:8000/api/profile", {
          headers: {
            Authorization: `Bearer ${access}`,
            "Content-Type": "application/json",
          },
        });

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

  const handleSave = async () => {
    console.log("Saving updated profile:");

    try {
      const access = JSON.parse(sessionStorage.getItem("access"));

      const formData = new FormData();
      formData.append("address", userInfo.address);
      if (photo) {
        formData.append("profile_photo_base64", photo);
      }

      const response = await fetch("http://localhost:8000/api/profile", {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${access}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const updatedData = await response.json();
      setUserInfo({ ...userInfo, profile: updatedData });
      alert("Data saved successfully!!");
    } catch (error) {
      console.error("Failed to save profile:", error);
    }
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
              src={userInfo.profile_photo_base64 || default_profile_photo}
              alt="Profile"
              className="profile-pic"
            />
            <h1 style={{ padding: "15px" }}>Your Profile</h1>
          </div>
        </div>
        <div className="profile-container">
          <div className="login-form">
            <br />
            <label style={{ flexDirection: "row" }}>
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
                disabled
              />
            </label>

            <label>
              Profile picture:
              <input
                type="file"
                accept=".jpg, .jpeg, .png"
                onChange={(e) => setPhoto(e.target.files[0])}
                placeholder="Upload your photo"
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
            <button
              type="button" // Change the type to 'button'
              className="submit-btn"
              onClick={handleSave} // Trigger save action onClick
            >
              Update
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
