import React,{useRef} from 'react';

import innovation from '../../assets/innovation.avif';
import quality from '../../assets/quality.avif';
import community from '../../assets/community.avif';
import f from '../../assets/f.avif';
import { Link } from 'react-router-dom';
const cards = [
  {
    title: 'Ayush Product Development and Innovation',
    text: 'Collaborations with research institutions to innovate in product development, clinical trials, and standardization of traditional medicine practices.',
    link: '/product-development',
    image: innovation,
  },
  {
    title: 'Regulatory and Quality Standards',
    text: 'Ensuring all products and services comply with national and international standards such as Ministry of AYUSH and WHO recommendations.',
    link: '/community-engagement',
    image: quality,
  },
  {
    title: 'Ayush Events and Community Engagement',
    text: 'Organizing regular workshops, webinars, and seminars on various Ayush-related topics to engage with the community and spread awareness.',
    link: '/community-engagement',
    image: community,
  },
  {
    title: 'Funding and Investment Support',
    text: 'Leveraging government initiatives like Startup India, Ayushman Bharat, startup incubators and accelerators, and other Ayush-specific grants.',
    link: '/product-development',
    image: f,
  },
];

function Card({ title, text, link, image }) {
    return (
      <div id="#ecoSystem" className="relative w-80 h-80 overflow-hidden shadow-lg group transition-transform duration-300 transform hover:scale-105">
        {/* Image section */}
        <img src={image} alt={title} className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-300 group-hover:opacity-25" />
        {/* Text section */}
        <div className="absolute inset-0 flex flex-col justify-end bg-green-400 p-4 text-center transition-transform duration-300 transform -translate-y-full group-hover:translate-y-0 group-hover:bg-[#DEE8C2]">
          <h3 className="text-xl font-semibold mb-4 text-green-800">{title}</h3>
          <p className="text-sm mb-4">{text}</p>
          <Link to={link}><span>Learn More</span></Link>
        </div>
      </div>
    );
  }
  
  

export default function CardSection() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <h2 className="text-3xl font-semibold text-green-600 mb-8">Startup Ecosystem</h2>
      <div className="flex gap-4 flex-wrap justify-center">
        {cards.map((card, index) => (
          <Card
            key={index}
            title={card.title}
            text={card.text}
            link={card.link}
            image={card.image}
          />
        ))}
      </div>
    </div>
  );
}
