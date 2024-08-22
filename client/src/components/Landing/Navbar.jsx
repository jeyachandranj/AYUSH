import React, { useState, useEffect } from 'react';
import LOGO from '../../assets/LOGO.jpeg';
import { useLocation, Link } from 'react-router-dom';

const Navbar = () => {
  const [isStartupDropdownOpen, setIsStartupDropdownOpen] = useState(false);
  const [isEnablerDropdownOpen, setIsEnablerDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [userDetails, setUserDetails] = useState(null);

  const location = useLocation();

  const closeDropdowns = () => {
    setIsStartupDropdownOpen(false);
    setIsEnablerDropdownOpen(false);
  };

  const isAnalyticsPage = location.pathname === '/analytics';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 200);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      // Simulate fetching user data from API
      console.log('Fetching user data...');
      fetch('http://localhost:5000/user')
        .then(response => response.json())
        .then(data => {
          console.log('User data fetched:', data);
          setUserDetails(data);
        })
        .catch(error => console.error('Error fetching user data:', error));
    }
  }, [isLoggedIn]);

  const handleAvatarClick = () => {
    setShowPopup(!showPopup);
  };

  return (
    <nav
      className={`bg-white text-black fixed top-0 left-0 w-full z-50 p-4 transition-all duration-300 
        ${isAnalyticsPage || isScrolled ? 'rounded-none mt-0' : 'rounded-[70px] mt-[75px]'}`}
    >
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <button className="md:hidden text-gray-800">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        </div>

        <div className="flex-1 flex justify-center items-center">
          <img src={LOGO} alt="Logo" className="h-12 w-15 rounded-full" />
          <div className="relative ml-4">
          <input
  type="search"
  className="w-full py-2 pl-10 text-sm text-gray-700 rounded-full border border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500 mr-[50px] w-[380px]"
  placeholder="Search..."
/>

            <svg
              className="absolute top-1/2 transform -translate-y-1/2 left-3 h-5 w-5 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        <div className="hidden md:flex space-x-8 relative mr-[80px]">
          <div className="relative">
            <button
              className="text-gray-800 hover:text-orange-500 focus:outline-none"
              onClick={() => {
                closeDropdowns();
                setIsStartupDropdownOpen(!isStartupDropdownOpen);
              }}
            >
              For Startups
            </button>
            {isStartupDropdownOpen && (
              <div className="absolute left-0 mt-2 w-[1000px] mr-[100px] bg-white border-t border-b border-gray-300 shadow-lg z-10">
                <div className="flex justify-around py-4">
                  <div className="space-y-2">
                    <h4 className="font-bold text-gray-800">Startup Literacy</h4>
                    <a href="#" className="block text-gray-600 hover:text-black">Learning & Development</a>
                    <a href="#" className="block text-gray-600 hover:text-black">InnovateTN - FabLabs</a>
                    <a href="#" className="block text-gray-600 hover:text-black">Hackathon</a>
                    <a href="#" className="block text-gray-600 hover:text-black">MentorTN</a>
                    <a href="#" className="block text-gray-600 hover:text-black">Brand Labs</a>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-bold text-gray-800">Innovation Landscape</h4>
                    <a href="#" className="block text-gray-600 hover:text-black">Open Innovation</a>
                    <a href="#" className="block text-gray-600 hover:text-black">Hackathon</a>
                    <a href="#" className="block text-gray-600 hover:text-black">InnovateTN - FabLabs</a>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-bold text-gray-800">Fund Raise</h4>
                    <a href="#" className="block text-gray-600 hover:text-black">TANFUND</a>
                    <a href="#" className="block text-gray-600 hover:text-black">TANSEED</a>
                    <a href="#" className="block text-gray-600 hover:text-black">Conventional Institutions Engagement</a>
                    <a href="#" className="block text-gray-600 hover:text-black">AngelsTN</a>
                    <a href="#" className="block text-gray-600 hover:text-black">Startup Thamizha</a>
                    <a href="#" className="block text-gray-600 hover:text-black">TN SC/ST Startup Fund</a>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="relative">
            <button
              className="text-gray-800 hover:text-orange-500 focus:outline-none"
              onClick={() => {
                closeDropdowns();
                setIsEnablerDropdownOpen(!isEnablerDropdownOpen);
              }}
            >
              For Enablers
            </button>
            {isEnablerDropdownOpen && (
              <div className="absolute left-0 mt-2 w-[1000px] mr-[100px] bg-white border-t border-b border-gray-300 shadow-lg z-10">
                <div className="flex justify-around py-4">
                  <div className="space-y-2">
                    <h4 className="font-bold text-gray-800">Ecosystem Stakeholders</h4>
                    <a href="#" className="block text-gray-600 hover:text-black">MentorTN</a>
                    <a href="#" className="block text-gray-600 hover:text-black">AngelsTN</a>
                    <a href="#" className="block text-gray-600 hover:text-black">Sectoral Forum</a>
                    <a href="#" className="block text-gray-600 hover:text-black">S2G</a>
                    <a href="#" className="block text-gray-600 hover:text-black">Scaleup Incubators</a>
                    <a href="#" className="block text-gray-600 hover:text-black">Catalyst</a>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-bold text-gray-800">Equitable Growth</h4>
                    <a href="#" className="block text-gray-600 hover:text-black">TANSEED</a>
                    <a href="#" className="block text-gray-600 hover:text-black">Regional Hubs</a>
                    <a href="#" className="block text-gray-600 hover:text-black">TN SC/ST Startup Fund</a>
                    <a href="#" className="block text-gray-600 hover:text-black">Venture Lab</a>
                  </div>
                </div>
              </div>
            )}
          </div>

          <a href="#" className="text-gray-800 hover:text-orange-500">Events & Media</a>
          <a href="#" className="text-gray-800 hover:text-orange-500">Ecosystem</a>
          <a href="#" className="text-orange-500 font-bold">Startup Thiruvizha'24</a>
        </div>

        
        <div className="hidden md:flex space-x-4">
          {isLoggedIn ? (
            <div className="relative">
              {userDetails?.avatarUrl ? (
                <img
                  src={userDetails.avatarUrl} // Replace with actual user avatar URL
                  alt="User Avatar"
                  className="h-10 w-10 rounded-full cursor-pointer"
                  onClick={handleAvatarClick}
                />
              ) : (
                <div>Loading...</div> // Fallback while avatar is loading
              )}
              {showPopup && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 shadow-lg p-4 rounded-lg">
                  <p className="text-gray-800 font-semibold">{userDetails?.name}</p>
                  <p className="text-gray-600 text-sm">{userDetails?.email}</p>
                  <Link to="/profile" className="block mt-2 text-blue-600 hover:underline">Profile</Link>
                  <button
                    className="mt-2 w-full text-left text-red-600 hover:underline"
                    onClick={() => {
                      setIsLoggedIn(false);
                      setUserDetails(null); // Clear user details on logout
                    }}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link to="/login">
                <button className="px-4 py-2 border border-gray-800 rounded-full text-gray-800 hover:bg-gray-100 ">
                  Login
                </button>
              </Link>
              <Link to="/register">
                <button className="px-4 py-2 bg-blue-900 text-white rounded-full hover:bg-blue-700 mr-[20px]">
                  Start Registration
                </button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;