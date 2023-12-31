import { Link } from "react-router-dom";
import { GoKey } from "react-icons/go";
import { SlUser } from "react-icons/sl";
import { FaKey, FaUser } from "react-icons/fa6";
import React from "react";

function Login() {
  return (
    <div className="p-4">
      <div className="mb-2 hidden">Login</div>
      <div className="relative">
        <input
          className="w-full py-2 px-4 border border-gray-400 mb-2 rounded-full "
          type="text"
          placeholder="User name"
        />
        <div className="absolute text-gray-600 top-3 right-3 ">
          <SlUser /> <FaUser />
        </div>
      </div>
      <div className="relative">
        <input
          className="w-full py-2 px-4 border border-gray-400 mb-2 rounded-full "
          type="password"
          placeholder="password"
        />
        <div className="absolute text-gray-600 top-3 right-3 ">
          <GoKey /> <FaKey />
        </div>
      </div>

      <div className="flex justify-between items-center ">
        <h1 className="text-cyan-500 border-b">Sign Up</h1>
        <Link
          to="/analytics"
          className="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 shadow-lg shadow-cyan-500/50 font-medium rounded-full text-sm px-5 py-2.5 text-center"
        >
          Get started
        </Link>
      </div>
    </div>
  );
}

export default Login;
