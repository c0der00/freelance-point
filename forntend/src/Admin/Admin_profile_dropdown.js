import React from 'react';
import { FaSignOutAlt, FaUser } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import newRequest from '../utils/newRequest';
import { useDispatch } from 'react-redux';
import { logout } from '../store/authSlice';


function Admin_profile_dropdown({ currentUser }) {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  
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
    <div className="absolute top-16 right-6 bg-white shadow-md rounded-lg p-4 w-56 z-50 border border-gray-200">
      <ul className="flex flex-col gap-3">
        <li className="text-gray-800 font-semibold text-sm">
          Welcome, <span className="font-bold">{currentUser.username}</span>
        </li>
        <li>
          <Link
            to="/admin/admin_profile"
            className="flex items-center gap-2 text-sm text-gray-700 hover:text-blue-600 transition"
          >
            <FaUser className="text-gray-500" />
            <span>Profile</span>
          </Link>
        </li>
        <li>
          <Link className="flex items-center gap-2 text-sm text-gray-700 hover:text-red-600 transition" onClick={handleLogout}>
          <FaSignOutAlt className="text-gray-500" />
          Logout
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Admin_profile_dropdown;
