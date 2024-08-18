import React from "react";
import BasicImage from "../../assets/basic.png";
import StandardImage from "../../assets/standard.png";
import PremiumImage from "../../assets/laptop.jpg";
import TextButton from "./TextButton";
import Bot from "../../pages/bot";

class CardInfo {
  constructor(imageSource, title, features) {
    this.imageSource = imageSource;
    this.title = title;
    this.features = features;
  }
}

const handleButtonClick = (index) => {
  if (index === 0) {
    window.location.href = "https://ayush.gov.in/";
  } else if (index === 2) {
    window.location.href = "https://ayushportal.nic.in/";
  }
  else if(index === 3){
    window.location.href = "/register";  }
};

const Card = ({ cardInfo, index }) => {
  return (
    <div className="my-4 w-full rounded-xl p-4 shadow-2xl duration-300 hover:scale-105">
      <img src={cardInfo.imageSource} alt="" className="mx-auto w-20" />
      <h2 className="py-8 text-center text-2xl font-bold">{cardInfo.title}</h2>
      <div className="mt-8 text-center font-medium">
        <ol>
          {cardInfo.features.map((feature, index) => (
            <li key={index}>{feature}</li>
          ))}
        </ol>
        <TextButton
          text={index === 1 ? "Start registration" : "LINK"}
          type="secondary"
          onClick={() => handleButtonClick(index)}
        />
      </div>
    </div>
  );
};

const Cards = () => {
  const cardDataArray = [
    new CardInfo(
      PremiumImage,
      "The Aushadhi portal",
      [
        "The e-Aushadhi portal is a web-based application for managing the stock of drugs, sutures, and surgical items across district drug warehouses in Rajasthan¹. It ensures efficient supply chain management and quality control of medicines."
      ]
    ),
    new CardInfo(
      StandardImage,
      "AYUSH Registration",
      [
        "Consultation",
        "Document Preparation",
        "2 Government Registrations",
      ]
    ),
    new CardInfo(
      PremiumImage,
      "The AYUSH Research Portal",
      [
        "The AYUSH Research Portal is a comprehensive platform for disseminating knowledge and research updates on Ayurveda, Yoga & Naturopathy, Unani, Siddha, Homoeopathy, and Sowa Rigpa1. It aims to promote scientific research and education in traditional Indian medicine systems."
      ]
    ),
  ];

  return (
    <div className="w-full bg-white px-4 py-10">
      <div className="mx-auto grid max-w-screen-xl gap-8 md:grid-cols-3">
        {cardDataArray.map((cardData, index) => (
          <Card key={index} cardInfo={cardData} index={index} />
        ))}
        <Bot/>
      </div>
    </div>
  );
};

export default Cards;
