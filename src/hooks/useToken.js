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
  const [tokenLoading, setTokenLoading] = useState(true);
  const [tokenError, setTokenError] = useState(null);

  useEffect(() => {
    const fetchToken = async () => {
      try {
        // Request to backend to set the CSRF cookie
        await axios.get('/csrf/', {
          withCredentials: true,
        });

        // Wait a moment to allow the cookie to be set
        setTimeout(() => {
          const csrfToken = getCookie('csrftoken');
          if (!csrfToken) {
            throw new Error("CSRF token not found in cookies.");
          }

          setToken(csrfToken);
          console.log("CSRF token fetched:", csrfToken); // Log the token directly
        }, 100); // Use a short timeout if needed (optional)
      } catch (err) {
        console.error("Failed to fetch CSRF token:", err);
        setTokenError(err);
        setTokenLoading(false); // In case of immediate error
      } finally {
        // Move loading flag into the timeout block
        setTimeout(() => {
          setTokenLoading(false);
        }, 100);
      }
    };

    fetchToken();
  }, []);

  return [token, tokenLoading, tokenError];
};

export default useToken;
