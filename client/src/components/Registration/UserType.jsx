import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Landing/Header";
import Navbar from "../Landing/Navbar";
import mentor from "../../assets/mentor.jpg";
import investor from "../../assets/investor.webp";
import startup from "../../assets/startup.webp";

const cardData = [
  {
    logo: investor,
    heading: "Investor",
    description: "Join as an investor to support emerging AYUSH startups.",
    route: "/register/investor",
  },
  {
    logo: mentor,
    heading: "Mentor",
    description: "Become a mentor and guide startups on their journey.",
    route: "/register/mentor",
  },
  {
    logo: startup,
    heading: "Startup Founder",
    description: "Register your startup and get the necessary approvals.",
    route: "/register",
  },
];

function UserType({setType}) {
  const [cardPicked, setCardPicked] = useState(null);
  const navigate = useNavigate();
  const { name } = JSON.parse(localStorage.getItem("data"));
  const handleCardClick = (index) => {
    setCardPicked(index);
  };

  const handleContinue = () => {
    if (cardPicked !== null) {
      navigate("/guide");
      setType(cardPicked);
    }
  };
  return (
    <>
      <Header />
      <Navbar />
      <section className="h-screen bg-white overflow-y-auto flex flex-col w-full pt-5 mt-8">
        <div className="container mx-auto p-2 flex-grow w-3/4 mt-8">  
          <h1 className="text-xl font-bold mb-2">Welcome {name}</h1>
          <p className="text-sm mb-4">
            Select the type of user you are registering.
          </p>
          <div className="flex justify-center gap-4 p-1">
            {cardData.map((card, index) => (
              <div
                key={index}
                onClick={() => handleCardClick(index)}
                className={`w-full h-48 max-w-lg p-4 rounded-lg shadow-lg cursor-pointer transition-transform transform bg-white ${
                  cardPicked === index
                    ? "border-4 border-green-500 scale-105 shadow-green-500"
                    : "hover:scale-105 hover:bg-green-100"
                }`}
              >
                <div className="flex items-center">
                  <img
                    src={card.logo}
                    alt={`${card.heading} logo`}
                    className="h-16 w-16 rounded-full mr-4"
                  />
                  <div>
                    <h2 className="text-lg font-bold">{card.heading}</h2>
                    <p className="text-gray-600 mt-2">{card.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-8">
            <button
              onClick={handleContinue}
              disabled={cardPicked === null}
              className={`px-6 py-2 rounded-md text-white transition duration-200 ${
                cardPicked !== null
                  ? "bg-green-500 hover:bg-green-600"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
            >
              Continue
            </button>
          </div>
        </div>
      </section>
    </>
  );
}

export default UserType;
