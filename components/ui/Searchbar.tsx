"use client";

import { ReactNode, useState, useEffect } from "react";
import Image from "next/image";
import voice from "../../public/iconvoice.svg";
import fliter from "../../public/iconfliter.svg";
import googlelens from "../../public/icongooglelens.svg";
import searchwhite from "../../public/iconsearchwhite.svg";
import searchbar from "../../public/searchbar.svg";
import PropertyFilterModal from "./PropertyFilterModal";
import Counteries from "./Counteries";
import magnifyingglass1 from "@/public/magnifyingglass1.svg";
import magnifyingglass2 from "@/public/magnifyingglass2.svg";
import magnifyingglass3 from "@/public/magnifyingglass3.svg";
import magnifyingglass4 from "@/public/magnifyingglass4.svg";
import magnifyingglass5 from "@/public/magnifyingglass5.svg";
import magnifyingglass6 from "@/public/magnifyingglass6.svg";
import magnifyingglass7 from "@/public/magnifyingglass7.svg";
import magnifyingglass8 from "@/public/magnifyingglass8.svg";

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
  const [currentImage, setCurrentImage] = useState(0);

  const images = [
    searchwhite,
    magnifyingglass1,
    magnifyingglass2,
    magnifyingglass3,
    magnifyingglass4,
    magnifyingglass5,
    magnifyingglass6,
    magnifyingglass7,
    magnifyingglass8,
  ];
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <PropertyFilterModal
        open={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
      />

      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 w-[85%] sm:w-[90%] max-w-6xl z-10">
        <div className="relative h-12 md:h-16 flex items-center rounded-xl bg-white/20 border border-white/30 shadow-lg overflow-visible pl-2">
          {/* Left icon */}
          <Tooltip text="States">
            <div
              onClick={() => setIsCountriesOpen(!isCountriesOpen)}
              className="relative flex items-center justify-center h-12 md:h-16 w-12 md:w-16 shrink-0 cursor-pointer"
            >
              <Image
                src={searchbar}
                alt="location"
                fill
                className="object-contain"
              />
            </div>
          </Tooltip>
          {isCountriesOpen && (
            <div className="fixed left-2/5 -translate-x-1/2 bottom-[-120%] w-[100%] max-w-[820px] bg-[#6b6b6b] rounded-xl p-2 z-[9999] shadow-2xl lg:ml-[-50px]">
              <Counteries />
            </div>
          )}

          {/* Input */}
          <input
            type="text"
            placeholder="Search suburb, postcode, state"
            className="flex-1 min-w-0 bg-transparent outline-none text-white placeholder:text-white/70 text-sm sm:text-base font-light tracking-wide px-3"
          />
          <div className="flex items-center gap-2  bg-white/80 rounded-r-[10px] pr-2 pl-2">
            {/* Right icons */}
            <div className="flex items-center h-full gap-2 shrink-0">
              {/* Filter */}
              <Tooltip text="Filters">
                <button
                  type="button"
                  onClick={() => setIsFilterModalOpen(true)}
                  className="relative h-12 md:h-16 w-10 md:w-14 shrink-0 opacity-90 hover:opacity-100 transition-opacity cursor-pointer"
                >
                  <Image
                    src={fliter}
                    alt="filter"
                    fill
                    className="object-contain"
                  />
                </button>
              </Tooltip>

              {/* Voice */}
              <div className="h-12 w-[2px] bg-white"></div>
              {/* <div className="h-8 w-px bg-[#FFFFF7]"></div> */}
              <Tooltip text="Microphone">
                <button className="-mx-2 relative h-12 md:h-13 w-10 md:w-14 shrink-0 opacity-90 hover:opacity-100 transition-opacity cursor-pointer">
                  <Image
                    src={voice}
                    alt="voice"
                    fill
                    className="object-contain"
                  />
                </button>
              </Tooltip>

              {/* Google Lens */}
              <div className="h-12 w-[2px] bg-white"></div>
              <Tooltip text="Camera">
                <button className="relative h-12 md:h-14 w-10 md:w-12 shrink-0 opacity-90 hover:opacity-100 transition-opacity cursor-pointer">
                  <Image
                    src={googlelens}
                    alt="lens"
                    fill
                    className="object-contain"
                  />
                </button>
              </Tooltip>

              {/* Search button — fills full height */}
              <div className="h-12 w-[2px] bg-white "></div>
              <Tooltip text="Search">
                <button className=" relative h-12 md:h-16 w-12 md:w-16 shrink-0 flex items-center justify-center transition-colors cursor-pointer ">
                  <Image
                    src={images[currentImage]}
                    alt="search"
                    fill
                    className="object-contain rounded-r-[10px]"
                  />
                </button>
              </Tooltip>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Searchbar;
