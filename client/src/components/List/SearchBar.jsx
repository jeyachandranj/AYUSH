import React, { useState, useEffect } from 'react';
import axiosHeader from '../../axiosHeader';
import { useNavigate } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import Header from '../Landing/Header';
// Components for each tab's content (Startups, Investors, Mentors)
const StartupCard = ({ startup }) => {
  const navigate = useNavigate();
  const handleStartupClick = (id) => {
    navigate('/startup/'+id);
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col md:flex-row items-start space-y-4 md:space-y-0 md:space-x-6 hover:shadow-xl transition-shadow duration-300 cursor-pointer"
      onClick={() => handleStartupClick(startup._id)}
    >
      <img
        src={startup.logo[0]} // Updated to handle array of logos
        alt={startup.name}
        className="w-24 h-24 rounded-full object-cover border-2 border-blue-500"
      />
      <div className="flex-1">
        <h3 className="text-2xl font-bold text-blue-600">{startup.name}</h3>
        <p className="text-lg text-gray-700">{startup.sector}</p>
        <div className="mt-4 flex items-center space-x-4">
          <span className="text-sm font-medium text-green-500">Stage: {startup.Stage}</span>
        </div>
      </div>
    </div>
  );
};

const InvestorCard = ({ investor }) => {
  const navigate = useNavigate();
  const handleInvestorClick = (id) => {
    navigate('/investor/'+id);
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col md:flex-row items-start space-y-4 md:space-y-0 md:space-x-6 hover:shadow-xl transition-shadow duration-300 cursor-pointer"
      onClick={() => handleInvestorClick(investor._id)}
    >
      <img
        src={investor.logo}
        alt={investor.name}
        className="w-24 h-24 rounded-full object-cover border-2 border-blue-500"
      />
      <div className="flex-1">
        <h3 className="text-2xl font-bold text-blue-600">{investor.name}</h3>
        <p className="text-lg text-gray-700">{investor.location}</p>
        <p className="text-sm text-gray-600 mt-2">Focus: {investor.focus}</p>
      </div>
    </div>
  );
};

const MentorCard = ({ mentor }) => {
  const navigate = useNavigate();
  const handleMentorClick = (id) => {
    navigate('/mentor/'+id);
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col md:flex-row items-start space-y-4 md:space-y-0 md:space-x-6 hover:shadow-xl transition-shadow duration-300 cursor-pointer"
      onClick={() => handleMentorClick(mentor._id)}
    >
      <img
        src={mentor.logo}
        alt={mentor.name}
        className="w-24 h-24 rounded-full object-cover border-2 border-blue-500"
      />
      <div className="flex-1">
        <h3 className="text-2xl font-bold text-blue-600">{mentor.name}</h3>
        <p className="text-lg text-gray-700">{mentor.expertise}</p>
        <p className="text-sm text-gray-600 mt-2">Experience: {mentor.experience}</p>
      </div>
    </div>
  );
};

// Utility function to paginate data
const paginateData = (data, page, limit) => {
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  return data.slice(startIndex, endIndex);
};

