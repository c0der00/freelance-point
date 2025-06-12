import React, { useState } from 'react';
import { FaBars, FaTh } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';

function Sidebar({ children }) {
  const [isOpen, setIsOpen] = useState(true);
  const toggle = () => setIsOpen(!isOpen);

  const menuItem = [
    { path: '/admin', name: 'Dashboard', icon: <FaTh /> },
    { path: '/admin/admin_user', name: 'User', icon: <FaTh /> },
    { path: '/admin/admin_vendor', name: 'Gigs', icon: <FaTh /> },
    { path: '/admin/admin_job', name: 'Jobs', icon: <FaTh /> },
    { path: '/admin/admin_contact_details', name: 'Contact Details', icon: <FaTh /> },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">
      <div
        className={`bg-gray-900 text-white transition-all duration-300 ${isOpen ? 'w-64' : 'w-16'
          }`}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          {isOpen && (
            <img
              src="your-image-source-here"
              alt="Logo"
              className="h-8 w-auto"
            />
          )}
          <button
            onClick={toggle}
            className="text-xl text-white focus:outline-none ml-auto"
          >
            <FaBars />
          </button>
        </div>
        <nav className="mt-4 space-y-1">
          {menuItem.map((item, index) => (
            <NavLink
              to={item.path}
              key={index}
              className={({ isActive }) =>
                `flex items-center gap-4 px-4 py-3 text-sm font-medium rounded-md transition-colors duration-200
                ${isActive ? 'bg-gray-800 text-yellow-400' : 'text-gray-300 hover:bg-gray-800 hover:text-white'}`
              }
            >
              <div className="text-lg">{item.icon}</div>
              {isOpen && <span>{item.name}</span>}
            </NavLink>
          ))}
        </nav>
      </div>
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}

export default Sidebar;
