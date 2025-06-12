import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import profilePic from "../assets/undraw_Male_avatar.png";
import logo from "../assets/logo.png";
import newRequest from "../utils/newRequest";
import { logout } from "../store/authSlice";
import { useDispatch } from "react-redux";

function Navbar() {
  const [open, setOpen] = useState(false);
  const [url, setUrl] = useState(null);
  const dispatch = useDispatch()

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const navigate = useNavigate();

  const fachUser = async () => {
    if(currentUser){
    const user = await newRequest.get(`/users/${currentUser._id}`);
    setUrl(user.data.img);
    }
  };

  useEffect(() => {
    fachUser();
  }, []);

  const handleLogout = async () => {
    try {
      await newRequest.post("/auth/logout");
      localStorage.setItem("currentUser", null);
      dispatch(logout())
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="navbar flex flex-col items-center text-black sticky top-0 z-50 text-decoration-none">
      <div className="navContainer w-full flex items-center justify-between py-2 px-4 border border-gray-200 shadow-md rounded-2xl bg-white/60 backdrop-blur-md">
        <div className="logo">
          <Link className="link text-decoration-none text-black" to="/">
            <img className="logoImg h-[45px]" src={logo} alt="" />
          </Link>
        </div>
        <div className="links flex items-center gap-8 font-montserrat">
          <Link className="nav_links hover:text-gray-500 text-xl" to="/">
            Developers
          </Link>
          <Link className="nav_links hover:text-gray-500 text-xl" to="/gigs">
            Gigs
          </Link>
          <div className="nav_links text-xl">
          <Link className="options_link p-2 hover:text-gray-500" to="/joblist">
           job
          </Link>
          </div>
          <div className="nav_links text-xl">
          <Link className="options_link p-2 hover:text-gray-500" to="/about">
          About
          </Link>
          </div>
          <div className="nav_links text-xl">
          <Link className="options_link p-2 hover:text-gray-500" to="/contact">
          ContactUs
          </Link>
          </div>
          { currentUser && !currentUser.isSeller && (
            <button 
            className="devButton bg-gray-900 text-white py-2 px-6 rounded-md hover:bg-gray-300"
            onClick={() => navigate("/become-dev")}
            >
              Become Developer
            </button>
          )}
          {currentUser ? (
            <div className="navUser flex items-center gap-2 cursor-pointer relative" onClick={() => setOpen(!open)}>
              <img className="w-[37px] h-[37px] rounded-full object-cover" src={url || profilePic} alt="" />
              <span className="nav_links text-black font-semibold">{currentUser?.username}</span>
              {open && (
                <div className="options absolute top-[50px] right-0 p-4 bg-white border border-black rounded-md flex flex-col gap-2 w-[150px] z-10">
                  { currentUser.isSeller &&(
                  <div className="flex flex-col">
                  <Link className="options_link p-2 hover:bg-black hover:text-white" to="/myGigs">
                    My Gigs
                  </Link>
                  <Link className="options_link p-2 hover:bg-black hover:text-white" to="/add">
                    Add Gigs
                  </Link>
                  <Link className="options_link p-2 hover:bg-black hover:text-white" to="/orders/:id/:isSeller">
                    Orders
                  </Link>
                  <Link className="options_link p-2 hover:bg-black hover:text-white" to="/my-bids">
                    My Proposal
                  </Link>
                  </div>
                  )}
                  <Link className="options_link p-2 hover:bg-black hover:text-white" to="/messages">
                    Messages
                  </Link>
                  {!currentUser.isSeller && (
                    <Link className="options_link p-2 hover:bg-black hover:text-white" to="/myjobs">
                    My Job
                  </Link>
                  )}
                  <Link className="options_link p-2 hover:bg-black hover:text-white" onClick={handleLogout}>
                    Logout
                  </Link>
                </div>
              )}
            </div>
          ) : (
            <Link className="link text-decoration-none" to="/register">
              <button className="Buttons bg-gray-900 text-white py-2 px-6 rounded-md hover:bg-blue-600">
                Sign Up
              </button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
