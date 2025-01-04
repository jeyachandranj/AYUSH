import React from "react";
import tax from '../../assets/tax.avif';
import fund from '../../assets/fund.avif';
import mentor from '../../assets/mentor.avif';
import tender from '../../assets/tender.avif';
import ip from '../../assets/ip.avif';
import market from '../../assets/market.jpg';
import left from '../../assets/left.avif';
import right from '../../assets/right.avif';
const benefits = [
  {
    img: tax,
    title: "Tax Exemptions",
    description: "Get various tax benefits under the government schemes for Ayush startups.",
  },
  {
    img: fund,
    title: "Access to Funding",
    description: "Unlock access to various funding options and grants to scale your startup.",
  },
  {
    img: mentor,
    title: "Mentorship & Guidance",
    description: "Receive expert guidance from industry leaders and mentors.",
  },
  {
    img: tender,
    title: "Priority Access to Government Tenders",
    description:
      "Registered Ayush startups often get priority access to government tenders and contracts, allowing them to work on significant public health projects.",
  },
  {
    img: ip,
    title: "Intellectual Property (IP) Support",
    description:
      "Assistance in filing patents, trademarks, and other intellectual property protections for your Ayush-related innovations and products.",
  },
  {
    img: market,
    title: "Marketing and Promotion Support",
    description:
      "Government initiatives help in promoting Ayush startups through various platforms, expos, and campaigns, increasing visibility and credibility in the market.",
  },
];

const AyushStartupBenefits = () => {
  return (
    <div className="relative bg-white text-center py-12">
      <h2 className="text-4xl mb-12 font-bold text-gray-800 animate-fadeInSlideDown">Benefits of Ayush Startup Registration</h2>

      <div className="flex justify-center flex-wrap gap-6">
        {benefits.map((benefit, index) => (
          <div
            key={index}
            className="bg-yellow-100 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300 w-72"
          >
            <div className="p-6 text-center">
              <img className="w-20 h-20 mx-auto mb-6 transition-transform duration-300 hover:scale-110" src={benefit.img} alt={benefit.title} />
              <h3 className="text-xl font-semibold text-green-600">{benefit.title}</h3>
              <p className="text-gray-600 mt-4">{benefit.description}</p>
            </div>
          </div>
        ))}
      </div>

      <img src={left} alt="Left Plant" className="absolute left-0 bottom-0 w-72 hidden md:block animate-float" />
      <img src={right} alt="Right Plant" className="absolute right-0 bottom-0 w-72 hidden md:block animate-float"/>
    </div>
  );
};

export default AyushStartupBenefits;
