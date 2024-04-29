import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import logoImage from "../assets/images/home.png";
import { FaUserAlt } from "react-icons/fa";
import AddIcon from "@mui/icons-material/Add";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ChatIcon from "@mui/icons-material/Chat";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CloseIcon from "@mui/icons-material/Close";
import LoadingButton from "@mui/lab/LoadingButton";
import {
  IoIosAddCircleOutline,
  IoIosArrowDown,
  IoIosArrowForward,
} from "react-icons/io";
import { FaCalendarDays } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
const NavBar = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isHelpDropdownOpen, setHelpDropdownOpen] = useState(false);
  const [isRideDropdownOpen, setRideDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const ridedropdownRef = useRef(null);
  const helpdropdownRef = useRef(null);
  const navigate = useNavigate();
  // Retrieve data from sessionStorage
  const userDataString = sessionStorage.getItem("userData");
  // Parse the JSON string into an object
  const userData = JSON.parse(userDataString);

  const handleDropdownToggle = (event) => {
    event.stopPropagation();
    setDropdownOpen((prevState) => !prevState);

    if (isRideDropdownOpen) {
      setRideDropdownOpen((prevState) => !prevState);
    }

    if (isHelpDropdownOpen) {
      setHelpDropdownOpen((prevState) => !prevState);
    }
  };

  const handleLogout = () => {
    // Clear all items from sessionStorage
    sessionStorage.clear();
    sessionStorage.removeItem("userData");
    sessionStorage.removeItem("profile");
    navigate("/");
    setDropdownOpen(false);
  };

  const handleHelpDropdownToggle = (event) => {
    event.stopPropagation();
    console.log("Before", isHelpDropdownOpen);
    setHelpDropdownOpen((prevState) => !prevState);
    if (isRideDropdownOpen) {
      setRideDropdownOpen((prevState) => !prevState);
    }
    if (isDropdownOpen) {
      setDropdownOpen((prevState) => !prevState);
    }
  };

  const handleRideDropdownToggle = (event) => {
    event.stopPropagation();
    console.log("Before", isRideDropdownOpen);
    setRideDropdownOpen((prevState) => !prevState);
    if (isHelpDropdownOpen) {
      setHelpDropdownOpen((prevState) => !prevState);
    }

    if (isDropdownOpen) {
      setDropdownOpen((prevState) => !prevState);
    }
  };

  useEffect(() => {
    console.log("After", isHelpDropdownOpen);
  }, [isHelpDropdownOpen]);

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownOpen(false);
    }

    if (
      ridedropdownRef.current &&
      !ridedropdownRef.current.contains(event.target)
    ) {
      setRideDropdownOpen(false);
    }

    if (
      helpdropdownRef.current &&
      !helpdropdownRef.current.contains(event.target)
    ) {
      setHelpDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);
  const isUserLoggedIn = sessionStorage.getItem("access") !== null;

  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="nav-logo-img">
          <img
            src={logoImage}
            alt="img"
            style={{ width: "55px", height: "auto" }}
          />
        </div>
        <Link to="/landingpage" className="nav-logo">
          Donate What Where
        </Link>

        <div className="nav-links">
          <Link className="nav-item" to="/">
            My Donations
          </Link>

          <div
            className="nav-item help-dropdown"
            onClick={handleHelpDropdownToggle}
            ref={helpdropdownRef}
          >
            Help <IoIosArrowDown style={{ paddingLeft: "5px" }} />
            {isHelpDropdownOpen && (
              <div className="submenu">
                <Link
                  to="/faq"
                  className="submenu-item"
                  onClick={(event) => handleHelpDropdownToggle(event)}
                >
                  FAQ
                </Link>
                <Link
                  to="/support"
                  className="submenu-item"
                  onClick={(event) => handleHelpDropdownToggle(event)}
                >
                  Support
                </Link>
                <Link
                  to="/about"
                  className="submenu-item"
                  onClick={(event) => handleHelpDropdownToggle(event)}
                >
                  About
                </Link>
              </div>
            )}
          </div>
        </div>
        <div className="nav-user" ref={dropdownRef}>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
            }}
            onClick={handleDropdownToggle}
          >
            <FaUserAlt className="user-profile-icon" />
            <div
              className="nav-item login-dropdown"
              style={{
                display: "flex",
                flexDirection: "row",
              }}
            >
              {isUserLoggedIn && userData && <div>{userData.name}</div>}
              <IoIosArrowDown
                style={{ paddingLeft: "5px", paddingBottom: "7px" }}
              />
            </div>
          </div>
          {isDropdownOpen && (
            <div className="dropdown-menu">
              {isUserLoggedIn ? (
                <>
                  <Link
                    to="/userprofile"
                    className="dropdown-item"
                    onClick={(event) => handleDropdownToggle(event)}
                  >
                    User Profile{" "}
                    <IoIosArrowForward style={{ paddingLeft: "45px" }} />
                  </Link>
                  {/* TODO: Neha can you help me here to set up conditional navigation to Rides or Passengers */}
                  <Link
                    to="/claims"
                    className="dropdown-item"
                    onClick={(event) => handleDropdownToggle(event)}
                  >
                    My Claims{" "}
                    <IoIosArrowForward style={{ paddingLeft: "35px" }} />
                  </Link>
                  <div className="dropdown-item" onClick={handleLogout}>
                    Log out{" "}
                    <IoIosArrowForward style={{ paddingLeft: "35px" }} />
                  </div>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="dropdown-item"
                    onClick={(event) => handleDropdownToggle(event)}
                  >
                    Log in <IoIosArrowForward style={{ paddingLeft: "45px" }} />
                  </Link>
                  <Link
                    to="/option"
                    className="dropdown-item"
                    onClick={(event) => handleDropdownToggle(event)}
                  >
                    Sign up{" "}
                    <IoIosArrowForward style={{ paddingLeft: "35px" }} />
                  </Link>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
