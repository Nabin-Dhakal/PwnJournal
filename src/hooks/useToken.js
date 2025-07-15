import { useState, useEffect } from "react";
import axios from "../api/axios";

const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
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
        const csrfToken = getCookie('csrftoken');
        setToken(csrfToken);
      } catch (err) {
        console.error("Failed to fetch CSRF token:", err);
        setTOkenerror(err);
      } finally {
        setTOkenloading(false);
      }
    };

    fetchToken();
  }, []);

  return [token, loading, error];
};

export default useToken;
