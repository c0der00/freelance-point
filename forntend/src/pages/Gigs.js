import React, { useEffect, useState, useRef } from "react";
import GigCard from "../components/GigCard";
import newRequest from "../utils/newRequest";
import downIcon from "../assets/down.png";

function Gigs() {
  const [gigsData, setGigsData] = useState([]);
  const [filteredGigs, setFilteredGigs] = useState([]);
  const [sort, setSort] = useState("sales");
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1); 
  const [totalPages, setTotalPages] = useState(1); 
  const [isLoading, setIsLoading] = useState(false);
  const minRef = useRef();
  const maxRef = useRef();

  useEffect(() => {
    const fetchGigs = async () => {
      try {
        setIsLoading(true);
        const response = await newRequest.get("/gigs", {
          params: {
            page: currentPage,   
            limit: 10,           
            search: searchQuery,  
            sort: sort,           
          },
        });

        setGigsData(response.data.gigs);
        setFilteredGigs(response.data.gigs);
        setTotalPages(response.data.totalPages);
      } catch (error) {
        console.error("Error fetching gigs:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchGigs();
  }, [currentPage, searchQuery, sort]);

  const applyPriceFilter = () => {
    const minPrice = minRef.current.value ? parseInt(minRef.current.value) : 0;
    const maxPrice = maxRef.current.value ? parseInt(maxRef.current.value) : Infinity;

    const filtered = gigsData.filter(
      (gig) => gig.price >= minPrice && gig.price <= maxPrice
    );
    setFilteredGigs(filtered);
  };

  const reSort = (type) => {
    setSort(type);
    setOpen(false);
  };

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
  };

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div className="flex justify-center items-start px-10 py-12 bg-gray-50 min-h-screen">
      <div className="w-full max-w-screen-xl px-6">
        <div className="mb-10">
          <h1 className="text-3xl font-semibold text-gray-800 mb-2">Developer Gigs</h1>
          <p className="text-gray-500 text-base">
            Explore the boundaries of development and technology with freelancers.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-8 bg-white p-4 rounded-lg shadow">
          <div className="flex items-center gap-3 flex-wrap">
            <span className="text-gray-600 font-medium">Budget:</span>
            <input
              ref={minRef}
              type="number"
              placeholder="Min"
              className="w-24 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
            <input
              ref={maxRef}
              type="number"
              placeholder="Max"
              className="w-24 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
            <button
              className="px-5 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-600 transition"
              onClick={applyPriceFilter}
            >
              Apply
            </button>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            <input
              type="text"
              placeholder="Search gigs..."
              className="px-4 py-2 w-64 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
              value={searchQuery}
              onChange={handleSearch}
            />
            <button className="px-5 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800 transition">
              Search
            </button>
          </div>

          <div className="relative flex items-center gap-2">
            <span className="text-gray-600 font-medium">Sort by:</span>
            <button
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-md cursor-pointer"
              onClick={() => setOpen(!open)}
            >
              {sort === "sales" ? "Best Selling" : "Newest"}
              <img src={downIcon} alt="Dropdown icon" className="w-4" />
            </button>
            {open && (
              <div className="absolute top-12 right-0 bg-white border border-gray-200 rounded-lg shadow-md z-20 w-40">
                <button
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                  onClick={() => reSort("createdAt")}
                >
                  Newest
                </button>
                <button
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                  onClick={() => reSort("sales")}
                >
                  Best Selling
                </button>
              </div>
            )}
          </div>
        </div>
        <div className=" flex justify-evenly gap-4">
          {isLoading ? (
            <div className="col-span-full text-center text-gray-400 text-lg py-20">
              Loading...
            </div>
          ) : filteredGigs.length ? (
            filteredGigs.map((gig) => <GigCard key={gig._id} item={gig} />)
          ) : (
            <div className="col-span-full text-center text-gray-400 text-lg py-20">
              No gigs found.
            </div>
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
    </div>
  );
}

export default Gigs;
