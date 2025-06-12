import React, { useState } from "react";
import logo from "../assets/logo.png";
import newRequest from "../utils/newRequest";
import { useNavigate } from "react-router-dom";

function Register() {
  const [img, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    country: "",
    isSeller: false,
    desc: "",
    phone: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSeller = (e) => {
    setUser((prev) => ({ ...prev, isSeller: e.target.checked }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    Object.entries(user).forEach(([key, value]) =>
      formData.append(key, value)
    );
    if (img) formData.append("img", img);

    try {
      await newRequest.post("/auth/register", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      navigate("/login");
    } catch (err) {
      console.error("Error registering:", err.response?.data || err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white w-full max-w-4xl p-8 rounded-2xl shadow-lg grid md:grid-cols-2 gap-10"
      >
        <div className="absolute top-6 left-6">
          <img src={logo} alt="Logo" className="w-14" />
        </div>
        <div className="flex flex-col gap-4">
          <h1 className="text-2xl font-bold text-gray-800">Create an account</h1>

          <div>
            <label className="text-gray-600">Username</label>
            <input
              name="username"
              type="text"
              required
              placeholder="JohnDoe"
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg"
            />
          </div>

          <div>
            <label className="text-gray-600">Email</label>
            <input
              name="email"
              type="email"
              required
              placeholder="example@email.com"
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg"
            />
          </div>

          <div>
            <label className="text-gray-600">Password</label>
            <input
              name="password"
              type="password"
              required
              placeholder="••••••••"
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg"
            />
          </div>

          <div>
            <label className="text-gray-600">Profile Picture</label>
            <input
              type="file"
              required
              onChange={(e) => setFile(e.target.files[0])}
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <label className="text-gray-600">Activate Developer Account</label>
            <label className="relative inline-block w-12 h-6">
              <input
                type="checkbox"
                onChange={handleSeller}
                checked={user.isSeller}
                className="sr-only peer"
              />
              <div className="w-full h-full bg-gray-300 rounded-full peer-checked:bg-black transition-all"></div>
              <div
                className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                  user.isSeller ? "translate-x-6" : ""
                }`}
              ></div>
            </label>
          </div>

          <div>
            <label className="text-gray-600">Phone Number</label>
            <input
              name="phone"
              type="text"
              placeholder="+91 9876543210"
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg"
            />
          </div>

          <div>
            <label className="text-gray-600">Description</label>
            <textarea
              name="desc"
              rows="4"
              placeholder="A short description of yourself"
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg"
            ></textarea>
          </div>

          <div>
            <label className="text-gray-600">Country</label>
            <input
              name="country"
              type="text"
              placeholder="India"
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg"
            />
          </div>
        </div>
        <div className="md:col-span-2">
          <button
            type="submit"
            className="w-full bg-black text-white py-3 rounded-xl font-semibold hover:bg-gray-800 transition"
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default Register;
