import React, { useState } from "react";
import { Link } from "react-router-dom";
import { BsGraphUpArrow } from "react-icons/bs";
import { AiOutlineArrowDown, AiOutlineArrowUp } from "react-icons/ai";
import { PiHouseSimpleLight } from "react-icons/pi";
import { TfiLayoutAccordionList } from "react-icons/tfi";

const Navbar = () => {
  const [navbar, setNavbar] = useState(false);

  return (
    <div className="w-full">
      <nav className="w-full px-3 pt-4 m-auto lg:w-[768px] flex justify-between items-center bg-transparent">
        <button
          onClick={() => setNavbar(!navbar)}
          className="z-50XX w-16 h-16 text-purple-700 bg-gray-50 rounded-full active:bg-none active:bg-transparent active:animate-ping focus:outline-none flex justify-center items-center shadow-lg shadow-purple-300"
        >
          {navbar ? (
            <AiOutlineArrowDown className="text-3xl" />
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
          to="/formulario"
          className="w-16 h-16 text-purple-700 bg-gray-50 text-2xl rounded-full uppercase font-medium flex shadow-lg shadow-purple-300"
        >
          <span className="active:animate-ping m-auto">$</span>
        </Link>
      </nav>
      {/** FONDO NEGRO */}
      <div
        className={`fixed z-40 top-0 w-full h-screen bg-gray-500/50 ${
          navbar
            ? " opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        {" "}
      </div>
      {/** MENU  */}
      <ul
        className={`fixed z-50 text-purple-300 bg-[#222222ee] w-full min-hHH-[400px] transform transition-all duration-1000 flex flex-col rounded-b-[20px] text-center
        ${
          navbar
            ? " opacity-100 pointer-events-auto top-0"
            : "opacity-0 pointer-events-none -top-80"
        }`}
      >
        {/** TITLE */}
        <li className="col-span-2 border-b py-9 border-gray-700 text-center">
          <span className="tracking-wider font-medium">Expenses & Income</span>
        </li>
        {/** LIST */}
        <div className="lg:w-[768px] lg:m-auto text-gray-100 px-4 py-8 lg:py-16 grid grid-cols-3 lg:grid-cols-4 gap-4">
          <li className="w-full rounded-lg bg-gradient-to-r from-purple-400 to-purple-600 hover:font-bold">
            <Link
              to="/about"
              className="h-20 flex flex-col justify-between items-center text-4xl pt-3 pb-1 "
              onClick={() => setNavbar(!navbar)}
            >
              <PiHouseSimpleLight />
              <p className="text-sm">About</p>
            </Link>
          </li>

          <li className="w-full rounded-lg bg-gradient-to-r from-green-400 to-green-600 hover:font-bold">
            <Link
              to="/analytics"
              className="h-20 flex flex-col justify-between items-center text-3xl pt-3 pb-1 "
              onClick={() => setNavbar(!navbar)}
            >
              <BsGraphUpArrow />
              <h1 className="text-sm">Analytics</h1>
            </Link>
          </li>
          <li className="w-full rounded-lg bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 hover:font-bold">
            <Link
              to="/formulario"
              className="h-20 flex flex-col justify-between items-center text-3xl pt-3 pb-1 "
              onClick={() => setNavbar(!navbar)}
            >
              <div className="border-2 rounded-full w-8 h-8 text-xl flex justify-center items-center">
                $
              </div>
              <h1 className="text-sm">Add New</h1>
            </Link>
          </li>
          <li className="w-full rounded-lg bg-gradient-to-r from-blue-400 to-cyan-600 hover:font-bold">
            <Link
              to="/transactions"
              className="h-20 flex flex-col justify-between items-center text-3xl pt-3 pb-1"
              onClick={() => setNavbar(!navbar)}
            >
              <TfiLayoutAccordionList />
              <h1 className="text-sm">Transactions</h1>
            </Link>
          </li>
        </div>
        {/** BOTON CERRAR */}
        <li className="mb-6 lg:mb-12 flex justify-center">
          <button
            onClick={() => setNavbar(!navbar)}
            className="w-12 h-12 text-purple-300 rounded-full active:bg-none active:bg-transparent active:animate-ping focus:outline-none flex justify-center items-center shadow-lg shadow-purple-300"
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
              <AiOutlineArrowUp className="text-2xl" />
            )}
          </button>
        </li>
        <p className="w-8 border-t-2 animate__animated animate__bounceInRight animate__slower animate__infinite"></p>
        <li className="py-9 text-gray-200 text-xs border-t border-gray-700 text-center">
          Copyright <span className="font-numero font-light">@ 2023</span> Inc.
          All rights reserved.{" "}
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
