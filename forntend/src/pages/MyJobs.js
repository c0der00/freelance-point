import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import newRequest from "../utils/newRequest";

const MyJobs = () => {
  const [jobs, setJobs] = useState([]);
  const navigate = useNavigate();

  const fetchMyJobs = async () => {
    try {
      const res = await newRequest.get("/jobs/a");
      setJobs(res.data);
    } catch (error) {
      console.error("Failed to fetch jobs:", error);
      alert("Error fetching jobs.");
    }
  };

  useEffect(() => {
    fetchMyJobs();
  }, []);

  const handleDelete = async (jobId) => {
    const confirm = window.confirm("Are you sure you want to delete this job?");
    if (!confirm) return;

    try {
      await newRequest.delete(`/jobs/${jobId}`);
      alert("Job deleted successfully");
      setJobs((prev) => prev.filter((job) => job._id !== jobId));
    } catch (err) {
      console.error("Delete failed:", err);
      alert("Failed to delete job.");
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800">My Posted Jobs</h2>
        <button
          onClick={() => navigate("/add-job")}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl transition"
        >
          + Add Job
        </button>
      </div>

      {jobs.length === 0 ? (
        <div className="text-center text-gray-500 mt-16 text-lg">
          No jobs posted yet.
        </div>
      ) : (
        <div className="overflow-x-auto border border-gray-200 rounded-xl">
          <table className="min-w-full divide-y divide-gray-200 text-sm">
            <thead className="bg-gray-100 text-left text-gray-600 uppercase text-xs">
              <tr>
                <th className="px-6 py-4">Title</th>
                <th className="px-6 py-4">Description</th>
                <th className="px-6 py-4">Budget</th>
                <th className="px-6 py-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 bg-white">
              {jobs.map((job) => (
                <tr key={job._id}>
                  <td className="px-6 py-4 font-medium text-gray-800">{job.title}</td>
                  <td className="px-6 py-4 text-gray-600 max-w-xs truncate">{job.description}</td>
                  <td className="px-6 py-4 text-gray-700">${job.budget}</td>
                  <td className="px-6 py-4 text-center space-x-2">
                    <button
                      onClick={() => navigate(`/job/${job._id}/bids`)}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-xs transition"
                    >
                      View Bids
                    </button>
                    <button
                      onClick={() => handleDelete(job._id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-xs transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyJobs;
