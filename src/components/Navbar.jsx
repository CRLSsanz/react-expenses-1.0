import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [navbar, setNavbar] = useState(false);

  return (
    <div className="w-full">
      <nav className="w-full p-4 lg:px-24 flex justify-between items-center bg-transparent">
        <button
          onClick={() => setNavbar(!navbar)}
          className="w-16 h-16 text-purple-600 bg-gray-50 rounded-full active:bg-none active:bg-transparent active:animate-ping focus:outline-none flex justify-center items-center shadow-lg shadow-purple-500"
        >
          {navbar ? (
            <svg
              width="30px"
              viewBox="0 0 24 24"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M19.207 6.207a1 1 0 0 0-1.414-1.414L12 10.586 6.207 4.793a1 1 0 0 0-1.414 1.414L10.586 12l-5.793 5.793a1 1 0 1 0 1.414 1.414L12 13.414l5.793 5.793a1 1 0 0 0 1.414-1.414L13.414 12l5.793-5.793z" />
            </svg>
          ) : (
            <svg
              width="30px"
              viewBox="0 0 24 24"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
              transform="matrix(1, 0, 0, 1, 0, 0)"
            >
              <path d="M2 5.99519C2 5.44556 2.44556 5 2.99519 5H11.0048C11.5544 5 12 5.44556 12 5.99519C12 6.54482 11.5544 6.99039 11.0048 6.99039H2.99519C2.44556 6.99039 2 6.54482 2 5.99519Z" />
              <path d="M2 11.9998C2 11.4501 2.44556 11.0046 2.99519 11.0046H21.0048C21.5544 11.0046 22 11.4501 22 11.9998C22 12.5494 21.5544 12.9949 21.0048 12.9949H2.99519C2.44556 12.9949 2 12.5494 2 11.9998Z" />
              <path d="M2.99519 17.0096C2.44556 17.0096 2 17.4552 2 18.0048C2 18.5544 2.44556 19 2.99519 19H15.0048C15.5544 19 16 18.5544 16 18.0048C16 17.4552 15.5544 17.0096 15.0048 17.0096H2.99519Z" />
            </svg>
          )}
        </button>
        <Link
          to="/expenses/formulario"
          className="w-16 h-16 text-purple-600 bg-gray-50 text-2xl rounded-full uppercase font-semibold flex shadow-lg shadow-purple-500"
        >
          <span className="m-auto">$</span>
        </Link>
      </nav>
      <ul
        className={`fixed z-50 flex flex-col justify-center text-center text-purple-300 bg-[#222222f5] top-0 w-[calc(100%-100px)] sm:w-[500px] h-[calc(100%-100px)] lg:h-[calc(100%-56px)] transform transition-all duration-1000 px-8 sm:px-12 lg:px-24
        ${
          navbar
            ? " opacity-100 pointer-events-auto right-0"
            : "opacity-0 pointer-events-none -right-80"
        }`}
      >
        <li className="">
          <span className="uppercase tracking-widest "> Navigation</span>
        </li>
        <br />
        <li className="w-full py-2 hover:font-bold ">
          <Link to="/expenses/" onClick={() => setNavbar(!navbar)}>
            Home
          </Link>
        </li>
        <li className="w-full border-t border-gray-500 py-4 hover:font-bold ">
          <Link to="/expenses/about" onClick={() => setNavbar(!navbar)}>
            About
          </Link>
        </li>
        <li className="w-full border-t border-gray-500 py-4 hover:font-bold ">
          <Link to="/expenses/analytics" onClick={() => setNavbar(!navbar)}>
            Analytics
          </Link>
        </li>
        <li className="w-full border-t border-gray-500 py-4 hover:font-bold ">
          <Link to="/expenses/formulario" onClick={() => setNavbar(!navbar)}>
            Formulario
          </Link>
        </li>
        <li className="w-full border-t border-gray-500 py-4 hover:font-bold ">
          <Link to="/expenses/transactions" onClick={() => setNavbar(!navbar)}>
            Transactions
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
