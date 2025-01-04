import React, { useState, useEffect } from "react";
import investorLogo from "../../assets/investor.webp";
import poster from "../../assets/poster.jpg";
import achievementIcon from "../../assets/achievement.jpg";
import opportunityIcon from "../../assets/achievement.jpg";
import networkIcon from "../../assets/achievement.jpg";
import Post from "../social/posts";
import Header from "../Landing/Header";
import axiosHeader from "../../axiosHeader";
import { useParams } from "react-router-dom";

// Static data to be used as a fallback (or example data)

const Investor = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { id } = useParams(); // Extract the investor ID from the URL
  const [investorData, setInvestorData] = useState(null); // Initially set to null
  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosHeader.get(`/investor/${id}`);
        setInvestorData(response.data.investor);
      } catch (error) {
        console.error("Error fetching investor data:", error);
      }
    };
    fetchData(); // Call the fetch function inside the useEffect
  }, [id]);

  if (!investorData) {
    // Loading state
    return <div>Loading...</div>;
  }
  console.log(investorData);
  return (
    <>
      <Header />
      <div className="flex flex-col md:flex-row bg-gray-50 p-8 rounded-xl shadow-lg">
        {/* Left Side - Info */}
        <div className="flex flex-col md:w-1/3 bg-white p-6 rounded-xl mb-6 md:mb-0 shadow-lg">
          <div className="flex flex-col items-center">
            {/* Logo */}
            <img
              src={investorData.logo[0] || investorLogo} // Use a fallback image if no logo
              alt="Investor Logo"
              className="w-32 h-32 mb-6 rounded-full border border-gray-300 shadow-md"
            />
            {/* Investor Name */}
            <h1 className="text-4xl font-extrabold mb-4 text-gray-900">{investorData.name || "Investor Name"}</h1>
            {/* Contact Details */}
            <div className="text-gray-700 text-base mb-6 mt-4 w-full">
              <div className="flex items-center mb-4">
                <p className="text-lg font-semibold">Email: {`${investorData.name}@gmail.com` || "N/A"}</p>
              </div>
              <div className="flex items-center mb-4">
                <p className="text-lg font-semibold">Interest: {investorData.interest|| "N/A"}</p>
              </div>
              <div className="flex items-center mb-4">
                <p className="text-lg font-semibold">Location: {investorData.addressLine || "N/A"}</p>
              </div>
            </div>
            {/* Investment Interests */}
            <div className="text-gray-800 mb-6">
              <h2 className="text-2xl font-semibold mb-4">Investment Interests</h2>
              <div className="flex flex-col space-y-4">
                {investorData.startupState?.map((interest, index) => (
                  <div key={index} className="flex items-center bg-blue-100 p-4 rounded-lg shadow-md">
                    <p className="text-lg font-medium text-gray-800">{interest}</p>
                  </div>
                )) || <p>No investment interests available.</p>}
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Company Overview and Cards */}
        <div className="flex-1 md:w-2/3 bg-white p-6 rounded-xl">
          {/* Poster */}
          <img
            src={poster}
            alt="Poster"
            className="w-full h-56 object-cover rounded-lg mb-6"
          />
          <div>
            <h2 className="text-3xl font-semibold mb-4">Overview</h2>
            <p className="text-gray-800 text-sm">
              {isExpanded ? investorData.brief : `${investorData.brief.slice(0, investorData.brief.length * 0.3)}...`}
            </p>
            <button
              onClick={handleToggle}
              className="text-blue-600 mt-4 inline-block hover:underline"
            >
              {isExpanded ? "Show Less" : "Read More"}
            </button>
          </div>

          {/* Cards Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="bg-gray-200 p-4 rounded-lg text-center">
                <p className="text-gray-700 text-sm">Stage</p>
                <p className="font-bold text-lg">{investorData.startupState[0]}</p>
              </div>
              <div className="bg-gray-200 p-4 rounded-lg text-center">
                <p className="text-gray-700 text-sm">Website</p>
                <p className="font-bold text-lg">{investorData.website}</p>
              </div>
              <div className="bg-gray-200 p-4 rounded-lg text-center">
                <p className="text-gray-700 text-sm">Budget</p>
                <p className="font-bold text-lg">{investorData.budget}</p>
              </div>
          </div>
        </div>
      </div>
      <Post />
    </>
  );
};

export default Investor;
