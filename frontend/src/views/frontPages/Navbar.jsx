/* eslint-disable prettier/prettier */
import { useState } from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import { ImCross } from "react-icons/im";
import logo from "../../assets/images/Logo-1.png.webp";

import React from 'react';

const Navbar = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <nav className="bg-gray-900 bg-opacity-85 py-4 px-2 ">
      <div className="lg:container mx-auto px-3 flex justify-between items-center">
        <div className="text-white ">
          <img src={logo} alt="logo" />
        </div>
        {/* Add SEO consultation button */}
        {/* Conditional rendering for button based on screen size */}
        <span className="flex justify-center items-center gap-9 max-lg:gap-4">

        <div className=" max-lg:hidden flex space-x-12 gap-3    text-white text-2xl font-semibold">
          {/* Show menu items only on medium and larger screens */}
            <Link to="/" className="text-white hover:text-yellow-500">
              Home
            </Link>
            <Link to="/about" className="text-white hover:text-yellow-500">
              About Us
            </Link>
            {/* <Link to="/services" className="text-white hover:text-yellow-500">
              Services
            </Link> */}
            <Link to="/contact" className="text-white hover:text-yellow-500">
              Contact
            </Link>
        
        </div>
          <button
            type="button"
            className="text-white justify-end flex bg-gradient-to-r from-[#8253ff] to-[#6a98ff] hover:bg-gradient-to-br hover:from-[#6d4bd6] hover:to-[#6d4bd6] focus:ring-4 focus:ring-opacity-0 focus:outline-none outline-none border-none shadow-lg hover:shadow-purple-300/40 dark:shadow-lg font-medium rounded-3xl text-lg px-5 py-3 text-center max-xsm:hidden "
          >
            <span className="md:hidden ">Call Now</span>
            <span className="hidden md:block">Free SEO Consultation</span>
          </button>

          <div className="block lg:hidden">
            {/* Hamburger menu button */}
            <button
              onClick={toggleDrawer}
              type="button"
              className="text-white focus:outline-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            </button>
          </div>
        </span>
      </div>
      {/* Drawer for small screens */}
      <div
        className={`fixed lg:hidden top-0 left-0 w-full h-full bg-gray-900 bg-opacity-90 flex justify-center items-center z-50  ${
          isDrawerOpen ? "block" : "hidden"
        }`}
      >
        <div className="w-full md:w-3/4 bg-gray-900  p-4 h-screen  shadow-lg md:shadow-none">
          <button
            onClick={() => setIsDrawerOpen(false)}
            className=" top-4 relative left-[95%] right-2 text-gray-300 focus:outline-none"
          >
            <ImCross size={25} />
          </button>
          {/* Render menu items in the drawer */}
          <div className="flex flex-col gap-5 text-2xl py-2 space-y-2 p-3  font-extrabold  ">
            <Link to="/" className="text-white hover:text-yellow-500" onClick={() => setIsDrawerOpen(false)}>
              Home
            </Link>
            <Link to="/about" className="text-white hover:text-yellow-500" onClick={() => setIsDrawerOpen(false)}>
              About Us
            </Link>
            {/* <Link to="/services" className="text-white hover:text-yellow-500">
              Services
            </Link> */}
            <Link to="/contact" className="text-white hover:text-yellow-500" onClick={() => setIsDrawerOpen(false)}>
              Contact
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
