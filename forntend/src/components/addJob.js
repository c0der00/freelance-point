import { useState } from "react";
import { useNavigate } from "react-router-dom";
import newRequest from "../utils/newRequest";

const AddJob = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [budget, setBudget] = useState(0);
  const [deadline, setDeadline] = useState("");
  const [skillsRequired, setSkillsRequired] = useState("");
  const [responsibility, setResponsibility] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !description || !budget || !deadline || !skillsRequired || !responsibility) {
      alert("All fields are required");
      return;
    }

    const skillsArray = skillsRequired.split(",").map((s) => s.trim()).filter(Boolean);
    const responsibilityArray = responsibility.split(",").map((r) => r.trim()).filter(Boolean);

    console.log(responsibility);
    

    try {
      await newRequest.post("/jobs", {
        title,
        description,
        budget,
        deadline,
        skillsRequired: skillsArray,
        requirements: responsibilityArray,
      });

      navigate("/myjobs");
    } catch (error) {
      console.error("Failed to create job:", error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-2xl p-8 mt-10">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Post a New Job</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-gray-700 font-semibold mb-2">Job Title</label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter job title"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-2">Description</label>
          <textarea
            className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="5"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe the job in detail"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Budget ($)</label>
            <input
              type="number"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              placeholder="Enter budget"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">Deadline</label>
            <input
              type="date"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
            />
          </div>
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-2">Skills Required</label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g. React, Node.js, MongoDB"
            value={skillsRequired}
            onChange={(e) => setSkillsRequired(e.target.value)}
          />
          <p className="text-xs text-gray-500 mt-1">Separate skills with commas</p>
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-2">Responsibilities</label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g. Design UI, Write APIs, Testing"
            value={responsibility}
            onChange={(e) => setResponsibility(e.target.value)}
          />
          <p className="text-xs text-gray-500 mt-1">Separate responsibilities with commas</p>
        </div>
        <div className="text-center pt-4">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 transition text-white px-6 py-3 rounded-xl font-medium text-sm shadow-md"
          >
            Submit Job
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddJob;
