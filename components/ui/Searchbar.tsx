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

      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 w-[85%] sm:w-[90%] max-w-6xl z-10">
        <div className="relative h-12 md:h-16 flex items-center rounded-xl bg-white/20 border border-white/30 shadow-lg overflow-visible">
          {/* Left icon */}
          <Tooltip text="States">
            <div
              onClick={() => {
                console.log("clicked");
                setIsCountriesOpen(!isCountriesOpen);
              }}
              className="flex items-center justify-center  h-full  rounded-xl shrink-0 ml-0.5 cursor-pointer"
            >
              <Image
                src={searchbar}
                alt="location"
                className="h-[60%] w-auto"
              />
            </div>
          </Tooltip>
          {isCountriesOpen && (
            <div className="fixed left-2/5 -translate-x-1/2 bottom-[110%] w-[100%] max-w-[820px] bg-[#6b6b6b] rounded-xl p-2 z-[9999] shadow-2xl lg:ml-[-50px]">
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
          <div className="flex items-center h-full gap-0 shrink-0">
            {/* Filter */}
            <Tooltip text="Filters">
              <button
                type="button"
                onClick={() => setIsFilterModalOpen(true)}
                className="flex h-full items-center justify-center opacity-90 hover:opacity-100 transition-opacity cursor-pointer"
              >
                <Image src={fliter} alt="filter" className="h-[60%] w-auto" />
              </button>
            </Tooltip>

            {/* Voice */}
            <Tooltip text="Microphone">
              <button className="h-full flex items-center justify-center opacity-90 hover:opacity-100 transition-opacity cursor-pointer">
                <Image src={voice} alt="voice" className="h-[60%] w-auto" />
              </button>
            </Tooltip>

            {/* Google Lens */}
            <Tooltip text="Camera">
              <button className="h-full flex items-center justify-center opacity-90 hover:opacity-100 transition-opacity cursor-pointer">
                <Image src={googlelens} alt="lens" className="h-[60%] w-auto" />
              </button>
            </Tooltip>
          </div>

          {/* Search button — fills full height */}
          <Tooltip text="Search">
            <button className="h-full flex items-center justify-center bg-white/50 hover:bg-white/40 transition-colors cursor-pointer  self-stretch  py-1 lg:py-0  lg:pl-1 rounded-r-[10px]">
              <Image src={searchwhite} alt="search" className="h-full w-auto" />
            </button>
          </Tooltip>
        </div>
      </div>
    </>
  );
};

export default Searchbar;
