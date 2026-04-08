"use client";

import React, { useState } from "react";
import Image from "next/image";
import locationIcon from "../../public/location.svg";
import calendarIcon from "../../public/calender.svg";
import searchIcon from "../../public/iconsearchwhite.svg";
import Counteries from "./Counteries";

const SearchBarHotel = () => {
  const [isCountriesOpen, setIsCountriesOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  return (
    <>
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 w-[95%] sm:w-[85%] md:w-[70%] max-w-[800px] z-10">
        {/* Main Bar */}
        <div
          className="flex flex-wrap items-center gap-3 md:gap-5 px-3 py-2 rounded-[10px]
        bg-[#FFFFFF80]  backdrop-blur-sm border border-white/30 
        shadow-[0_8px_30px_rgba(0,0,0,0.15)]"
        >
          {/* Left Section */}
          <div className="flex items-center gap-2 text-black flex-wrap">
            {/* Location */}
            <div
              onClick={() => setIsCountriesOpen(!isCountriesOpen)}
              className="flex items-center gap-1 cursor-pointer"
            >
              <Image src={locationIcon} alt="location" width={22} height={22} />
              <p className="text-xs lg:text-base font-normal font-poppins">
                Where are you going?
              </p>
            </div>

            {/* Dates */}
            <div
              onClick={() => setIsFilterOpen(true)}
              className="flex items-center gap-1 cursor-pointer"
            >
              <Image src={calendarIcon} alt="calendar" width={22} height={22} />
              <p className="text-xs lg:text-base font-normal font-poppins">
                Check in – Check out
              </p>
            </div>

            <span className="hidden md:block text-gray-600">•</span>

            {/* Guests */}
            <p
              onClick={() => setIsFilterOpen(true)}
              className="text-xs lg:text-base font-normal font-poppins"
            >
              2 Adults
            </p>

            <span className="hidden md:block text-gray-600">•</span>

            <p className="text-xs lg:text-base font-normal font-poppins">
              0 Children
            </p>

            <span className="hidden md:block text-gray-600">•</span>

            <p className="text-xs lg:text-base font-normal font-poppins">
              1 Room
            </p>
          </div>

          {/* Search Button */}
          <button className="w-16 h-12 hover:scale-105 transition ">
            <Image src={searchIcon} alt="search" width={42} height={42} />
          </button>
        </div>

        {/* Countries Dropdown */}
        {isCountriesOpen && (
          <div className="absolute left-1/2 -translate-x-1/2 bottom-[110%] w-full max-w-3xl bg-white rounded-xl p-3 shadow-2xl">
            <Counteries />
          </div>
        )}
      </div>
    </>
  );
};

export default SearchBarHotel;
