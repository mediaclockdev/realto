"use client"

import { useState } from "react";
import Image from "next/image";
import voice from "../../public/iconvoice.svg";
import fliter from "../../public/iconfliter.svg";
import googlelens from "../../public/icongooglelens.svg";
import searchwhite from "../../public/iconsearchwhite.svg";
import searchbar from "../../public/searchbar.svg";
import PropertyFilterModal from "./PropertyFilterModal";

const Searchbar = () => {
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

  return (
    <>
      <PropertyFilterModal
        open={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
      />

      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 w-[85%] sm:w-[80%] max-w-4xl z-10">
        <div className="flex items-stretch rounded-xl backdrop-blur-xs bg-white/50 border border-white/30 shadow-lg overflow-hidden">

          {/* Left icon */}
          <div className="flex items-center justify-center bg-white/50 rounded-xl p-0.5 shrink-0 my-1.5 ml-1.5">
            <Image
              src={searchbar}
              alt="location"
              width={44}
              height={44}
              className="w-10 h-10 md:w-11 md:h-11"
            />
          </div>

          {/* Input */}
          <input
            type="text"
            placeholder="Search suburb, postcode, state"
            className="flex-1 min-w-0 bg-transparent outline-none text-white placeholder:text-white/70 text-sm sm:text-base font-light tracking-wide px-3"
          />

          {/* Right icons */}
          <div className="flex items-center gap-3 sm:gap-4 shrink-0 px-3">

            {/* Filter */}
            <button
              type="button"
              onClick={() => setIsFilterModalOpen(true)}
              className="flex items-center justify-center opacity-90 hover:opacity-100 transition-opacity cursor-pointer"
            >
              <Image
                src={fliter}
                alt="filter"
                width={26}
                height={26}
                className="w-6 h-6 md:w-7 md:h-7"
              />
            </button>

            {/* Voice */}
            <button className="flex items-center justify-center opacity-90 hover:opacity-100 transition-opacity cursor-pointer">
              <Image
                src={voice}
                alt="voice"
                width={26}
                height={26}
                className="w-6 h-6 md:w-7 md:h-7"
              />
            </button>

            {/* Google Lens */}
            <button className="flex items-center justify-center opacity-90 hover:opacity-100 transition-opacity cursor-pointer">
              <Image
                src={googlelens}
                alt="lens"
                width={26}
                height={26}
                className="w-6 h-6 md:w-7 md:h-7"
              />
            </button>
          </div>

          {/* Search button — fills full height */}
          <button className="flex items-center justify-center bg-white/50 hover:bg-white/40 transition-colors cursor-pointer  self-stretch pl-1">
            <Image
              src={searchwhite}
              alt="search"
              width={56}
              height={56}
              className="w-14 h-14"
            />
          </button>

        </div>
      </div>
    </>
  );
};

export default Searchbar;