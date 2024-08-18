import React, { useState } from "react";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [nav, setNav] = useState(false);

  const handleNav = () => {
    setNav(!nav);
  };

  return (
    <div className="mx-auto flex h-24 max-w-screen-xl items-center justify-between px-4 text-white">
      <img src={logo} alt="Logo" className="h-20 w-20 rounded-full" />
      <div className="hidden md:flex space-x-8">
        <p className="cursor-pointer transition-colors duration-300 hover:text-gray-400">Home</p>
        <p className="cursor-pointer transition-colors duration-300 hover:text-gray-400">Account</p>
        <Link to="/login"><p className="cursor-pointer transition-colors duration-300 hover:text-gray-400">Sign In</p></Link>
        <Link to="/login"><p className="cursor-pointer transition-colors duration-300 hover:text-gray-400">Sign Up</p></Link>
      </div>
    </div>
  );
};

export default Navbar;
