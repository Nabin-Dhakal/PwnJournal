import { useEffect, useState } from "react";
import axios from "../api/axios";
import Navbar from "../components/Navbar";
import useToken from "../hooks/useToken";

const Profile = () => {
  const [FormData, setFormData] = useState({
    full_name: "",
    username: "",
    email: "",
    contact_number: "",
    password: "",
    confirm_password: "",
  });
  
  const [token, tokenloading, tokenerror] = useToken();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get("/get-user-profile/", {
          withCredentials: true,
          
        });
        const data = response.data;
        console.log(data.full_name)
        setFormData((prev) => ({
          ...prev,
          full_name: data.full_name || "",
          username: data.username || "",
          email: data.email || "",
          contact_number: data.contact || "",
        }));

        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch profile:", err.response?.data || err.message);
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/update/", FormData, {
        headers: {
          
          'X-CSRFToken':token,
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      console.log("Profile updated:", response.data);
      alert("Profile updated successfully!");
    } catch (err) {
      console.error("Update error:", err.response?.data || err.message);
      alert("Failed to update profile.");
    }
  };

  if (loading) {
    return (
      <div className="text-white flex items-center justify-center min-h-screen">
        Loading profile...
      </div>
    );
  }
  if (tokenerror) return <p>Error loading CSRF token. Please try again.</p>;

  return (
    <>
      <Navbar />
      <div className="min-h-screen text-white py-10 px-6 flex flex-col items-center">
        <div className="flex flex-col items-center mb-6">
          <div className="w-24 h-24 bg-yellow-400 rounded-full flex items-center justify-center text-black text-4xl">
            <i className="fas fa-user"></i>
          </div>
          <p className="text-sm text-gray-400 mt-4 text-center">
            File upload disabled in this version
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-6 mb-10"
        >
          <div>
            <label className="block mb-1 text-sm text-gray-300">Full name</label>
            <input
              type="text"
              name="full_name"
              value={FormData.full_name}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-gray-800 text-white rounded"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm text-gray-300">User name</label>
            <input
              type="text"
              name="username"
              value={FormData.username}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-gray-800 text-white rounded"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm text-gray-300">Email address</label>
            <input
              type="email"
              name="email"
              value={FormData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-gray-800 text-white rounded"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm text-gray-300">Contact number</label>
            <input
              type="tel"
              name="contact_number"
              value={FormData.contact_number}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-gray-800 text-white rounded"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm text-gray-300">Password</label>
            <input
              type="password"
              name="password"
              value={FormData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-gray-800 text-white rounded"
              placeholder="Leave blank to keep current password"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm text-gray-300">Confirm Password</label>
            <input
              type="password"
              name="confirm_password"
              value={FormData.confirm_password}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-gray-800 text-white rounded"
              placeholder="Repeat password"
            />
          </div>

          <div className="md:col-span-2 flex justify-center">
            <button
              type="submit"
              className="bg-[#F4FF21] text-black font-semibold px-8 py-2 rounded shadow hover:bg-yellow-300 transition"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Profile;
