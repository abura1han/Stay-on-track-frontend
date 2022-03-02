import React, { useState } from "react";
import Logo from "../Logo.svg";
import GoogleLoginBtn from "./GoogleLoginBtn";

const HomeHeader = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);

  // Handle small device navigation
  const handleSmallDeviceNavigation = () => setIsNavOpen(!isNavOpen);

  return (
    <header>
      <nav className="flex justify-between w-full">
        <div className="flex justify-between w-full sm:w-auto">
          {/* Small device navigation */}
          <div className="items-center flex flex-1 sm:flex-none md:hidden">
            <button onClick={handleSmallDeviceNavigation}>
              <span className="material-icons-outlined">menu</span>
            </button>
            {isNavOpen && (
              <ul className="block absolute left-0 top-20 w-full pl-5 pr-2 py-4 bg-gray-400">
                <li className="block w-full font-medium text-base text-gray-50 my-2">
                  <a href="#features">Features</a>
                </li>
                <li className="block w-full font-medium text-base text-gray-50 my-2">
                  <a href="#Guides-dn-tutorials">Guides {"&"} tutorials</a>
                </li>
                <li className="block w-full font-medium text-base text-gray-50 my-2">
                  <a href="#blog">Blog</a>
                </li>
                <li className="block w-full font-medium text-base text-gray-50 my-2">
                  <a href="#contact-us">Contact us</a>
                </li>

                {/* Login and signup button for extra small devices like samsung galaxy fold */}
                <li className="block w-full font-medium text-base text-gray-50 my-2 mt-5">
                  <GoogleLoginBtn label={"Get started"} />{" "}
                </li>
              </ul>
            )}
          </div>

          {/* Site branding */}
          <div className="md:ml-0 ml-5">
            <img src={Logo} alt="Stay on track" className="w-10 sm:w-14" />
          </div>

          {/*
           * Site navigation
           * Large device navigation
           */}
          <div className="items-center hidden md:flex">
            <ul className="flex">
              <li className="font-medium text-base text-gray-700 mx-4">
                <a href="#features">Features</a>
              </li>
              <li className="font-medium text-base text-gray-700 mx-4">
                <a href="#guides-nd-tutorials">Guides {"&"} tutorials</a>
              </li>
              <li className="font-medium text-base text-gray-700 mx-4">
                <a href="#blog">Blog</a>
              </li>
              <li className="font-medium text-base text-gray-700 mx-4">
                <a href="#contact-us">Contact us</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Hide on extra small devices */}
        <div className="hidden flex-wrap items-center sm:flex">
          <GoogleLoginBtn label={"Get started"} />
        </div>
      </nav>
    </header>
  );
};

export default HomeHeader;
