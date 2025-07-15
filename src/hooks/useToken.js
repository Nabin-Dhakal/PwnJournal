import { useState, useEffect } from "react";
import axios from "../api/axios";

const getCookie = (name) => {
  const cookies = document.cookie.split(';');
  for (let cookie of cookies) {
    const [key, value] = cookie.trim().split('=');
    if (key === name) {
      return decodeURIComponent(value);
    }
  }
  return null;
};

const useToken = () => {
  const [token, setToken] = useState(null);
  const [tokenloading, setTokenloading] = useState(true);
  const [tokenerror, setTokenerror] = useState(null);

  useEffect(() => {
    const fetchToken = async () => {
      try {
        await axios.get('/csrf/', {
          withCredentials: true,
        });

        setTimeout(() => {
        const csrfToken = getCookie('csrftoken');
        setToken(csrfToken);
      } catch (err) {
        console.error("Failed to fetch CSRF token:", err);
        setTokenerror(err);
      } finally {
        setTokenloading(false);
      }},500);
    };

    fetchToken();
  }, []);

  return [token, tokenloading, tokenerror];
};

export default useToken;
