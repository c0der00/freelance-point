import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import newRequest from "../utils/newRequest";
import { formatDistanceToNow, format } from "date-fns";

const JobDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [job, setJob] = useState(null);
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [proposalText, setProposalText] = useState("");
  const [proposedAmount, setProposedAmount] = useState("");
  const [estimatedDays, setEstimatedDays] = useState("");

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await newRequest.get(`/jobs/${id}`);
        setJob(res.data);
      } catch (err) {
        setError("Failed to fetch job details.");
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [id]);

  useEffect(() => {
    if (!job?.userId) return;

    const fetchUser = async () => {
      try {
        const res = await newRequest.get(`/users/${job.userId}`);
        setUser(res.data);
      } catch (err) {
        console.error("Failed to fetch user:", err);
      }
    };

    fetchUser();
  }, [job?.userId]);

  const handleSubmitProposal = async (e) => {
    e.preventDefault();

    if (!currentUser?.isSeller) {
      alert("Only Freelancers can send a proposal.");
      navigate("/");
      return;
    }

    if (!proposalText || !proposedAmount || !estimatedDays) {
      alert("All fields are required.");
      return;
    }

    try {
      await newRequest.post(`/bids/${id}`, {
        jobId: id,
        proposalText,
        proposedAmount,
        estimatedDays,
      });

      alert("Proposal sent successfully.");
      navigate("/my-bids");
    } catch (err) {
      alert("Failed to send proposal. Try again.");
    }
  };

  if (loading) return <div className="text-center mt-10">Loading...</div>;
  if (error) return <div className="text-center text-red-500 mt-10">{error}</div>;

  return (
    <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
      <aside className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 h-fit">
        <div className="flex flex-col items-center text-center">
          <img
            src={user.img || "/default-profile.png"}
            alt={user.username || "User"}
            className="w-20 h-20 rounded-full object-cover border border-gray-300 mb-4"
          />
          <h2 className="text-xl font-semibold text-gray-800">{user.username || "Unknown User"}</h2>
          <p className="text-gray-500 text-sm mb-4">Client</p>
        </div>
        <div className="text-sm text-gray-700 space-y-3 mt-6">
          <div>
            <span className="font-medium text-gray-800">Location:</span> {user.country || "Unknown"}
          </div>
          <div>
            <span className="font-medium text-gray-800">Member since:</span>{" "}
            {user.createdAt ? format(new Date(user.createdAt), "PPP") : "N/A"}
          </div>
          <div>
            <span className="font-medium text-gray-800">Email:</span>{" "}
            <span className="break-all">{user.email || "Not provided"}</span>
          </div>
        </div>
      </aside>

      <section className="lg:col-span-2 bg-white border border-gray-200 rounded-2xl shadow-md p-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">{job.title}</h2>
        <p className="text-gray-500 text-sm mb-4">
          Posted {formatDistanceToNow(new Date(job.createdAt))} ago
        </p>

        <p className="text-gray-600 text-base leading-relaxed mb-6">{job.description}</p>

        {console.log(job)}
        {job.requirements?.length > 0 && (
          <div className="mb-6">
            <h4 className="text-lg font-semibold text-gray-800 mb-2">Responsibilities</h4>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              {job.requirements.map((item, idx) => (
                <li key={idx} className="flex items-start space-x-2">
                  <span className="text-blue-500">•</span>
                  <p>{item}</p>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-sm text-gray-700 mb-8">
          <div>
            <p className="font-medium text-gray-800">Skills Required</p>
            <ul className="list-disc list-inside mt-1 space-y-1 text-gray-700">
              {job.skillsRequired?.map((skill, idx) => (
                <li key={idx}>{skill}</li>
              ))}
            </ul>
          </div>
          <div>
            <p className="font-medium text-gray-800">Budget</p>
            <p>${job.budget}</p>
          </div>
          <div>
            <p className="font-medium text-gray-800">Deadline</p>
            <p>{job.deadline ? format(job.deadline, "PPP") : "No Deadline"}</p>
          </div>
        </div>

        <div className="border-t pt-8">
          <h3 className="text-2xl font-semibold text-gray-900 mb-4">Submit a Proposal</h3>
          <p className="text-sm text-gray-500 mb-6">
            Only freelancers can send proposals. Make yours count.
          </p>
          <form onSubmit={handleSubmitProposal}>
            <textarea
              placeholder="Write your proposal..."
              className="w-full border border-gray-300 rounded-xl p-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
              rows={5}
              value={proposalText}
              onChange={(e) => setProposalText(e.target.value)}
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <input
                type="number"
                placeholder="Proposed Amount ($)"
                className="border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={proposedAmount}
                onChange={(e) => setProposedAmount(e.target.value)}
              />
              <input
                type="number"
                placeholder="Estimated Days"
                className="border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={estimatedDays}
                onChange={(e) => setEstimatedDays(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 transition text-white py-3 rounded-xl font-medium text-sm"
            >
              Send Proposal
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default JobDetails;
