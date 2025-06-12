import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import newRequest from '../utils/newRequest';
import Sidebar from './Sidebar';
import Admin_header from './Admin_header';

function Gigs_detail() {
  const { id } = useParams();
  const [gig, setGig] = useState(null);
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));

  useEffect(() => {
    const fetchGig = async () => {
      try {
        const res = await newRequest.get(`/gigs/single/${id}`);
        console.log(res.data);
        
        setGig(res.data);
      } catch (err) {
        console.error('Failed to fetch gig', err);
      }
    };

    fetchGig();
  }, [id]);

  if (!gig) {
    return <div className="text-center mt-10 text-lg font-semibold">Loading...</div>;
  }

  return (
    <Sidebar>
      <Admin_header currentUser={currentUser} />
      <div className="p-6">
        <div className="bg-white rounded-xl shadow-md p-6 max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold mb-4">Gig Detail</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-sm text-gray-600">Gig ID:</label>
              <p className="text-lg font-medium">{gig._id}</p>
            </div>

            <div>
              <label className="text-sm text-gray-600">User ID:</label>
              <p className="text-lg font-medium">{gig.userId}</p>
            </div>

            <div className="md:col-span-2">
              <label className="text-sm text-gray-600">Title:</label>
              <p className="text-lg font-medium">{gig.title}</p>
            </div>

            <div>
              <label className="text-sm text-gray-600">Price:</label>
              <p className="text-lg font-medium">${gig.price}</p>
            </div>

            <div>
              <label className="text-sm text-gray-600">Category:</label>
              <p className="text-lg font-medium capitalize">{gig.category}</p>
            </div>

            <div className="md:col-span-2">
              <label className="text-sm text-gray-600">Description:</label>
              <p className="text-base text-gray-800">{gig.desc}</p>
            </div>

            {gig.cover && (
              <div className="md:col-span-2">
                <label className="text-sm text-gray-600">Cover Image:</label>
                <img
                  src={gig.cover}
                  alt="Gig Cover"
                  className="w-full max-h-96 object-cover rounded-md shadow"
                />
              </div>
            )}
          </div>

          <div className="flex justify-end mt-6">
            <button className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 transition">
              Back to Gigs
            </button>
          </div>
        </div>
      </div>
    </Sidebar>
  );
}

export default Gigs_detail;