// Main component
const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTab, setSelectedTab] = useState('Startups');
  const [selectedFilters, setSelectedFilters] = useState([]); // Array to store selected filters
  
  // Pagination states for each tab
  const [startupPage, setStartupPage] = useState(1);
  const [startupTotalPages, setStartupTotalPages] = useState(1);
  const [investorPage, setInvestorPage] = useState(1);
  const [investorTotalPages, setInvestorTotalPages] = useState(1);
  const [mentorPage, setMentorPage] = useState(1);
  const [mentorTotalPages, setMentorTotalPages] = useState(1);

  // Data states for each tab
  const [startups, setStartups] = useState([]);
  const [investors, setInvestors] = useState([]);
  const [mentors, setMentors] = useState([]);

  const LIMIT = 10; // Items per page

  // Function to handle search input
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Function to handle tab selection
  const handleTabChange = (tab) => {
    setSelectedTab(tab);
  };

  // Function to handle filter selection
  const handleFilterChange = (filter) => {
    setSelectedFilters((prevFilters) =>
      prevFilters.includes(filter)
        ? prevFilters.filter((item) => item !== filter)
        : [...prevFilters, filter]
    );
  };

  // Fetch data with pagination
  const fetchMentors = async (page = 1) => {
    try {
      const response = await axiosHeader.get(`/mentor/getAllMentorData?page=${page}&limit=${LIMIT}`);
      setMentors(response.data.data);
      setMentorPage(response.data.currentPage);
      setMentorTotalPages(response.data.totalPages);
    } catch (error) {
      console.error('Error fetching mentor data', error);
    }
  };

  const fetchStartups = async (page = 1) => {
    try {
      const response = await axiosHeader.get(`/startups/getAllStartupsData?page=${page}&limit=${LIMIT}`);
      setStartups(response.data.startups);
      setStartupPage(response.data.currentPage);
      setStartupTotalPages(response.data.totalPages);
    } catch (error) {
      console.error('Error fetching startups data', error);
    }
  };

  const fetchInvestor = async (page = 1) => {
    try {
      const response = await axiosHeader.get(`/investor/getAllInvestorData?page=${page}&limit=${LIMIT}`);
      setInvestors(response.data.investors);
      setInvestorPage(response.data.currentPage);
      setInvestorTotalPages(response.data.totalPages);
    } catch (error) {
      console.error('Error fetching investor data', error);
    }
  };

  // Initialize data on component mount and when pages change
  useEffect(() => {
    fetchStartups(startupPage);
    fetchInvestor(investorPage);
    fetchMentors(mentorPage);
  }, [startupPage, investorPage, mentorPage]);

  // Handle page changes based on selected tab
  const handleNextPage = () => {
    switch (selectedTab) {
      case 'Startups':
        if (startupPage < startupTotalPages) setStartupPage(startupPage + 1);
        break;
      case 'Investors':
        if (investorPage < investorTotalPages) setInvestorPage(investorPage + 1);
        break;
      case 'Mentors':
        if (mentorPage < mentorTotalPages) setMentorPage(mentorPage + 1);
        break;
      default:
        break;
    }
  };

  const handlePreviousPage = () => {
    switch (selectedTab) {
      case 'Startups':
        if (startupPage > 1) setStartupPage(startupPage - 1);
        break;
      case 'Investors':
        if (investorPage > 1) setInvestorPage(investorPage - 1);
        break;
      case 'Mentors':
        if (mentorPage > 1) setMentorPage(mentorPage - 1);
        break;
      default:
        break;
    }
  };

  // Filtered content based on the selected tab and search term
  let content;
  switch (selectedTab) {
    case 'Startups':
      content = Array.isArray(startups)
        ? startups
            .filter(
              (startup) =>
                startup.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                startup.sector.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map((startup) => <StartupCard key={startup._id} startup={startup} />)
        : null;
      break;
    case 'Investors':
      content = Array.isArray(investors)
        ? investors
            .filter((investor) =>
              investor.name.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map((investor) => <InvestorCard key={investor._id} investor={investor} />)
        : null;
      break;
    case 'Mentors':
      content = Array.isArray(mentors)
        ? mentors
            .filter((mentor) =>
              mentor.name.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map((mentor) => <MentorCard key={mentor._id} mentor={mentor} />)
        : null;
      break;
    default:
      content = null;
  }

  return (
    <>
    <Header />
    <div className="w-full p-6 min-h-screen">
      {/* Search bar */}
      <div className="relative w-full md:w-1/2">
  <div className="flex items-center border rounded-lg shadow-sm">
    <FaSearch className="text-gray-500 m-2 w-5" />
    <input
      type="text"
      value={searchTerm}
      onChange={handleSearchChange}
      placeholder="Search..."
      className="w-full p-3 pl-10 border-none rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 transition duration-300"
    />
  </div>
</div>
      {/* Tabs */}
      <div className="flex mb-6 border-b border-gray-300">
  <button
    onClick={() => handleTabChange('Startups')}
    className={`py-2 px-6 text-lg font-semibold rounded-t-lg m-2 border-2 ${
      selectedTab === 'Startups'
        ? 'bg-green-500 text-white border-green-500'
        : 'bg-gray-200 text-green-500 border-gray-300'
    } hover:border-green-600 hover:bg-green-400 transition-colors duration-300`}
  >
    Startups
  </button>
  <button
    onClick={() => handleTabChange('Investors')}
    className={`py-2 px-6 text-lg font-semibold rounded-t-lg m-2 border-2 ${
      selectedTab === 'Investors'
        ? 'bg-green-500 text-white border-green-500'
        : 'bg-gray-200 text-green-500 border-gray-300'
    } hover:border-green-600 hover:bg-green-400 transition-colors duration-300`}
  >
    Investors
  </button>
  <button
    onClick={() => handleTabChange('Mentors')}
    className={`py-2 px-6 text-lg font-semibold rounded-t-lg m-2 border-2 ${
      selectedTab === 'Mentors'
        ? 'bg-green-500 text-white border-green-500'
        : 'bg-gray-200 text-green-500 border-gray-300'
    } hover:border-green-600 hover:bg-green-400 transition-colors duration-300`}
  >
    Mentors
  </button>
</div>

      {/* Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {content}
      </div>
      {/* Pagination */}
      <div className="flex justify-between items-center mt-6">
        <button
          onClick={handlePreviousPage}
          disabled={
            (selectedTab === 'Startups' && startupPage <= 1) ||
            (selectedTab === 'Investors' && investorPage <= 1) ||
            (selectedTab === 'Mentors' && mentorPage <= 1)
          }
          className="py-2 px-4 bg-green-500 text-white rounded-lg shadow-md disabled:bg-gray-400 transition duration-300"
        >
          Previous
        </button>
        <span className="text-lg font-semibold">
          Page {selectedTab === 'Startups' ? startupPage : selectedTab === 'Investors' ? investorPage : mentorPage} of {selectedTab === 'Startups' ? startupTotalPages : selectedTab === 'Investors' ? investorTotalPages : mentorTotalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={
            (selectedTab === 'Startups' && startupPage >= startupTotalPages) ||
            (selectedTab === 'Investors' && investorPage >= investorTotalPages) ||
            (selectedTab === 'Mentors' && mentorPage >= mentorTotalPages)
          }
          className="py-2 px-4 bg-green-500 text-white rounded-lg shadow-md disabled:bg-gray-400 transition duration-300"
        >
          Next
        </button>
      </div>
    </div>
    </>
  );
};

export default SearchBar;
