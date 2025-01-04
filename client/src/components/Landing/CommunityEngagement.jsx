import React from 'react';
import communityImage from '../../assets/community.avif'; // Update the path to your image

const CommunityEngagement = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      {/* Section Heading */}
      <h2 className="text-2xl text-center font-semibold text-teal-700 my-8">
        Ayush Events and Community Engagement
      </h2>

      {/* Content Section */}
      <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md">
        <img 
          src={communityImage} 
          alt="Ayush Events and Community Engagement" 
          className="w-full h-auto rounded-lg mb-6"
        />
        <h1 className="text-3xl text-teal-700 mb-4">About the Initiative</h1>
        <p className="mb-6">
          Ayush Product Development and Innovation focuses on advancing the quality and efficacy of traditional medicine through collaborations with leading research institutions. This initiative aims to innovate in product development, clinical trials, and the standardization of traditional medicine practices to ensure their relevance and effectiveness in modern healthcare.
        </p>
        
        <h2 className="text-2xl text-teal-700 mb-4">Key Features</h2>
        <ul className="list-disc list-inside mb-6">
          <li><strong>Collaborations:</strong> Partnerships with top research institutions to enhance product development.</li>
          <li><strong>Clinical Trials:</strong> Rigorous testing and evaluation to ensure safety and efficacy.</li>
          <li><strong>Standardization:</strong> Establishing protocols for consistent quality and practice.</li>
        </ul>
        
        <h2 className="text-2xl text-teal-700 mb-4">Objectives</h2>
        <p className="mb-6">
          The primary objectives of this initiative include:
        </p>
        <ul className="list-disc list-inside mb-6">
          <li>Improving the quality of Ayush products through research and innovation.</li>
          <li>Standardizing practices to ensure product safety and effectiveness.</li>
          <li>Fostering partnerships with research institutions for collaborative advancements.</li>
        </ul>

        <h2 className="text-2xl text-teal-700 mb-4">Get Involved</h2>
        <p className="mb-6">
          For more information on how to get involved or benefit from this initiative, please visit our{' '}
          <a 
            href="https://example.com" 
            className="text-teal-600 hover:underline" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            official page
          </a>.
        </p>

        <a 
          href="https://example.com" 
          className="inline-block px-6 py-3 text-white bg-teal-700 rounded-lg text-center hover:bg-teal-800 transition-colors duration-300"
          target="_blank" 
          rel="noopener noreferrer"
        >
          Learn More
        </a>
      </div>

      {/* Footer */}
      <div className="bg-teal-800 text-white text-center p-4 mt-auto">
        <p>&copy; 2024 Government of India | All rights reserved</p>
      </div>
    </div>
  );
};

export default CommunityEngagement;
