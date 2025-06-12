import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import Admin_header from './Admin_header';
import { FaUser } from 'react-icons/fa';
import newRequest from '../utils/newRequest';
import { LineChart } from '@mui/x-charts/LineChart';

function Admin_dashboard() {
  const [userCount, setUserCount] = useState(null);
  const [gigsCount, setGig] = useState(null);
  const [jobsCount, setJobCount] = useState(null);
  const [activityData, setActivityData] = useState([]);
  const [freelancerData, setFreelancerData] = useState([]);

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  useEffect(() => {
    const fetchData = async () => {
      try {
        const users = await newRequest.get('/admin/usercount');
        setUserCount(users.data);

        const gigs = await newRequest.get('/admin/gigscount');
        setGig(gigs.data);

        const jobs = await newRequest.get('/admin/jodscount');
        setJobCount(jobs.data);

        const activityRes = await newRequest.get('/admin/activity');
        setActivityData(activityRes.data);

        const freelancerRes = await newRequest.get('/admin/freelancer-activity');
        setFreelancerData(freelancerRes.data);
      } catch (err) {
        console.error("Failed to fetch admin data", err);
      }
    };

    fetchData();
  }, []);

  return (
    <Sidebar>
      <Admin_header currentUser={currentUser} />
      <div className="p-6 bg-gray-100 min-h-screen">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Admin Dashboard</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          <StatCard title="Total Users" value={userCount} icon={<FaUser />} color="text-teal-600" />
          <StatCard title="Total Gigs" value={gigsCount} icon={<FaUser />} color="text-teal-600" />
          <StatCard title="Total Jobs" value={jobsCount} icon={<FaUser />} color="text-yellow-500" />
        </div> 
        <ChartBlock
          title="User & Job Activity"
          data={activityData}
          series={[
            { dataKey: 'users', label: 'Users', color: '#3b82f6' },
            { dataKey: 'jobs', label: 'Jobs', color: '#f59e0b' },
          ]}
        />
        <ChartBlock
          title="Freelancer & Gig Activity"
          data={freelancerData}
          series={[
            { dataKey: 'freelancers', label: 'Freelancers', color: '#10b981' },
            { dataKey: 'gigs', label: 'Gigs', color: '#6366f1' },
          ]}
        />
      </div>
    </Sidebar>
  );
}

const StatCard = ({ title, value, icon, color }) => (
  <div className="flex items-center justify-between p-6 bg-white rounded-xl shadow hover:shadow-md transition">
    <div>
      <p className="text-sm text-gray-500 mb-1">{title}</p>
      <h4 className="text-2xl font-semibold text-gray-800">{value ?? '—'}</h4>
    </div>
    <div className={`text-3xl ${color}`}>
      {icon}
    </div>
  </div>
);

const ChartBlock = ({ title, data, series }) => (
  <div className="bg-white p-6 mt-8 rounded-xl shadow">
    <h3 className="text-lg font-bold mb-4 text-gray-800">{title}</h3>
    <LineChart
      height={300}
      xAxis={[{ scaleType: 'band', data: data.map(item => item.date) }]}
      series={series.map(s => ({
        data: data.map(item => item[s.dataKey]),
        label: s.label,
        color: s.color,
      }))}
      margin={{ top: 20, right: 30, bottom: 50, left: 60 }}
    />
  </div>
);

export default Admin_dashboard;
