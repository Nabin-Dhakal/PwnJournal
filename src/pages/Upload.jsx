import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import useToken from "../hooks/useToken"


const UploadForm = () => {
  const [formData, setFormData] = useState({
    Title: '',
    contents: '',
    keywords: '',
    difficulty: '',
  });

  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [token, loading, error] = useToken();


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post(
        '/writeups/',
        {
          title: formData.Title,
          contents: formData.contents,
          keywords: formData.keywords,
          difficulty: formData.difficulty
        },
        { withCredentials: true,
          headers:{
            'X-CSRFToken':token,
          }
         }
      );
      console.log('Writeup posted:', response.data);
      navigate('/writeups');
    } catch (err) {
      console.error(err.response?.data || err.message);
      setError('Failed to upload writeup');
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen text-white px-6 py-10 flex flex-col items-center">
        <h1 className="text-3xl md:text-4xl font-bold text-yellow-300 mb-10 text-center">
          Upload Your Ideas
        </h1>

        <form
          onSubmit={handleSubmit}
          className="w-full max-w-3xl flex flex-col gap-6"
        >
          {error && <p className="text-red-400">{error}</p>}

          <input
            type="text"
            name="Title"
            value={formData.Title}
            onChange={handleChange}
            placeholder="Title..."
            className="w-full px-4 py-3 bg-gray-800 text-white placeholder-gray-400 rounded-md focus:outline-none"
            required
          />

          <textarea
            name="contents"
            rows={10}
            value={formData.contents}
            onChange={handleChange}
            placeholder="Contents..."
            className="w-full px-4 py-3 bg-gray-800 text-white placeholder-gray-400 rounded-md resize-none focus:outline-none"
            required
          ></textarea>

          <input
            type="text"
            name="keywords"
            value={formData.keywords}
            onChange={handleChange}
            placeholder="Keywords (e.g., XSS, SQLi, Bug Bounty)..."
            className="w-full px-4 py-3 bg-gray-800 text-white placeholder-gray-400 rounded-md focus:outline-none"
          />

          <select
            name="difficulty"
            value={formData.difficulty}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-gray-800 text-white rounded-md focus:outline-none"
            required
          >
            <option value="" disabled>
              Select Difficulty Level
            </option>
            <option value="easy" selected>Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>

          <div className="flex justify-center">
            <label className="bg-gray-800 px-4 py-2 rounded text-sm flex items-center gap-2 cursor-pointer">
              <i className="fas fa-upload"></i> Upload file
              <input type="file" className="hidden" disabled />
            </label>
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-[#F4FF21] text-black px-6 py-2 font-semibold rounded hover:bg-yellow-300 transition"
            >
              Post
            </button>
          </div>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default UploadForm;
