import React from 'react';
import { useParams } from 'react-router-dom';

const KeysAndInitiativesPages = () => {
    const {id}=useParams();
    const data=KeyData[id];
  return (
    <div className="bg-gray-100 min-h-screen">
      <header className="bg-teal-600 text-white p-4 text-center">
        <h1 className="text-3xl font-bold">{data.title}</h1>
      </header>

      <main className="container mx-auto p-4">
        <section className="bg-white shadow-md rounded-lg p-6 mb-6">
          <img src={data.headerImage} alt="Scheme" className="w-full h-auto rounded-lg mb-4" />
          <h2 className="text-teal-600 text-2xl font-semibold mb-2">{data.section.heading}</h2>
          <p className="text-gray-700 leading-relaxed">{data.section.content}</p>

          <div className="mt-6">
            <h3 className="text-teal-600 text-xl font-semibold mb-2">Key Features</h3>
            <ul className="list-disc pl-5 space-y-2">
              {data.keyFeatures.map((feature, index) => (
                <li key={index} className="text-gray-700">
                  <strong className="text-teal-600">{feature.title}:</strong> {feature.description}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-6">
            <h3 className="text-teal-600 text-xl font-semibold mb-2">Objectives</h3>
            <ul className="list-disc pl-5 space-y-2">
              {data.objectives.map((objective, index) => (
                <li key={index} className="text-gray-700">{objective}</li>
              ))}
            </ul>
          </div>

          <div className="mt-6">
            <h3 className="text-teal-600 text-xl font-semibold mb-2">Application Process</h3>
            <p className="text-gray-700">{data.applicationProcess}</p>
            <a href={data.learnMoreLink} target="_blank" rel="noopener noreferrer" className="inline-block bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700 mt-4">
              Learn More
            </a>
          </div>
        </section>
      </main>

      <footer className="bg-teal-800 text-white text-center p-4 fixed bottom-0 w-full">
        <p>&copy; 2024 Government of India | All rights reserved</p>
      </footer>
    </div>
  );
};
// data.js
const KeyData = [
    {
      id: 1,
      title: "Collaboration with other ministries",
      headerImage: "collaboration.avif",
      section: {
        heading: "Collaboration with Ministries",
        content: `This initiative encourages collaboration with various ministries, including Commerce, Food Processing Industries, and Health and Family Welfare. The goal is to foster inter-ministerial cooperation to enhance the effectiveness of Ayush-related programs and services.`,
      },
      keyFeatures: [
        {
          title: "Inter-Ministerial Coordination",
          description: "Facilitates coordination between different government ministries to streamline Ayush initiatives.",
        },
        {
          title: "Resource Sharing",
          description: "Promotes sharing of resources and information among ministries to optimize support for Ayush programs.",
        },
        {
          title: "Policy Integration",
          description: "Encourages integration of policies across ministries to create a unified approach towards Ayush development.",
        },
      ],
      objectives: [
        "Enhance collaboration between ministries for comprehensive Ayush support.",
        "Improve resource allocation and policy coherence for Ayush programs.",
        "Strengthen the overall effectiveness of Ayush initiatives through inter-ministerial cooperation.",
      ],
      applicationProcess: `There is no specific application process for this initiative. Instead, collaboration occurs through inter-ministerial meetings and coordination mechanisms.`,
      learnMoreLink: "https://example.com/collaboration",
    },
    {
      id: 2,
      title: "Digital initiatives",
      headerImage: "digital_initiatives.avif",
      section: {
        heading: "Digital Initiatives by MoA",
        content: `The Ministry of Ayush (MoA) has launched several digital initiatives aimed at improving the quality of research, education, and services in the Ayush sector. These initiatives include digital platforms for research publication, online education modules, and digital health records.`,
      },
      keyFeatures: [
        {
          title: "Digital Platforms",
          description: "Development of online platforms for research publication and knowledge dissemination.",
        },
        {
          title: "Online Education",
          description: "Introduction of online courses and educational modules for Ayush practitioners and researchers.",
        },
        {
          title: "Digital Health Records",
          description: "Implementation of digital health records to streamline patient information and care.",
        },
      ],
      objectives: [
        "Improve access to research and educational resources in the Ayush sector.",
        "Enhance the quality and efficiency of Ayush services through digital tools.",
        "Promote innovation and technology adoption in Ayush practices.",
      ],
      applicationProcess: `Interested parties can access digital platforms and resources through the Ministry of Ayush's official website. Specific initiatives may have their own access guidelines.`,
      learnMoreLink: "https://example.com/digital-initiatives",
    },
    {
      id: 3,
      title: "Ayush Start-up Challenge",
      headerImage: "start_up_challenge.avif",
      section: {
        heading: "Ayush Start-up Challenge",
        content: `The Ayush Start-up Challenge, launched by the AIIA, aims to support and promote innovative startups in the Ayush sector. This initiative provides funding, mentorship, and resources to startups that focus on new solutions and advancements in Ayush healthcare.`,
      },
      keyFeatures: [
        {
          title: "Funding Support",
          description: "Offers financial assistance to promising Ayush startups.",
        },
        {
          title: "Mentorship",
          description: "Provides mentorship from industry experts to guide startups in their development.",
        },
        {
          title: "Resource Access",
          description: "Grants access to resources and networks to support startup growth and innovation.",
        },
      ],
      objectives: [
        "Encourage innovation and entrepreneurship in the Ayush sector.",
        "Support the development of new solutions and technologies for Ayush healthcare.",
        "Foster a supportive ecosystem for Ayush startups through funding and mentorship.",
      ],
      applicationProcess: `Startups can apply for the challenge through the AIIA's official portal. Applications are evaluated based on innovation, impact, and feasibility.`,
      learnMoreLink: "https://example.com/startup-challenge",
    },
    {
      id: 4,
      title: "Promoting investment",
      headerImage: "investment.avif",
      section: {
        heading: "Global AYUSH Investment & Innovation Summit",
        content: `The Global AYUSH Investment & Innovation Summit is designed to promote investment in Ayush services, products, and education sectors. The summit brings together investors, policymakers, and industry leaders to discuss opportunities and drive growth in the Ayush sector.`,
      },
      keyFeatures: [
        {
          title: "Investment Opportunities",
          description: "Showcases investment opportunities in Ayush services and products.",
        },
        {
          title: "Networking",
          description: "Provides a platform for networking with investors and industry leaders.",
        },
        {
          title: "Innovation Focus",
          description: "Highlights innovative solutions and advancements in the Ayush sector.",
        },
      ],
      objectives: [
        "Attract investment to boost the Ayush sector.",
        "Promote new innovations and advancements in Ayush.",
        "Facilitate connections between investors and Ayush stakeholders.",
      ],
      applicationProcess: `Interested investors and participants can register for the summit through the official event website. Details on registration and participation are provided on the summit's page.`,
      learnMoreLink: "https://example.com/investment-summit",
    },
    {
      id: 5,
      title: "Champion Services Sector Scheme",
      headerImage: "champion_services.avif",
      section: {
        heading: "About the Scheme",
        content: `The Champion Services Sector Scheme is an initiative by the Government of India designed to promote and support the development of Ayush hospitals and wellness centers across the country. This scheme offers soft loans and interest subsidies to facilitate the establishment and expansion of these facilities, ensuring that they meet high standards of care and service.`,
      },
      keyFeatures: [
        {
          title: "Soft Loans",
          description: "Financial assistance in the form of soft loans to support the growth of Ayush hospitals and wellness centers.",
        },
        {
          title: "Interest Subsidies",
          description: "Subsidies to reduce the cost of interest on loans taken by Ayush institutions.",
        },
        {
          title: "Expansion Support",
          description: "Assistance for the expansion of existing facilities to enhance their service capabilities.",
        },
      ],
      objectives: [
        "Enhance the quality of Ayush healthcare services.",
        "Encourage the establishment of new Ayush facilities in underserved areas.",
        "Support the growth and modernization of existing Ayush institutions.",
      ],
      applicationProcess: `Interested institutions can apply for the scheme through the official website. Applications will be reviewed based on eligibility criteria and the potential impact of the proposed project.`,
      learnMoreLink: "https://example.com/champion-services",
    },
    {
      id: 6,
      title: "National Startups Awards",
      headerImage: "national_startups.avif",
      section: {
        heading: "National Startups Awards",
        content: `The National Startup Award is a marquee initiative by AYUSH Startup India, DPIIT, recognizing exceptional startups across India. The awards highlight innovative and impactful startups in the Ayush sector, providing them with recognition and opportunities for growth.`,
      },
      keyFeatures: [
        {
          title: "Recognition",
          description: "Honors exceptional startups in the Ayush sector with awards and accolades.",
        },
        {
          title: "Growth Opportunities",
          description: "Provides winners with opportunities for growth and visibility in the industry.",
        },
        {
          title: "Innovation Focus",
          description: "Highlights innovative approaches and solutions developed by startups.",
        },
      ],
      objectives: [
        "Recognize and reward exceptional Ayush startups.",
        "Provide growth opportunities and industry visibility for award winners.",
        "Encourage innovation and excellence in the Ayush startup ecosystem.",
      ],
      applicationProcess: `Startups can apply for the awards through the AYUSH Startup India portal. Applications are evaluated based on innovation, impact, and growth potential.`,
      learnMoreLink: "https://example.com/national-startups-awards",
    },
    {
      id: 7,
      title: "States Startup Ranking",
      headerImage: "states_startup_ranking.avif",
      section: {
        heading: "States Startup Ranking",
        content: `The States’ Startup Ranking is an annual capacity-building exercise aimed at creating a conducive startup ecosystem in different states. The ranking evaluates states based on their support for startups, including policy frameworks, infrastructure, and ease of doing business.`,
      },
      keyFeatures: [
        {
          title: "State Evaluation",
          description: "Evaluates states based on their startup ecosystem support and development.",
        },
        {
          title: "Capacity Building",
          description: "Aims to build and improve startup ecosystems at the state level.",
        },
        {
          title: "Policy Frameworks",
          description: "Assesses the effectiveness of policy frameworks and support mechanisms for startups.",
        },
      ],
      objectives: [
        "Enhance state-level support for startups.",
        "Encourage states to develop robust startup ecosystems.",
        "Recognize and reward states with effective startup support structures.",
      ],
      applicationProcess: `States are evaluated based on their startup ecosystem support and development. There is no specific application process for this ranking, but states can participate by implementing effective startup policies and programs.`,
      learnMoreLink: "https://example.com/states-startup-ranking",
    },
    {
      id: 8,
      title: "Investor Connect",
      headerImage: "investor_connect.avif",
      section: {
        heading: "Investor Connect",
        content: `Investor Connect serves as a dedicated platform that connects startups to investors across diverse sectors. This initiative aims to facilitate investment opportunities and foster connections between startups and potential investors.`,
      },
      keyFeatures: [
        {
          title: "Investment Opportunities",
          description: "Provides a platform for startups to connect with investors looking for new opportunities.",
        },
        {
          title: "Networking",
          description: "Facilitates networking between startups and investors across various sectors.",
        },
        {
          title: "Support Services",
          description: "Offers support services to help startups prepare for investment pitches and negotiations.",
        },
      ],
      objectives: [
        "Facilitate connections between startups and investors.",
        "Provide startups with opportunities for investment and growth.",
        "Support startups in preparing for investment pitches and negotiations.",
      ],
      applicationProcess: `Startups can register on the Investor Connect platform to connect with potential investors. Detailed instructions for registration and engagement are available on the platform's website.`,
      learnMoreLink: "https://example.com/investor-connect",
    },
];
  
export default KeysAndInitiativesPages;
