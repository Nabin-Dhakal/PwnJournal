import { useState, useEffect } from "react";
import axios from "../api/axios";

const useToken = () => {
  const [tokenReady, setTokenReady] = useState(false);
  const [tokenError, setTokenError] = useState(null);

  useEffect(() => {
    const fetchToken = async () => {
      try {
        await axios.get('/csrf/', { withCredentials: true });
        setTokenReady(true);
      } catch (err) {
        console.error("Failed to fetch CSRF token:", err);
        setTokenError(err);
      }
    };

    fetchToken();
  }, []);

  return [tokenReady, tokenError];
};

export default useToken;
