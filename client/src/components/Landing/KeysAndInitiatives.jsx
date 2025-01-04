import React from 'react';
import collaboration from '../../assets/collaboration.avif';
import digital from '../../assets/digital.avif';
import startup from '../../assets/startup.avif';
import promoting from '../../assets/promoting.avif';
import champion from '../../assets/champion.avif';
import award from '../../assets/award.avif';
import ranking from '../../assets/ranking.avif';
import investor from '../../assets/investor.avif';
import { Link } from 'react-router-dom';
const cardData = [
  {
    href: '/keys-and-initiatives/0',
    imageSrc: collaboration,
    title: 'Collaboration with other ministries',
    description: 'It encourages collaboration with ministries such as Commerce, Food Processing Industries, and Health and Family Welfare.',
  },
  {
    href: '/keys-and-initiatives/1',
    imageSrc: digital,
    title: 'Digital initiatives',
    description: 'The Ministry of Ayush (MoA) has taken digital initiatives to improve the quality of research, education, and services.',
  },
  {
    href: '/keys-and-initiatives/2',
    imageSrc: startup,
    title: 'Ayush Start-up Challenge',
    description: 'The AIIA launched the Ayush Start-up Challenge to support innovations and startups in the Ayush sector.',
  },
  {
    href: '/keys-and-initiatives/3',
    imageSrc: promoting,
    title: 'Promoting investment',
    description: 'The Global AYUSH Investment & Innovation Summit aims to promote investment in Ayush services, products, and education sectors.',
  },
  {
    href: '/keys-and-initiatives/4',
    imageSrc: champion,
    title: 'Champion Services Sector Scheme',
    description: 'This scheme provides soft loans and interest subsidies to Ayush hospitals and wellness centers.',
  },
  {
    href: '/keys-and-initiatives/5',
    imageSrc: award,
    title: 'National Startups Awards',
    description: 'The National Startup Award is a marquee initiative by AYUSH Startup India, DPIIT, in recognizing exceptional startups across India.',
  },
  {
    href: '/keys-and-initiatives/6',
    imageSrc: ranking,
    title: 'States Startup Ranking',
    description: 'The States’ Startup Ranking is an annual capacity building exercise which has been developed to build a conducive startup ecosystem.',
  },
  {
    href: '/keys-and-initiatives/7',
    imageSrc: investor,
    title: 'Investor Connect',
    description: 'It serves as a dedicated platform that connects startups to investors, across diverse sectors.',
  },
];

const KeysAndInitiatives = () => {
  return (
    <div className="bg-gray-100 min-h-screen p-4">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-semibold text-green-600">Keys and Initiatives</h1>
      </div>

      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {cardData.map((card, index) => (
          <li key={index} className="relative group">
            <Link to={card.href} className="block rounded-lg overflow-hidden bg-white shadow-lg transition-transform duration-300 hover:scale-105">
              <img src={card.imageSrc} className="w-full h-48 object-cover transition-opacity duration-300 group-hover:opacity-60" alt={card.title} />
              <div className="absolute inset-0 flex flex-col justify-end p-4 bg-black bg-opacity-50 transition-opacity duration-300 group-hover:bg-opacity-70">
                <h3 className="text-xl font-bold text-white">{card.title}</h3>
                <p className="mt-2 text-white">{card.description}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default KeysAndInitiatives;
