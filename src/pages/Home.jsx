import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import axios from "../api/axios";

const Home = () => {
  const [recentWriteups, setRecentWriteups] = useState([]);

  useEffect(() => {
    const fetchWriteups = async () => {
      try {
        const response = await axios.get("/writeups/?limit=3",{withCredentials:true});
        setRecentWriteups(response.data.slice(0, 3)); 
      } catch (error) {
        console.error("Error fetching writeups:", error);
      }
    };

    fetchWriteups();
  }, []);

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex flex-col">
        <main className="flex-grow flex flex-col items-center justify-center text-center px-4">
          <div className="mb-16">
            <h1 className="text-3xl font-bold mb-4">Welcome to PwnJournal</h1>
            <p className="mb-6 text-2xl">
              Track and document your cybersecurity challenges and learnings.
            </p>
            <Link
              to="/writeups"
              className="inline-block bg-[#F4FF21] text-black px-6 py-2 rounded"
            >
              Get Started
            </Link>
          </div>

          <section className="w-full max-w-5xl">
            <h2 className="text-2xl font-semibold mb-4">Recent Writeups</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {recentWriteups.length > 0 ? (
                recentWriteups.map((writeup) => (
                  <div
                    key={writeup.id}
                    className="p-4 border rounded shadow text-left bg-[#D9D9D9] bg-opacity-[10%]"
                  >
                    <h3 className="font-semibold text-white text-lg mb-2">{writeup.title}</h3>
                    <p className="text-sm text-white-700">
                      {writeup.contents.length > 100
                        ? writeup.contents.slice(0, 100) + "..."
                        : writeup.contents}
                    </p>
                    <p className="text-xs text-white-500 mt-2">
                      Difficulty: {writeup.difficulty}
                    </p><Link
                      to='/description'
                      state={{ id: writeup.id }}
                      className="text-yellow-300 text-sm mt-2 inline-block"
                    >
                      Read More
                    </Link> 
                  </div>
                ))
              ) : (
                <p className="col-span-3 text-gray-500">No writeups found.</p>
              )}
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Home;
