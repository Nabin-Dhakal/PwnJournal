import { IconButton } from '@material-tailwind/react';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from '../api/axios';
import useToken from "../hooks/useToken"


function Navbar() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const [token] = useToken();
  
  useEffect(() => {
    axios.get('/api/user/', { withCredentials: true })
      .then(res => {
        setUser(res.data);  
      })
      .catch(err => {
        setUser(null);  
      });
  }, []);

  const handleLogout = () => {
    axios.post('/api/logout/',{}, { withCredentials: true,
      headers:{
            'X-CSRFToken':token,
          } })
      .then(() => {
        setUser(null);
        navigate('/login');
      })
      .catch(err => {
        console.error('Logout failed:', err);
      });
  };

  return (
    <div className="navbar flex justify-between items-center p-5">
      <Link to="/">
        <div className="logo text-white">
          Pwn<span>Journal</span>
        </div>
      </Link>

      <div className="menu gap-[200px] flex">
        <ol className='flex gap-6'>
          <li className='text-[#F4FF21]'>
            <Link to="/">
              <IconButton><i className='fas fa-house text-[#F4FF21]'></i></IconButton>
            </Link>
          </li>
          <li className='text-[#FFFFFF]'><Link to="/writeups">Writeups</Link></li>
          <li className='text-[#FFFFFF]'><Link to="/about">About</Link></li>
        </ol>

        <div className="acc flex items-center gap-4 pr-5">
          {user ? (
            <>
              <span className='text-white'>Hello, <Link to="/profile">{user.username}</Link></span>
              <button onClick={handleLogout} className="text-[red] underline">Logout</button>
            </>
          ) : (
            <div className='flex gap-6'>
              <span className='p-2 text-[#000000] bg-[#F4FF21] rounded-lg'>
                <Link to="/login">Login</Link>
              </span>
              <span className='p-2 text-[#000000] bg-[#F4FF21] rounded-lg'>
                <Link to="/register">Register</Link>
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
