import { useState, useEffect } from "react";
import axios from "axios";

const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
  return null;
};

const useToken = () => {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const fetchToken = async () => {
      try {
        await axios.get('nabin.pythonanywhere.com/api/csrf/', {
          withCredentials: true,
        });
        const csrfToken = getCookie('csrftoken');
        setToken(csrfToken);
      } catch (err) {
        setError(err);
      }
    };

    fetchToken();
  }, []);

  return [ token ];
};

export default useToken;
