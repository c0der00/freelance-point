import React, { useState } from "react";
import newRequest from "../utils/newRequest";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login as authLogin } from "../store/authSlice";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await newRequest.post("/auth/login", { username, password });
      localStorage.setItem("currentUser", JSON.stringify(res.data));
      console.log(password);
      const userData = JSON.parse(localStorage.getItem("currentUser"))
      if(res.data.isAdmin){
        console.log(userData);        
        if(userData) dispatch(authLogin(userData));
        navigate("/admin");
      }else{
        if(userData) dispatch(authLogin(userData));
        navigate("/");
      }
      
    } catch (err) {
      setError(err.response.data);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <form 
        onSubmit={handleSubmit} 
        className="w-80 p-8 flex flex-col gap-5 border border-gray-300 rounded-lg shadow-lg"
      >
        <h1 className="text-gray-900 mb-5">Sign in</h1>
        <label htmlFor="username" className="text-gray-500 text-lg">Username</label>
        <input
          name="username"
          type="text"
          placeholder="johndoe"
          onChange={(e) => setUsername(e.target.value)}
          className="p-5 border border-gray-300 rounded"
        />

        <label htmlFor="password" className="text-gray-500 text-lg">Password</label>
        <input
          name="password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          className="p-5 border border-gray-300 rounded"
        />
        <p className="font-semibold py-6">Already have account? <a className="text-blue-600" href="/register">Sign in</a></p>
        <button type="submit" className="py-5 bg-black text-white font-semibold text-lg cursor-pointer rounded">
          Login
        </button>
        {error && <span className="text-red-500 text-xs">{error}</span>}
      </form>
    </div>
  );
}

export default Login;
