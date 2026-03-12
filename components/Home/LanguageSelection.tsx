"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import indianflag from "../../public/India.svg";
import koreanflag from "../../public/koreanflag.svg";
import franceflag from "../../public/Franceflag.svg";
import chinaflag from "../../public/chinaflag.svg";
import israelflag from "../../public/israelflag.svg";
import world from "../../public/languageworld.svg";

const LanguageSelection = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [selectedLanguage, setSelectedLanguage] = useState<number | null>(null);
  const [hoveredLanguage, setHoveredLanguage] = useState<number | null>(null);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [isAtEnd, setIsAtEnd] = useState(false);

  const flags = [
    { name: "French", nativeName: "Français", icon: franceflag, code: "fr" },
    { name: "Chinese", nativeName: "中文", icon: chinaflag, code: "ch" },
    { name: "Hindi", nativeName: "हिन्दी", icon: indianflag, code: "hi" },
    { name: "Israeli", nativeName: "עברית", icon: israelflag, code: "is" },
    { name: "Korean", nativeName: "한국어", icon: koreanflag, code: "ko" },
  ];

  const languages = Array.from({ length: 30 }, (_, i) => ({
    id: i + 1,
    ...flags[i % flags.length],
  }));

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setScrollLeft(scrollLeft);
      setIsAtEnd(scrollLeft + clientWidth >= scrollWidth - 10);
    }
  };

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
      <div className="">
        <p className="text-black font-semibold text-xl">Language selection :</p>
      </div>

      <div className="relative group flex items-center gap-3">

        {/* World Globe Icon */}
        <div className="shrink-0">
          <Image src={world} alt="World" width={44} height={44} className="rounded-full" />
        </div>

        {/* Vertical Divider */}
        <div className="shrink-0 w-px h-8 bg-gray-300" />

        {/* Left Arrow — only show after scrolling right */}
        {scrollLeft > 10 && (
          <button
            onClick={() => scroll("left")}
            className="absolute left-14 top-1/2 -translate-y-1/2 z-10 bg-white hover:bg-gray-100 rounded-full p-2 shadow-lg transition-opacity duration-300"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-5 h-5 text-gray-800" />
          </button>
        )}

        {/* Scrollable Flags */}
        <div
          ref={scrollContainerRef}
          onScroll={handleScroll}
          className="flex items-center gap-3 overflow-x-auto scrollbar-hide scroll-smooth py-8 flex-1"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {languages.map((lang, index) => (
            <div
              key={lang.id}
              className="relative shrink-0 flex flex-col items-center"
              onMouseEnter={() => setHoveredLanguage(lang.id)}
              onMouseLeave={() => setHoveredLanguage(null)}
            >
              {/* Tooltip */}
              {hoveredLanguage === lang.id && (
                <div
                  className="absolute -top-8 z-50 pointer-events-none"
                  style={{
                    left: index < 2 ? "0" : index > languages.length - 3 ? "auto" : "50%",
                    right: index > languages.length - 3 ? "0" : "auto",
                    transform: index < 2 || index > languages.length - 3 ? "none" : "translateX(-50%)",
                  }}
                >
                  <div className="bg-gray-900 text-white text-xs font-medium px-2 py-1 rounded-lg whitespace-nowrap">
                    {lang.name} / {lang.nativeName}
                  </div>
                  <div
                    className="w-3 h-3 bg-gray-900 rotate-45 -mt-1.5"
                    style={{
                      marginLeft: index < 2 ? "14px" : index > languages.length - 3 ? "auto" : "auto",
                      marginRight: index > languages.length - 3 ? "14px" : "auto",
                      display: "block",
                    }}
                  />
                </div>
              )}

              {/* Flag Button */}
              <button
                onClick={() => setSelectedLanguage(lang.id)}
                className={`hover:scale-110 transition-transform duration-200 rounded-full cursor-pointer
                  ${selectedLanguage === lang.id ? "ring-2 ring-blue-500 ring-offset-2" : ""}`}
                title={lang.name}
              >
                <Image
                  src={lang.icon}
                  alt={lang.name}
                  width={44}
                  height={44}
                  className="rounded-full"
                />
              </button>
            </div>
          ))}
        </div>

        {/* Right Arrow — only show when not at the end */}
        {!isAtEnd && (
          <button
            onClick={() => scroll("right")}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white hover:bg-gray-100 rounded-full p-2 shadow-lg transition-opacity duration-300 -mr-4"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-5 h-5 text-gray-800" />
          </button>
        )}

      </div>
    </div>
  );
};

export default LanguageSelection;