import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

const About = () => {
  return (<>
  <Navbar/>
    <div className="min-h-screen from-black via-[#0B0E12] to-black text-white px-4 py-10">
      <h1 className="text-4xl font-bold text-center mb-10">About Us</h1>

      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <div className="bg-gray-800 bg-opacity-60 p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2 text-white text-center">Who we are</h2>
          <p className="text-center text-sm text-gray-300">
            PwnJournal is a platform for cybersecurity enthusiasts to share and
            learn from CTF and bug bounty write-ups.
          </p>
        </div>

        <div className="bg-gray-800 bg-opacity-60 p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2 text-white text-center">What can you Do here</h2>
          <p className="text-center text-sm text-gray-300">
            Write Markdown notes<br />
            Track CTF Challenges<br />
            Access your notes from anywhere<br />
            and many more..
          </p>
        </div>
      </div>

      <div className="max-w-md mx-auto mb-10">
        <div className="bg-gray-800 bg-opacity-60 p-6 rounded-lg shadow text-center">
          <h2 className="text-xl font-semibold mb-2 text-white">Why PwnJournal</h2>
          <p className="text-sm text-gray-300">
            It is a platform for cybersecurity enthusiasts to share and learn from
            CTF and bug bounty write-ups. Whether you're solving challenges on
            HackTheBox or hunting bugs on HackerOne
          </p>
        </div>
      </div>

      <div className="text-center mb-10">
        <Link
          to="/Register"
          className="bg-[#F4FF21] text-black font-medium py-2 px-6 rounded shadow hover:bg-yellow-300 transition"
        >
          Join now
        </Link>
      </div>

      <Footer/>
    </div></>
  );
};

export default About;
