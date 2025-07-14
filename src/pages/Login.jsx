import { useState } from "react";
import { IconButton } from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import useToken from "../hooks/useToken"

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [token ] = useToken();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!token) {
      setError('CSRF token not loaded yet. Please wait and try again.');
      return;
    }

    try {
      const response = await axios.post(
        'http://localhost:8000/api/login/',
        {
          username: formData.username,
          password: formData.password,
        },
        {
          withCredentials: true,
          headers: {
            'X-CSRFToken': token,  
          },
        }
      );

      console.log('Login success:', response.data);
      navigate('/profile');  
    } catch (err) {
      console.error(err.response?.data || err.message);
      setError(err.response?.data?.error || 'Login failed');
    }
  };

 

  return (
    <div className="min-h-screen flex m-20 justify-center">
      <form className="p-8 rounded-lg shadow-md w-full max-w-sm" onSubmit={handleSubmit}>
        <h2 className="text-4xl font-bold mb-6 text-center text-[#FFFFFF]">Welcome Back</h2>

        {error && <p className="text-red-500 mb-4 text-sm">{error}</p>}

        <div className="mb-4">
          <input
            type="text"
            id="username"
            value={formData.username}
            onChange={handleChange}
            className="w-full px-4 py-2 h-12 rounded-lg bg-[#D9D9D9] bg-opacity-10"
            placeholder=" Username"
            required
          />
        </div>

        <div className="mb-6">
          <input
            type="password"
            id="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-2 h-12 rounded-lg bg-[#D9D9D9] bg-opacity-10"
            placeholder="Password"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-[#F4FF21] text-black py-2 rounded"
          disabled={!token} 
        >
          Sign In
        </button>

        <button
        disabled
          type="button"
          className="w-full bg-[#D9D9D9] bg-opacity-10 text-white my-5 py-2 rounded flex items-center justify-center"
        >
          <IconButton><i className="fab fa-google text-2xl"></i></IconButton>&emsp; Sign in with Google
        </button>

        <div className="flex gap-3">
          <p>Don't have an account?</p>
          <Link to="/register" className="text-yellow-300">Register now</Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
