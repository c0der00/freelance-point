import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import newRequest from '../utils/newRequest';
import { Search, X } from 'lucide-react';

const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [showSearch, setShowSearch] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const iconRef = useRef(null);

  useEffect(() => {
    const fetchJobs = async () => {
      const res = await newRequest.get('/jobs', {
        params: {
          page: currentPage,
          limit: 10,
        },
      });
      setJobs(res.data.jobs);
      setFilteredJobs(res.data.jobs);
      setTotalPages(res.data.totalPages);
    };
    fetchJobs();
  }, [currentPage]);

  const handleSearch = () => {
    const lowerTerm = searchTerm.toLowerCase();
    const filtered = jobs.filter((job) =>
      job.title.toLowerCase().includes(lowerTerm) ||
      job.description.toLowerCase().includes(lowerTerm)
    );
    setFilteredJobs(filtered);
    setShowSearch(false);
  };

  const UserData = ({ job }) => {
    const [user, setUser] = useState({});

    useEffect(() => {
      const fetchUser = async () => {
        const res = await newRequest.get(`/users/${job.userId}`);
        setUser(res.data);
      };
      fetchUser();
    }, [job]);

    return (
      <div className="flex items-center gap-3 mb-4">
        <img
          src={user.img || '/img/noavatar.jpg'}
          alt={user.username}
          className="w-10 h-10 rounded-full object-cover border border-gray-300"
        />
        <h2 className="text-base font-medium text-gray-800">{user.username}</h2>
      </div>
    );
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-11 relative">
      <div className="flex justify-between items-center mb-10">
        <div>
          <h2 className="text-4xl font-bold text-gray-900">Find Your Next Job</h2>
          <p className="text-gray-500 mt-2 text-lg">
            Browse freelance opportunities that match your skills.
          </p>
          <div className="mt-3 w-20 h-1 bg-green-500 rounded-full"></div>
        </div>
        <div className="relative" ref={iconRef}>
          <button
            onClick={() => setShowSearch((prev) => !prev)}
            className="text-gray-600 hover:text-green-600 transition"
            title="Search"
          >
            {showSearch ? <X className="w-6 h-6" /> : <Search className="w-6 h-6" />}
          </button>

          {showSearch && (
            <div className="absolute right-0 mt-2 w-64 bg-white border border-gray-200 rounded-xl shadow-lg p-3 z-50">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Search jobs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <button
                  onClick={handleSearch}
                  className="text-gray-600 hover:text-green-700"
                >
                  <Search className="w-5 h-5" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredJobs.length > 0 ? (
          filteredJobs.map((job) => (
            <div
              key={job._id}
              className="border border-gray-200 rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 p-6 bg-white flex flex-col justify-between"
            >
              <div>
                <UserData job={job} />
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {job.title}
                </h3>
                <p className="text-gray-500 text-sm mb-4 line-clamp-3">
                  {job.description}
                </p>
              </div>
              <Link
                to={`/job/${job._id}`}
                className="mt-4 inline-block bg-gray-800 text-white text-center py-2 rounded-xl text-sm font-medium hover:bg-gray-600 transition"
              >
                View Details
              </Link>
            </div>
          ))
        ) : (
          <p className="text-center col-span-full text-gray-500 text-lg">
            No jobs found.
          </p>
        )}
      </div>
      <div className="flex justify-center mt-8">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage <= 1}
            className="px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-600 transition disabled:opacity-50"
          >
            Previous
          </button>
          <span className="mx-4 text-lg text-gray-600">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage >= totalPages}
            className="px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-600 transition disabled:opacity-50"
          >
            Next
          </button>
        </div>
    </div>
  );
};

export default JobList;
