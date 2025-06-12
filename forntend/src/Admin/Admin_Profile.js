import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Admin_header from './Admin_header';
import newRequest from '../utils/newRequest';

function Admin_Profile() {
  const [isOpen, setIsOpen] = useState(true);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));

  const isPasswordCorrect = () => newPassword === confirmPassword;

  const updatePassword = async () => {
    if (!isPasswordCorrect()) {
      alert('Passwords do not match');
      return;
    }

    try {
      await newRequest.post(`/admin/update/${currentUser._id}`, { newPassword });
      alert('Password updated');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Sidebar>
      <Admin_header currentUser={currentUser} />
      <div className="p-6">
        <div className="bg-white shadow-md rounded-lg p-6">
          <div className="flex items-center gap-4 mb-6">
            <img
              src={currentUser.img}
              alt="profile"
              className="w-20 h-20 rounded-full object-cover"
            />
            <h2 className="text-xl font-semibold">Admin Admin</h2>
          </div>

          <div className="flex gap-4 mb-6 border-b pb-2">
            <button
              onClick={() => setIsOpen(true)}
              className={`px-4 py-2 font-medium ${isOpen ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-600'
                }`}
            >
              Personal Details
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className={`px-4 py-2 font-medium ${!isOpen ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-600'
                }`}
            >
              Change Password
            </button>
          </div>

          {isOpen ? (
            <div>
              <h3 className="text-lg font-semibold mb-4">Personal Details</h3>
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <label className="block mb-1 text-sm font-medium text-gray-700">
                    First Name
                  </label>
                  <input
                    type="text"
                    placeholder="First Name"
                    className="w-full border border-gray-300 rounded px-3 py-2"
                  />
                </div>
                <div className="flex-1">
                  <label className="block mb-1 text-sm font-medium text-gray-700">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="Email Address"
                    className="w-full border border-gray-300 rounded px-3 py-2"
                  />
                </div>
              </div>
              <div className="flex justify-end mt-4">
                <button className="bg-yellow-400 hover:bg-yellow-500 text-white font-semibold px-4 py-2 rounded">
                  Update
                </button>
              </div>
            </div>
          ) : (
            <div>
              <h3 className="text-lg font-semibold mb-4">Change Password</h3>
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <label className="block mb-1 text-sm font-medium text-gray-700">
                    Old Password
                  </label>
                  <input
                    type="password"
                    placeholder="Old Password"
                    onChange={(e) => setOldPassword(e.target.value)}
                    className="w-full border border-gray-300 rounded px-3 py-2"
                  />
                </div>
                <div className="flex-1">
                  <label className="block mb-1 text-sm font-medium text-gray-700">
                    New Password
                  </label>
                  <input
                    type="password"
                    placeholder="New Password"
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full border border-gray-300 rounded px-3 py-2"
                  />
                </div>
                <div className="flex-1">
                  <label className="block mb-1 text-sm font-medium text-gray-700">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full border border-gray-300 rounded px-3 py-2"
                  />
                </div>
              </div>
              <div className="flex justify-end mt-4">
                <button
                  onClick={updatePassword}
                  className="bg-yellow-400 hover:bg-yellow-500 text-white font-semibold px-4 py-2 rounded"
                >
                  Update
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </Sidebar>
  );
}

export default Admin_Profile;
