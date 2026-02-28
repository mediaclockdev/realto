import Image from "next/image";
import React from "react";
import herobg from "../../public/herobg.jpg";
import voice from "../../public/iconvoice.svg";
import fliter from "../../public/iconfliter.svg";
import googlelens from "../../public/icongooglelens.svg";
import searchwhite from "../../public/iconsearchwhite.svg";

const Hero = () => {
  return (
    <div className="relative w-full h-screen min-h-[600px] ">
      {/* Background Image — fills the entire container */}
      <Image
        src={herobg}
        alt="hero background"
        fill
        priority
        className="object-cover object-center"
      />

      {/* Gradient overlay for bottom readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/55 pointer-events-none" />

      {/* Search Bar — bottom center */}
      <div className="absolute bottom-16 sm:bottom-20 left-1/2 -translate-x-1/2 w-[92%] sm:w-[75%] lg:w-[62%] max-w-4xl z-10">
        <div className="flex items-center rounded-2xl overflow-hidden backdrop-blur-sm bg-white/25 shadow-xl border border-white/30">
          {/* For Sale dropdown */}
          <button className="px-4 sm:px-5 py-3 sm:py-3.5 bg-black/40 text-white font-semibold text-sm sm:text-base flex items-center gap-1.5 shrink-0 transition-colors">
            <span>For Sale</span>
            <svg
              className="w-3.5 h-3.5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>

          {/* Search input */}
          <input
            type="text"
            placeholder="Lorem ipsum viverra gravida vitae"
            className="flex-1 bg-transparent outline-none text-white placeholder-white/60 text-sm sm:text-base px-3 sm:px-4 py-3 min-w-0"
          />

          {/* Right icons */}
          <div className="flex items-center gap-2 sm:gap-3 px-3 sm:px-4 shrink-0">
            <button className="p-1 hover:opacity-70 transition-opacity">
              <Image
                src={fliter}
                alt="filter"
                width={22}
                height={22}
                className="w-5 h-5 sm:w-6 sm:h-6"
              />
            </button>
            <button className="p-1 hover:opacity-70 transition-opacity">
              <Image
                src={voice}
                alt="voice search"
                width={22}
                height={22}
                className="w-5 h-5 sm:w-6 sm:h-6"
              />
            </button>
            {/* Hidden on mobile to save space */}
            <button className="p-1 hover:opacity-70 transition-opacity hidden sm:block">
              <Image
                src={googlelens}
                alt="google lens"
                width={22}
                height={22}
                className="w-5 h-5 sm:w-6 sm:h-6"
              />
            </button>
            {/* Search submit button */}
            <button className=" transition-colors p-2 rounded-xl ml-1">
              <Image
                src={searchwhite}
                alt="search"
                width={18}
                height={18}
                className="w-4 h-4 sm:w-5 sm:h-5"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
