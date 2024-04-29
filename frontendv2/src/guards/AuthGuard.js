import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { setUserInfo } from '../store/slices/user';
import { useDispatch } from 'react-redux'

const AuthGuard = ({ component }) => {
  const [status, setStatus] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const [loading, setLoading] = useState(false)
  const [authenticated, setAuthenticated] = useState(false)

  useEffect(() => {
    fetchProfileInfo();
  }, [component]);

  const fetchProfileInfo = async () => {
    try {
        setLoading(true)
        const apiUrlGet = "http://127.0.0.1:8000/api/profile"; // Replace with your actual endpoint
        const accessToken = JSON.parse(sessionStorage.getItem("access"));
        const responseGet = await fetch(apiUrlGet, {
            method: "GET",
            headers: {
                "Content-Type": "application/json;",
                "Authorization": `Bearer ${accessToken}`
            }
        });
        setAuthenticated(true)
        if (responseGet.ok) {
            const dataGet = await responseGet.json();
            dispatch(setUserInfo(dataGet))
            console.log("GET request successful:", dataGet);
            sessionStorage.setItem("profile", JSON.stringify(dataGet));
        } else {
            console.error("GET request failed! Status:", responseGet.status);
            navigate(`/login`);
        }
    } catch (error) {
        navigate(`/login`);
        console.error("Error making GET request:", error.message);
    } finally {
      setLoading(false)
    }
  }

  return authenticated ? <React.Fragment>{component}</React.Fragment> : <React.Fragment></React.Fragment>;
}

export default AuthGuard;