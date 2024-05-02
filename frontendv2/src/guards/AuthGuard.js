import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { setUserInfo, getUser } from '../store/slices/user';
import { useDispatch, useSelector } from 'react-redux'
import { fetchProfile } from '../api/user';

const AuthGuard = ({ component }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const user = useSelector(getUser)

  const [loading, setLoading] = useState(false)
  const [authenticated, setAuthenticated] = useState(false)

  useEffect(() => {
    if (Object.keys(user).length === 0) {
      fetchProfileInfo();
    } else {
      setAuthenticated(true)
    }
  }, [component]);

  const fetchProfileInfo = async () => {
    setLoading(true)
    fetchProfile()
      .then(data => {
        setAuthenticated(true)
        dispatch(setUserInfo(data))
        console.log("GET request successful:", data);
        sessionStorage.setItem("profile", JSON.stringify(data));
        sessionStorage.setItem("userData", JSON.stringify(data));
      })
      .catch((error) => {
        navigate('/login')
      })
      .finally(() => setLoading(false))
  }

  return authenticated ? <React.Fragment>{component}</React.Fragment> : <React.Fragment></React.Fragment>;
}

export default AuthGuard;