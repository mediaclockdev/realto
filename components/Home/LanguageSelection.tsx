"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import indianflag from "../../public/India.svg";
import koreanflag from "../../public/koreanflag.svg";
import  franceflag from "../../public/Franceflag.svg";
import chinaflag from "../../public/chinaflag.svg";
import israelflag from "../../public/israelflag.svg";

const LanguageSelection = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [selectedLanguage, setSelectedLanguage] = useState<number | null>(null);

 const flags = [
  { name: "Hindi", icon: indianflag, code: "hi" },
  { name: "french", icon:franceflag , code: "fr" },
  { name: "korean", icon:koreanflag , code: "ko" },
  { name: "china", icon:chinaflag , code: "ch" },
  { name: "israel", icon:israelflag , code: "is" },
];

const languages = Array.from({ length: 30 }, (_, i) => ({
  id: i + 1,
  ...flags[i % flags.length], // rotate between flags
}));

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 300;
      const newScrollPosition =
        direction === "left"
          ? scrollContainerRef.current.scrollLeft - scrollAmount
          : scrollContainerRef.current.scrollLeft + scrollAmount;

      scrollContainerRef.current.scrollTo({
        left: newScrollPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="max-w-screen-2xl mx-auto px-5 py-5">
      <div className="mb-4">
        <p className="text-black font-medium">Language selection :</p>
      </div>

      <div className="relative group">
        {/* Left Arrow Button */}
        <button
          onClick={() => scroll("left")}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white hover:bg-gray-100 rounded-full p-2 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 -ml-4"
          aria-label="Scroll left"
        >
          <ChevronLeft className="w-5 h-5 text-gray-800" />
        </button>

        {/* Scrollable Container */}
        <div
          ref={scrollContainerRef}
          className="flex items-center gap-5 overflow-x-auto scrollbar-hide scroll-smooth py-2"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {languages.map((lang) => (
            <button
              key={lang.id}
              onClick={() => setSelectedLanguage(lang.id)}
              className={`shrink-0 hover:scale-110 transition-transform duration-200 rounded-full p-1 cursor-pointer
                ${selectedLanguage === lang.id ? "ring-2 ring-blue-500 ring-offset-2" : ""}`}
              title={lang.name}
            >
              <Image
                src={lang.icon}
                alt={lang.name}
                width={40}
                height={40}
                className="rounded-full"
              />
            </button>
          ))}
        </div>

        {/* Right Arrow Button */}
        <button
          onClick={() => scroll("right")}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white hover:bg-gray-100 rounded-full p-2 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 -mr-4"
          aria-label="Scroll right"
        >
          <ChevronRight className="w-5 h-5 text-gray-800" />
        </button>
      </div>
    </div>
  );
};

export default LanguageSelection;
