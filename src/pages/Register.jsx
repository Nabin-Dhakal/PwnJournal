import { useState } from "react";
import { IconButton } from "@material-tailwind/react";
import { Link, useNavigate } from 'react-router-dom';
import axios from '../api/axios';
import useToken from "../hooks/useToken"


const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirm_password: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [token, tokenloading, tokenerror] = useToken();

console.log(token);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
 if (!token) {
    setError('CSRF token not ready. Please wait a moment and try again.');
    return;  
  }
    if (formData.password !== formData.confirm_password) {
      setError("Passwords do not match");
      return;
    }
    if (tokenerror) return <p>Error loading CSRF token. Please try again.</p>;
    try {
      const response = await axios.post('/register/', {
        username: formData.username,
        email: formData.email,
        password: formData.password,
        confirm_password: formData.confirm_password,
      },
       { withCredentials: true,
        headers:{
            'X-CSRFToken':token,
          }
       });

      console.log('Registration success:', response.data);
      navigate('/login'); 
    } catch (err) {
      console.error(err.response?.data || err.message);
      setError(err.response?.data?.error || 'Registration failed');
    }
  };

  return (
    <div className="min-h-screen flex m-20 justify-center">
      <form className="p-8 rounded-lg shadow-md w-full max-w-sm" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold mb-6 text-center text-[#FFFFFF]">Welcome to PwnJournal</h2>

        {error && <p className="text-red-500 mb-4 text-sm">{error}</p>}

        <div className="mb-4">
          <input
            type="text"
            id="username"
            value={formData.username}
            onChange={handleChange}
            className="w-full px-4 py-2 h-12 rounded-lg bg-[#D9D9D9] bg-opacity-10"
            placeholder="Username"
            required
          />
        </div>
        <div className="mb-4">
          <input
            type="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 h-12 rounded-lg bg-[#D9D9D9] bg-opacity-10"
            placeholder="Email"
            required
          />
        </div>
        <div className="mb-4">
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
        <div className="mb-6">
          <input
            type="password"
            id="confirm_password"
            value={formData.confirm_password}
            onChange={handleChange}
            className="w-full px-4 py-2 h-12 rounded-lg bg-[#D9D9D9] bg-opacity-10"
            placeholder="Confirm Password"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-[#F4FF21] text-black py-2 rounded"
        >
          Create Account
        </button>
        <p>Already have a account?&nbsp; <Link to="/login" className="text-yellow-300">Sign in</Link></p>

        <button
        disabled
          type="button"
          className="w-full gap-3 bg-[#D9D9D9] bg-opacity-10 text-white my-5 py-2 rounded flex items-center justify-center"
        >
          <IconButton><i className="fab fa-google text-2xl"></i></IconButton> Sign up with Google
        </button>
      </form>
    </div>
  );
};

export default Register;
