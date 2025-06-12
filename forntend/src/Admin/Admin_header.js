import React, { useState } from 'react';
import Admin_profile_dropdown from './Admin_profile_dropdown';

function Admin_header({ currentUser }) {
  const [openProfile, setOpenProfile] = useState(false);

  return (
    <>
      <div className="w-full border-b border-gray-200 bg-white px-6 py-4 flex justify-end shadow-sm">
        <div
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => setOpenProfile((prev) => !prev)}
        >
          <div className="w-10 h-10 rounded-full overflow-hidden border border-gray-300 shadow-sm">
            <img
              src={currentUser.img}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="text-sm text-gray-700 leading-tight">
            <p className="font-medium">{currentUser.username}</p>
            <span className="text-xs text-gray-500">Admin</span>
          </div>
        </div>
      </div>

      {openProfile && <Admin_profile_dropdown currentUser={currentUser} />}
    </>
  );
}

export default Admin_header;
