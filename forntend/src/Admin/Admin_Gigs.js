import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import Admin_header from './Admin_header';
import { Link } from 'react-router-dom';
import newRequest from '../utils/newRequest';

function Admin_Gigs() {
  const [gigs, setGig] = useState([]);
  const [data, setData] = useState([]);

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  useEffect(() => {
    const fetchAllGigs = async () => {
      const response = await newRequest.get('/admin/fatchgigs');
      setGig(response.data);
    };
    fetchAllGigs();
  }, [data]);

  const deleteGig = async (id) => {
    try {
      await newRequest.delete(`/admin/gig/${id}`);
      alert("Gig deleted");
      setData(gigs.filter(item => item._id !== id));
    } catch (error) {
      console.error("Error deleting gig:", error);
    }
  };

  return (
    <Sidebar>
      <Admin_header currentUser={currentUser} />

      <div className="p-6 bg-gray-100 min-h-screen">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">Gigs</h2>
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
                <th className="px-4 py-3 text-left">Gig ID</th>
                <th className="px-4 py-3 text-left">User ID</th>
                <th className="px-4 py-3 text-left">Title</th>
                <th className="px-4 py-3 text-left">Price</th>
                <th className="px-4 py-3 text-center">Delete</th>
                <th className="px-4 py-3 text-center">Details</th>
              </tr>
            </thead>
            <tbody className="text-sm text-gray-600">
              {gigs.map((gig) => (
                <tr key={gig._id} className="border-b hover:bg-gray-50 transition">
                  <td className="px-4 py-3">{gig._id}</td>
                  <td className="px-4 py-3">{gig.userId}</td>
                  <td className="px-4 py-3">{gig.title}</td>
                  <td className="px-4 py-3">${gig.price}</td>
                  <td className="px-4 py-3 text-center">
                    <button
                      onClick={() => deleteGig(gig._id)}
                      className="text-red-600 hover:text-red-800 transition"
                      title="Delete"
                    >
                      ❌
                    </button>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <Link to={`/admin/vendor_details/${gig._id}`}>
                      <button className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-md">
                        👁️
                      </button>
                    </Link>
                  </td>
                </tr>
              ))}z
            </tbody>
          </table>
        </div>
      </div>
    </Sidebar>
  );
}

export default Admin_Gigs;
