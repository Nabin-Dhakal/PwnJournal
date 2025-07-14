import { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import axios from '../api/axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Comment from '../components/Comment';

const Description = () => {
  const [writeup, setWriteup] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showComments, setShowComments] = useState(false);
  const Location = useLocation();
  const {id} = Location.state || {};

  useEffect(() => {
    if(!id)
      return;
    const fetchWriteup = async () => {
      try {
        const response = await axios.get(`/writeups/${id}/`, {
          withCredentials: true,
        });
        setWriteup(response.data);
      } catch (err) {
        console.error('Failed to fetch writeup:', err.response?.data || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchWriteup();
  }, [id]);

  if (loading) {
    return (
      <div className="text-white flex items-center justify-center min-h-screen">
        Loading writeup...
      </div>
    );
  }

  if (!writeup) {
    return (
      <div className="text-white flex items-center justify-center min-h-screen">
        Writeup not found.
      </div>
    );
  }

  return (
    <>
      <Navbar />

      <div className="relative min-h-screen bg-gradient-to-b from-black via-[#0B0E12] to-black text-white px-6 py-10 overflow-x-hidden">
        <h1 className="text-3xl md:text-4xl font-bold text-yellow-300 mb-6">
          {writeup.title}
        </h1>

        <div className="flex items-center gap-4 mb-6 text-sm text-gray-300">
          <div className="flex items-center gap-2">
            <i className="fas fa-user-circle text-lg"></i>
            <span>{writeup.author}</span>
          </div>

          {/* <button className="bg-gray-700 text-white px-4 py-1 rounded-full hover:bg-gray-600">
            Follow
          </button> */}

          <span className="ml-4">{new Date(writeup.post).toDateString()}</span>
        </div>

        <div className="text-gray-200 text-base space-y-4 mb-10 whitespace-pre-line">
          {writeup.contents}
        </div>

        <div className="flex items-center gap-6 text-gray-300 mb-10">
          {/* <div className="flex items-center gap-2 cursor-pointer hover:text-yellow-300">
            <i className="far fa-thumbs-up"></i>
            <span>{writeup.likes}</span>
          </div> */}
          <div
            className="flex items-center gap-2 cursor-pointer hover:text-yellow-300"
            onClick={() => setShowComments(true)}
          >
            <i className="far fa-comment"></i>
            <span>{writeup.comments_count}</span>
          </div>
        </div>

        {showComments && <Comment writeupId={id} onClose={() => setShowComments(false)} />}

        <Footer />
      </div>
    </>
  );
};

export default Description;
