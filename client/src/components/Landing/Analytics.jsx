import React from "react";
import Laptop from "../../assets/laptop.jpg";
import TextButton from "./TextButton";
import { Link } from "react-router-dom";

const Analytics = () => {
  return (
    <div className="w-full bg-white px-4 py-6">
      <div className="mx-auto grid max-w-screen-xl md:grid-cols-2">
        <img className="mx-auto my-4 w-[500px] rounded-full" src={Laptop} alt="/" />
        <div className="flex flex-col items-start justify-center">
          <p className="font-bold uppercase text-emerald-400">
          AYUSH STARTUP REGISTRATION
          </p>
          <h1 className="mt-2 text-2xl font-bold text-black sm:text-3xl md:text-4xl">
          Manage Your AYUSH Startup Registration Centrally
          </h1>
          <p className="mt-2 text-black">
          Streamline your AYUSH startup's registration process with our centralized platform. Ensure compliance, save time, and focus on growing your business.
          </p>
          <div className="self-center">
            <Link to="/register"><TextButton text="Start Registration" type="primary" /></Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
