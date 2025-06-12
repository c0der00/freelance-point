import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import newRequest from '../utils/newRequest';
import Sidebar from './Sidebar';
import Admin_header from './Admin_header';

function Job_detail() {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await newRequest.get(`/jobs/${id}`);
        console.log(res.data);
        setJob(res.data);
      } catch (err) {
        console.error('Failed to fetch job', err);
      }
    };

    fetchJob();
  }, [id]);

  if (!job) {
    return <div className="text-center mt-10 text-lg font-semibold">Loading...</div>;
  }

  return (
    <Sidebar>
      <Admin_header currentUser={currentUser} />
      <div className="p-6">
        <div className="bg-white rounded-xl shadow-md p-6 max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold mb-4">Job Detail</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-sm text-gray-600">Job ID:</label>
              <p className="text-lg font-medium">{job._id}</p>
            </div>

            <div>
              <label className="text-sm text-gray-600">User ID:</label>
              <p className="text-lg font-medium">{job.userId}</p>
            </div>

            <div className="md:col-span-2">
              <label className="text-sm text-gray-600">Title:</label>
              <p className="text-lg font-medium">{job.title}</p>
            </div>

            <div>
              <label className="text-sm text-gray-600">Budget:</label>
              <p className="text-lg font-medium">${job.budget}</p>
            </div>

            <div>
              <label className="text-sm text-gray-600">Deadline:</label>
              <p className="text-lg font-medium">{new Date(job.deadline).toLocaleDateString()}</p>
            </div>

            <div className="md:col-span-2">
              <label className="text-sm text-gray-600">Description:</label>
              <p className="text-base text-gray-800">{job.description}</p>
            </div>

            <div className="md:col-span-2">
              <label className="text-sm text-gray-600">Requirements:</label>
              <ul className="list-disc pl-5">
                {job.requirements.map((req, index) => (
                  <li key={index} className="text-base text-gray-800">{req}</li>
                ))}
              </ul>
            </div>

            <div className="md:col-span-2">
              <label className="text-sm text-gray-600">Skills Required:</label>
              <ul className="list-disc pl-5">
                {job.skillsRequired.map((skill, index) => (
                  <li key={index} className="text-base text-gray-800">{skill}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex justify-end mt-6">
            <button className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 transition">
              Back to Jobs
            </button>
          </div>
        </div>
      </div>
    </Sidebar>
  );
}

export default Job_detail;
