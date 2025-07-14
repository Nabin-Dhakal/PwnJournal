import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api/';

export default axios.create({
  baseURL: BASE_URL,
  withCredentials: false,
});
