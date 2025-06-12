import React, { useState } from "react";
import newRequest from "../utils/newRequest";
import { useNavigate } from "react-router-dom";

const BecomeDev = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleBecomeDev = async (e) => {
    e.preventDefault();

    try {
      const res = await newRequest.post("/auth/become-dev", { username, password });
      const currentUser = JSON.parse(localStorage.getItem("currentUser"));
      const updatedUser = { ...currentUser, isSeller: true };
      localStorage.setItem("currentUser", JSON.stringify(updatedUser));
      navigate("/");
    } catch (err) {
      setError(err.response?.data || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center px-4">
      <div className="max-w-2xl w-full bg-white rounded-xl shadow-md p-8">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">Become a Developer</h2>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
          <h3 className="text-xl font-semibold mb-2 text-blue-700">Why Become a Developer?</h3>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            <li>Get access to job listings tailored for your skills</li>
            <li>Send proposals to high-quality clients</li>
            <li>Build your freelance reputation and profile</li>
            <li>Earn money by delivering great work</li>
          </ul>
        </div>
        <form onSubmit={handleBecomeDev} className="space-y-5">
          <input
            type="text"
            placeholder="Username"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            className="w-full bg-gray-900 text-white py-2 rounded-md font-semibold hover:bg-gray-600 transition duration-200"
          >
            Become Developer
          </button>
        </form>
        {error && (
          <p className="text-red-500 text-center mt-4">{error}</p>
        )}
      </div>
    </div>
  );
};

export default BecomeDev;
