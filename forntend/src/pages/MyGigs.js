import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import newRequest from "../utils/newRequest";

function MyGigs() {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const [gigs, setGigs] = useState([]);

  const userGIgs = async () => {
    const fetchGigsById = await newRequest.get(`gigs/mygigs/${currentUser._id}`);
    setGigs(fetchGigsById.data);
  };

  useEffect(() => {
    userGIgs();
  }, []);

  const handalDelete = async(id) => {
    newRequest.delete(`/gigs/delete/${id}`)
    setGigs(gigs.filter((gig) => gig._id === id))
  }

  return (
    <div className="bg-gray-50 py-8">
      <div className="max-w-screen-xl mx-auto px-4">
        <div className="mb-6 flex justify-between items-center">
          <h1 className="text-3xl font-semibold text-gray-800">
            {currentUser.isSeller ? "Gigs" : "Orders"}
          </h1>
          {currentUser.isSeller && (
            <Link to="/add">
              <button className="bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800">
                Add New Gig
              </button>
            </Link>
          )}
        </div>

        {gigs.length === 0 ? (
          <div className="">gigs empty</div>
        ):(
          <div className="overflow-x-auto">
          <table className="table-auto w-full bg-white shadow-lg rounded-lg">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-3 px-4 text-left text-gray-600">Image</th>
                <th className="py-3 px-4 text-left text-gray-600">Title</th>
                <th className="py-3 px-4 text-left text-gray-600">Price</th>
                <th className="py-3 px-4 text-left text-gray-600">Action</th>
              </tr>
            </thead>
            <tbody>
              {gigs.map((gig) => (
                <tr key={gig._id} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <img
                      className="w-12 h-12 object-cover rounded-lg"
                      src={gig.cover}
                      alt="Gig cover"
                    />
                  </td>
                  <td className="py-3 px-4 text-gray-800">{gig.shortTitle}</td>
                  <td className="py-3 px-4 text-gray-600">INR {gig.price}</td>
                  <td className="py-3 px-4">
                    <button
                      className="w-6 h-6 cursor-pointer"
                      onClick={() => handalDelete(gig._id)}
                    >delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        )}
        
      </div>
    </div>
  );
}

export default MyGigs;
