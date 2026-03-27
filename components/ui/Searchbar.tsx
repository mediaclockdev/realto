"use client";

import { ReactNode, useState } from "react";
import Image from "next/image";
import voice from "../../public/iconvoice.svg";
import fliter from "../../public/iconfliter.svg";
import googlelens from "../../public/icongooglelens.svg";
import searchwhite from "../../public/iconsearchwhite.svg";
import searchbar from "../../public/searchbar.svg";
import PropertyFilterModal from "./PropertyFilterModal";
import Counteries from "./Counteries";

type TooltipProps = {
  text: string;
  children: ReactNode;
};

const Tooltip = ({ text, children }: TooltipProps) => {
  return (
    <div className="relative group flex items-center justify-center">
      {children}

      <span
        className="absolute bottom-full mb-2 whitespace-nowrap 
      scale-0 group-hover:scale-100 transition-transform duration-200
      bg-black text-white text-xs rounded px-2 py-1 shadow-lg"
      >
        {text}
      </span>
    </div>
  );
};
const Searchbar = () => {
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [isCountriesOpen, setIsCountriesOpen] = useState(false);

  return (
    <>
      <PropertyFilterModal
        open={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
      />

      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 w-[85%] sm:w-[80%] max-w-4xl z-10">
        <div className="relative flex items-center rounded-xl backdrop-blur-xs bg-white/50 border border-white/30 shadow-lg overflow-visible">
          {/* Left icon */}
          <Tooltip text="Countries">
            <div
              onClick={() => {
                console.log("clicked");
                setIsCountriesOpen(!isCountriesOpen);
              }}
              className="flex items-center justify-center  rounded-xl p-0.5 shrink-0 mt-1 ml-1.5 cursor-pointer"
            >
              <Image
                src={searchbar}
                alt="location"
                width={44}
                height={44}
                className="w-9 h-9 md:w-11 md:h-11"
              />
            </div>
          </Tooltip>
          {isCountriesOpen && (
            <div className="fixed left-1/2 -translate-x-1/2 bottom-[110%] w-[100%] max-w-3xl bg-[#6b6b6b] rounded-xl p-2 z-[9999] shadow-2xl lg:ml-[-50px]">
              <Counteries />
            </div>
          )}

          {/* Input */}
          <input
            type="text"
            placeholder="Search suburb, postcode, state"
            className="flex-1 min-w-0 bg-transparent outline-none text-white placeholder:text-white/70 text-sm sm:text-base font-light tracking-wide px-3"
          />

          {/* Right icons */}
          <div className="flex items-center gap-3 sm:gap-4 shrink-0 px-3">
            {/* Filter */}
            <Tooltip text="Filters">
              <button
                type="button"
                onClick={() => setIsFilterModalOpen(true)}
                className="flex items-center justify-center opacity-90 hover:opacity-100 transition-opacity cursor-pointer"
              >
                <Image
                  src={fliter}
                  alt="filter"
                  width={44}
                  height={44}
                  className="w-6 h-6 md:w-11 md:h-11"
                />
              </button>
            </Tooltip>

            {/* Voice */}
            <Tooltip text="Microphone">
              <button className="flex items-center justify-center opacity-90 hover:opacity-100 transition-opacity cursor-pointer">
                <Image
                  src={voice}
                  alt="voice"
                  width={40}
                  height={40}
                  className="w-6 h-6 md:w-10 md:h-10"
                />
              </button>
            </Tooltip>

            {/* Google Lens */}
            <Tooltip text="Camera">
              <button className="flex items-center justify-center opacity-90 hover:opacity-100 transition-opacity cursor-pointer">
                <Image
                  src={googlelens}
                  alt="lens"
                  width={40}
                  height={40}
                  className="w-6 h-6 md:w-10 md:h-10"
                />
              </button>
            </Tooltip>
          </div>

          {/* Search button — fills full height */}
          <Tooltip text="Search">
            <button className="flex items-center justify-center bg-white/50 hover:bg-white/40 transition-colors cursor-pointer  self-stretch  py-1 lg:py-0  lg:pl-1 rounded-r-[10px]">
              <Image
                src={searchwhite}
                alt="search"
                width={56}
                height={56}
                className="lg:w-14 h-10 lg:h-14"
              />
            </button>
          </Tooltip>
        </div>
      </div>
    </>
  );
};

export default Searchbar;
