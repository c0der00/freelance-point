import { useEffect, useState } from "react";
import newRequest from "../utils/newRequest";

const JobTitle = ({ bid }) => {
  const [job, setJob] = useState({});

  useEffect(() => {
    const fetchJobTitle = async () => {
      const res = await newRequest.get(`/jobs/${bid.jobId}`);
      setJob(res.data);
    };
    fetchJobTitle();
  }, [bid.jobId]);

  return <span className="font-semibold text-gray-800">{job.title || "Loading..."}</span>;
};

const MyBids = () => {
  const [bids, setBids] = useState([]);
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  useEffect(() => {
    const fetchMyBids = async () => {
      const res = await newRequest.get(`/bids/user/${currentUser._id}`);
      setBids(res.data);
    };
    fetchMyBids();
  }, []);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
        My Proposals
      </h2>

      {bids.length === 0 ? (
        <p className="text-center text-gray-500">No Proposals Submitted Yet.</p>
      ) : (
        <div className="space-y-4">
          {bids.map((bid) => (
            <div
              key={bid._id}
              className="border rounded-lg shadow-md p-5 hover:shadow-lg transition duration-200 bg-white"
            >
              <p className="mb-2 text-lg">
                <span className="font-medium text-gray-600">Job: </span>
                <JobTitle bid={bid} />
              </p>

              <p className="mb-1 text-gray-700">
                <span className="font-medium">Proposal:</span> {bid.proposalText}
              </p>

              <p className="mb-1 text-gray-700">
                <span className="font-medium">Amount:</span> ${bid.proposedAmount}
              </p>

              <p className="mb-1 text-gray-700">
                <span className="font-medium">Estimated Days:</span> {bid.estimatedDays}
              </p>

              <p className="mt-2">
                <span className="font-medium">Status: </span>
                <span
                  className={
                    bid.status === "accepted"
                      ? "text-green-600 font-semibold"
                      : bid.status === "rejected"
                      ? "text-red-600 font-semibold"
                      : "text-yellow-600 font-semibold"
                  }
                >
                  {bid.status}
                </span>
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBids;
