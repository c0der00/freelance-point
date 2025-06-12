import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import Admin_header from './Admin_header';
import { Link } from 'react-router-dom';
import newRequest from '../utils/newRequest';

function Admin_User() {
  const [user, setUser] = useState([]);
  const [data, setData] = useState([]);

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  useEffect(() => {
    const fetchAllUsers = async () => {
      const response = await newRequest.get('/admin');
      setUser(response.data);
    };
    fetchAllUsers();
  }, [data]);

  const deleteUser = async (id) => {
    try {
      await newRequest.delete(`/admin/${id}`);
      alert("User deleted");
      setData(user.filter(item => item._id !== id));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <Sidebar>
      <Admin_header currentUser={currentUser} />

      <div className="p-6 bg-gray-100 min-h-screen">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">User List</h2>
          <input
            type="text"
            placeholder="Search..."
            className="border border-gray-300 rounded-md px-4 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>

        <div className="overflow-x-auto bg-white shadow rounded-lg">
          <table className="min-w-full table-auto">
            <thead className="bg-gray-200 text-gray-700 text-sm font-semibold">
              <tr>
                <th className="px-4 py-3 text-left">User ID</th>
                <th className="px-4 py-3 text-left">Username</th>
                <th className="px-4 py-3 text-left">Email</th>
                <th className="px-4 py-3 text-left">Phone</th>
                <th className="px-4 py-3 text-center">Delete</th>
                <th className="px-4 py-3 text-center">Detail</th>
              </tr>
            </thead>
            <tbody className="text-sm text-gray-700">
              {user.map((item) => (
                <tr key={item._id} className="border-b hover:bg-gray-50 transition">
                  <td className="px-4 py-3">{item._id}</td>
                  <td className="px-4 py-3">{item.username}</td>
                  <td className="px-4 py-3">{item.email}</td>
                  <td className="px-4 py-3">{item.phone}</td>
                  <td className="px-4 py-3 text-center">
                    <button
                      onClick={() => deleteUser(item._id)}
                      className="text-red-600 hover:text-red-800 transition"
                    >
                      ❌
                    </button>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <Link to={`/admin/user_details/${item._id}`}>
                      <button className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-md">
                        👁️
                      </button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Sidebar>
  );
}

export default Admin_User;
