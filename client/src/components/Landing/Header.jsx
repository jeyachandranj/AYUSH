// src/components/Header.js
import React from 'react';

const Header = () => {
  return (
    <div className="bg-[#292929] text-white py-2 px-4 sm:px-6 lg:px-12">
      <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center">
        {/* Left Section - Logo and Text */}
        <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-2">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRg_iJUajtQMR6w_jl_rhLtkF3W6OdBHPitAA&s"
            alt="India Government Logo"
            className="h-6 sm:h-8"
          />
          <div className="text-xs sm:text-sm leading-tight text-center sm:text-left">
            <p>भारत सरकार |</p>
            <p className="font-bold uppercase">Government of India |</p>
            <p>Ministry of AYUSH</p>
          </div>
        </div>

        {/* Middle Section - Social Media Icons */}
        <div className="flex space-x-3 mt-2 sm:mt-0">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHe2GslsjaoJquxKTu31ASib1vee0EfYQYwMc1L0-MXa3X57L6P4snY1TvBNRecl_qW1I&usqp=CAU"
              alt="Facebook"
              className="h-4 sm:h-5 rounded-full"
            />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJO2SeTQHtzL024EkApdOOoQ1QlTxBsqKCSQ&s"
              alt="Twitter"
              className="h-5 sm:h-6 rounded-full"
            />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrE6ly8jovJ2yuCB4UR1uihSVGHTMUfv0gJeJqgrFXx2FQyeey2E_HIfuQ3DnUovHMwPg&usqp=CAU"
              alt="LinkedIn"
              className="h-4 sm:h-5 rounded-full"
            />
          </a>
        </div>

        {/* Right Section - Toll Free Number */}
        <div className="text-xs sm:text-sm text-center sm:text-right mt-2 sm:mt-0">
          <p>
            Our Toll Free Number: 
            <span className="font-bold"> 1800 115 565 </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Header;
