import React from "react";
import { Link } from "react-router-dom";
import Login from "../components/Login";

const About = () => {
  return (
    <div className="w-full md:max-w-[600px] mt-32 mx-4 min-h-[calc(100vh-250px)] bg-gray-50 rounded-2xl rounded-tl-[80px] rounded-br-[40px]">
      <div className="text-base px-8 md:px-24">
        <h1 className="h-16 md:h-32"></h1>
        <h1 className="text-4xl text-gray-300 mb-3">
          Manage your <span className="text-cyan-600">Expenses</span> more
          easily
        </h1>
        <p className=" text-gray-500 text-sm mb-6">
          Get complete control over your expenses and save as mush as you want.
        </p>
        <Login />
        <Link
          to="/analytics"
          className="hidden text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 shadow-lg shadow-cyan-500/50 font-medium rounded text-sm px-5 py-2.5 text-center mr-2 mb-2"
        >
          Get started
        </Link>
      </div>
    </div>
  );
};

export default About;
