import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import axios from "../api/axios";

const WriteUps = () => {
  const [writeups, setWriteups] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterwriteup, setFilterwriteup] = useState([]);

  useEffect(() => {
    axios
      .get("writeups/", { withCredentials: true })
      .then((res) => {setWriteups(res.data); setFilterwriteup(res.data)})
      .catch((err) => console.error(err));
  }, []);

  

 useEffect(()=>{
   function filteredWriteupsbytitle ( )  {
    const filtered = filterwriteup.filter((writeup) =>
    writeup.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  setFilterwriteup(filtered)}

  filteredWriteupsbytitle();

 },[searchTerm])

  const filterKeywords = (word) => {
    
    
    const filterWriteups = writeups.filter((writeup) => {
     return writeup.keywords.split(',').map((keyword)=>keyword.trim().toLowerCase()).includes(word.toLowerCase());
    })

    setFilterwriteup(filterWriteups);

  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-b from-black via-[#0B0E12] to-black text-white px-6 py-10">
        <div className="grid md:grid-cols-4 gap-8 max-w-7xl mx-auto">
          <aside className="col-span-1">
            <h2 className="text-xl font-bold mb-4">Filters</h2>
            <ul className="space-y-2 text-yellow-300 italic ">
              <li className="cursor-pointer" onClick={()=>filterKeywords("bug bounty")}>Bug Bounty</li>
              <li className="cursor-pointer" onClick={()=>filterKeywords("ctf")}>CTF</li>
              <li className="cursor-pointer" onClick={()=>filterKeywords("xss")}>XSS</li>
              <li className="cursor-pointer" onClick={()=>filterKeywords("SQLi")}>SQLi</li>
              <li className="cursor-pointer" onClick={()=>filterKeywords("Web")}>Web</li>
              <li className="cursor-pointer" onClick={ () => {setFilterwriteup(writeups)}}>All Write ups</li>

            </ul>

            <div className="mt-6">
              <input
                type="text"
                placeholder="Search Write-Ups..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 bg-gray-800 text-white placeholder-gray-400 rounded focus:outline-none"
              />
            </div>
          </aside>

          <main className="col-span-3">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-3xl font-bold text-yellow-300">Write-Ups</h1>
              <Link
                to="/upload"
                className="bg-[#F4FF21] text-black font-medium px-4 py-2 rounded hover:bg-yellow-300 transition"
              >
                Post Write-Ups
              </Link>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {filterwriteup.length > 0 ? (
                filterwriteup.map((writeup) => (
                  <div
                    key={writeup.id}
                    className="bg-gray-800 bg-opacity-60 p-4 rounded-lg shadow"
                  >
                    <h2 className="text-lg font-bold text-white">
                      {writeup.title}
                    </h2>
                    <p className="text-sm text-gray-300 truncate">
                      {writeup.contents.slice(0, 100)}...
                    </p>
                    <p className="text-sm text-gray-400 mt-1">
                      By {writeup.author || "Anonymous"}
                    </p>
                    <Link
                      to="/description"
                      state={{ id: writeup.id }}
                      className="text-yellow-300 text-sm mt-2 inline-block"
                    >
                      Read More
                    </Link>
                  </div>
                ))
              ) : (
                <p className="text-gray-400 text-sm col-span-2">
                  No writeups found.
                </p>
              )}
            </div>

            {/* <div className="flex justify-center space-x-8 mt-10 text-yellow-300 text-sm">
              <button className="hover:underline">Previous</button>
              <button className="hover:underline">Next</button>
            </div> */}
          </main>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default WriteUps;
