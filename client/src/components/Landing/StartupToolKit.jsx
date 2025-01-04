import React, { useState } from "react";
import img1 from "../../assets/ideation.avif";
import img2 from "../../assets/validation.avif";
import img3 from "../../assets/tracking.avif";
import img4 from "../../assets/scaling.avif";

const StartupToolkit = () => {
  const [activeTab, setActiveTab] = useState("ideation");

  const contentData = {
    ideation: {
      image: img1,
      video: "https://www.youtube.com/embed/21tL9ZCa-Qc?si=SAxr1YL-xaaVBrek",
      title: "Ideation",
      description: "Brainstorming, Conceptualization, and Idea Validation.",
      activities: [
        "Market Research",
        "Customer Persona Development program",
        "Brainstorming Sessions",
        "Prototyping",
        "Pitch Preparation",
      ],
    },
    validation: {
      image: img2,
      video: "https://www.youtube.com/embed/21tL9ZCa-Qc?si=SAxr1YL-xaaVBrek",
      title: "Validation",
      description: "Validating your product idea through pilot tests and market feedback.",
      activities: [
        "Beta Testing",
        "Customer Feedback Collection",
        "Iterative Design",
        "Business Model Refinement",
        "Competitor Analysis",
      ],
    },
    "early-traction": {
      image: img3,
      video: "https://www.youtube.com/embed/21tL9ZCa-Qc?si=SAxr1YL-xaaVBrek",
      title: "Early Traction",
      description: "Where the startup has established a mark.",
      activities: [
        "States' and UTs' Startup Policies",
        "Procurement by Government",
        "MAARG Mentorship",
        "Startup India Seed Fund Scheme",
        "Programs and Challenges",
      ],
    },
    scaling: {
      image: img4,
      video: "https://www.youtube.com/embed/21tL9ZCa-Qc?si=SAxr1YL-xaaVBrek",
      title: "Scaling",
      description: "Scaling your startup through advanced strategies and expansion plans.",
      activities: [
        "Investor Engagement",
        "International Market Entry",
        "Advanced Marketing Strategies",
        "Team Scaling and Hiring",
        "Product Diversification",
      ],
    },
  };

  const renderTabContent = (tab) => {
    const { image, video, title, description, activities } = contentData[tab];

    return (
      <div className="p-4 sm:p-6 md:p-8 space-y-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0 md:space-x-8 py-6 px-4 bg-gray-50 rounded-lg shadow-lg">
          {/* Left Column - Text Content */}
          <div className="w-full md:w-1/2">
            <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-4 flex items-center">
              <i className={`fas fa-${tab === "ideation" ? "lightbulb text-yellow-500" : tab === "validation" ? "check-circle text-green-500" : tab === "early-traction" ? "chart-line text-blue-500" : "expand text-purple-500"} mr-2`}></i>
              {title}
            </h2>
            <p className="text-base text-gray-700 mb-4">{description}</p>
            <ul className="list-disc list-inside text-gray-700">
              {activities.map((activity, index) => (
                <li key={index} className="mb-2">{activity}</li>
              ))}
            </ul>
          </div>

          {/* Right Column - Image */}
          <div className="w-full md:w-1/2">
            <img src={image} alt={`${title} Image`} className="w-full h-64 object-cover rounded-lg shadow-md" />
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col md:flex-row ">
      {/* Sidebar */}
      <div className="w-full md:w-1/5 bg-green-500 text-white p-4 md:ml-2">
        <h1 className="text-2xl mb-4">Startup Toolkits</h1>
        <ul className="space-y-2">
          {Object.keys(contentData).map((tab) => (
            <li
              key={tab}
              className={`cursor-pointer p-3 rounded-md ${activeTab === tab ? "bg-yellow-500 scale-105" : "bg-green-700 hover:bg-yellow-400 hover:scale-105"} transition transform duration-300`}
              onClick={() => setActiveTab(tab)}
            >
              {contentData[tab].title}
            </li>
          ))}
        </ul>
      </div>

      {/* Content Area */}
      <div className="w-full md:w-4/5 bg-white overflow-y-auto">
        {renderTabContent(activeTab)}
      </div>
    </div>
  );
};

export default StartupToolkit;
