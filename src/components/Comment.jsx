import { useEffect, useState } from "react";
import axios from "../api/axios";
import { useLocation } from "react-router-dom";
import useToken from "../hooks/useToken"


const Comment = ({ onClose }) => {
  const [comments, setComments] = useState([]);
  const location = useLocation();
  const { id } = location.state || {};
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    content: '',
  });
    const [token] = useToken();


  const fetchComments = async () => {
    try {
      const response = await axios.get(`/writeups/${id}/comments`, {
        withCredentials: true,
      });
      setComments(response.data);
    } catch (err) {
      console.log('Failed to fetch writeup:', err.response?.data || err.message);
    }
  };

  useEffect(() => {
    if (id) fetchComments();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.content.trim()) {
      setError('Comment cannot be empty');
      return;
    }

    try {
      await axios.post(
        `/writeups/${id}/comments`,
        { content: formData.content.trim() },
        {
          withCredentials: true,
          headers: {
            'Content-type': 'application/json',
            'X-CSRFToken':token,
          
          },
        }
      );
      setFormData({ content: '' });
      fetchComments(); 
    } catch (err) {
      console.error(err.response?.data || err.message);
      setError(err.response?.data?.error || 'Failed to comment');
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  return (
    <div className="fixed top-0 right-0 w-[22rem] md:w-[25rem] h-full bg-black text-white z-50 shadow-lg px-6 py-6 overflow-y-auto transition-transform animate-slide-in">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-yellow-400 text-2xl font-semibold">Comments</h2>
        <button onClick={onClose} className="text-yellow-400 text-xl">
          <i className="fas fa-times"></i>
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="mb-8 ">
          <div className="flex items-center gap-2 mb-2">
            <i className="fas fa-user-circle text-xl"></i>
            <span>Write a comment</span>
          </div>
          <input
            type="text"
            id="content"
            onChange={handleChange}
            value={formData.content}
            placeholder="What are your thoughts?"
            className="w-full bg-gray-800 placeholder-gray-400 px-4 py-3 rounded-md focus:outline-none"
          />
          {error && <p className="text-red-400 text-sm mt-2">{error}</p>}
          <div className="containerssa flex justify-center">
          <button
            type="submit"
            className="mt-2 w-[100px] bg-yellow-400 text-black px-4 py-2 rounded-md hover:bg-yellow-300"
          >
            Post
          </button></div>
        </div>
      </form>

      {comments.length > 0 ? (
        comments.map((comment) => (
          <div key={comment.id} className="mb-6">
            <div className="flex items-center gap-2 mb-1 text-gray-300">
              <i className="fas fa-user-circle text-lg"></i>
              <span>{comment.author}</span>
              <span className="text-sm ml-auto">{new Date(comment.posted).toDateString()}</span>
            </div>
            <p className="ml-7 mb-1">{comment.content}</p>
            <button className="text-yellow-400 text-sm ml-7 hover:underline">
              Reply
            </button>
          </div>
        ))
      ) : (
        <div className="text-gray-400">No Comments, Be the First one to comment</div>
      )}
    </div>
  );
};

export default Comment;
