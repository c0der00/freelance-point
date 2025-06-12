import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import newRequest from '../utils/newRequest';

const JobBids = () => {
  const { id } = useParams();
  const [bids, setBids] = useState([]);

  useEffect(() => {
    const fetchBids = async () => {
      const res = await newRequest.get(`/bids/${id}`);
      setBids(res.data);
    };
    fetchBids();
  }, [id]);

  const handleAcceptBid = async (bidId) => {
    await newRequest.put(`/bids/accept/${bidId}`);
    alert('Bid Accepted');
    window.location.reload();
  };

  const handleRejectBid = async (bidId) => {
    await newRequest.put(`/bids/reject/${bidId}`);
    alert('Bid Rejected');
    window.location.reload();
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Job Bids</h2>

      {bids.length === 0 ? (
        <p className="text-gray-500">No Bids Yet</p>
      ) : (
        <div className="grid gap-5">
          {bids.map((bid) => (
            <div
              key={bid._id}
              className="border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition bg-white"
            >
              <div className="mb-3">
                <p className="text-gray-700 mb-1">
                  <span className="font-semibold">Proposal:</span>
                  <div className="mt-2 p-4 border-l-4 border-gray-300 bg-gray-50 text-gray-600 rounded-md">
                    {bid.proposalText}
                  </div>
                </p>
                <p className="text-gray-700 mb-1">
                  <span className="font-semibold">Amount:</span> ${bid.proposedAmount}
                </p>
                <p className="text-gray-700 mb-1">
                  <span className="font-semibold">Estimated Days:</span> {bid.estimatedDays}
                </p>
                <p
                  className={`font-medium ${
                    bid.status === 'accepted'
                      ? 'text-green-600'
                      : bid.status === 'rejected'
                      ? 'text-red-600'
                      : 'text-yellow-600'
                  }`}
                >
                  Status: {bid.status}
                </p>
              </div>
              {bid.status === 'pending' && (
                <div className="flex gap-3 mt-4">
                  <button
                    onClick={() => handleAcceptBid(bid._id)}
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm transition"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => handleRejectBid(bid._id)}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm transition"
                  >
                    Reject
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default JobBids;
