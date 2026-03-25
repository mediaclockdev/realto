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
import greek from "../../public/greek.svg";
import pakistan from "../../public/pakistan.svg";
import serbia from "../../public/serbia.svg";
import Iran from "../../public/iranflag.svg";
import bangladesh from "../../public/bangladesh.svg";
import indonesia from "../../public/indonesianflag.svg";
import malasyia from "../../public/malasyianflag.svg";
import samoan from "../../public/samoan.svg";

const LanguageSelection = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [selectedLanguage, setSelectedLanguage] = useState<number | null>(null);
  const [tooltipInfo, setTooltipInfo] = useState<{
    name: string;
    nativeName: string;
    rect: DOMRect;
  } | null>(null);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [isAtEnd, setIsAtEnd] = useState(false);

  const flags = [
    { name: "French", nativeName: "Français", icon: franceflag, code: "fr" },
    { name: "Chinese", nativeName: "中文", icon: chinaflag, code: "ch" },
    { name: "Hindi", nativeName: "हिन्दी", icon: indianflag, code: "hi" },
    { name: "Israeli", nativeName: "עברית", icon: israelflag, code: "is" },
    { name: "Korean", nativeName: "한국어", icon: koreanflag, code: "ko" },
    { name: "Greek", nativeName: "Ελληνικά", icon: greek, code: "gr" },
    { name: "Urdu", nativeName: "اردو", icon: pakistan, code: "ur" },
    { name: "Serbia", nativeName: "Српски", icon: serbia, code: "sr" },
    { name: "Persian(Farsi)", nativeName: "فارسی", icon: Iran, code: "fa" },
    { name: "Bengali", nativeName: "বাংলা", icon: bangladesh, code: "bn" },
    {
      name: "Indonesian",
      nativeName: "Bahasa Indonesia",
      icon: indonesia,
      code: "id",
    },
    {
      name: "Malaysian",
      nativeName: "Bahasa Malaysia",
      icon: malasyia,
      code: "ms",
    },
    { name: "Samoan", nativeName: "Samoan", icon: samoan, code: "sm" },
  ];

  const languages = Array.from({ length: 30 }, (_, i) => ({
    id: i + 1,
    ...flags[i % flags.length],
  }));

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } =
        scrollContainerRef.current;
      setScrollLeft(scrollLeft);
      setIsAtEnd(scrollLeft + clientWidth >= scrollWidth - 10);
    }
  };

  const selectedLang = languages.find((l) => l.id === selectedLanguage);

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
      <div className="flex items-center gap-3">
        <p className="text-black font-semibold text-xl font-poppins">
          Language selection :
        </p>
        <div className="shrink-0 relative group/selected">
          <Image
            src={world}
            alt={"World"}
            width={46}
            height={46}
            className="rounded-full"
          />
          {selectedLang && (
            <div className="absolute -top-9 left-0 z-50 pointer-events-none opacity-0 group-hover/selected:opacity-100 transition-opacity duration-200">
              <div className="bg-gray-900 text-white text-xs font-medium px-2 py-1 rounded-lg whitespace-nowrap">
                {selectedLang.name} / {selectedLang.nativeName}
              </div>
              <div className="w-3 h-3 bg-gray-900 rotate-45 -mt-1.5 ml-3.5" />
            </div>
          )}
        </div>
      </div>

      <div className="relative group flex items-center gap-3">
        {scrollLeft > 10 && (
          <button
            onClick={() => scroll("left")}
            className="absolute left-14 mt-3 top-1/2 -translate-y-1/2 z-10 bg-white hover:bg-gray-100 rounded-full p-2 shadow-lg transition-opacity duration-300"
          >
            <ChevronLeft className="w-5 h-5 text-gray-800" />
          </button>
        )}

        <div
          ref={scrollContainerRef}
          onScroll={handleScroll}
          className="flex items-center gap-5 overflow-x-auto scrollbar-hide scroll-smooth pt-8 pb-1 flex-1"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {languages.map((lang) => {
            const isSelected = selectedLanguage === lang.id;

            return (
              <div
                key={lang.id}
                className="relative shrink-0 flex flex-col items-center"
                onMouseEnter={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  setTooltipInfo({
                    name: lang.name,
                    nativeName: lang.nativeName,
                    rect,
                  });
                }}
                onMouseLeave={() => setTooltipInfo(null)}
              >
              

                <button
                  onClick={() => setSelectedLanguage(lang.id)}
                  className={`rounded-full cursor-pointer transition-all duration-200 border-[3px] ${
                    selectedLanguage === lang.id
                      ? "bg-[linear-gradient(135deg,#FFD700,#FFC107,#FFB300)] bg-origin-border bg-clip-border border-transparent"
                      : "border-transparent"
                  }`}
                  title={lang.name}
                >
                  <div className="bg-white rounded-full">
                    <Image
                      src={lang.icon}
                      alt={lang.name}
                      width={44}
                      height={44}
                      className="rounded-full object-cover"
                    />
                  </div>
                </button>
              </div>
            );
          })}
        </div>

        {tooltipInfo && (
          <div
            className="fixed z-9999 pointer-events-none"
            style={{
              left: tooltipInfo.rect.left + tooltipInfo.rect.width / 2,
              top: tooltipInfo.rect.top - 8,
              transform: "translate(-50%, -100%)",
            }}
          >
            <div className="bg-gray-900 text-white text-xs font-medium px-2 py-1 rounded-lg whitespace-nowrap">
              {tooltipInfo.name} / {tooltipInfo.nativeName}
            </div>
            <div className="w-3 h-3 bg-gray-900 rotate-45 -mt-1.5 mx-auto" />
          </div>
        )}

        {!isAtEnd && (
          <button
            onClick={() => scroll("right")}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white hover:bg-gray-100 rounded-full p-2 shadow-lg transition-opacity duration-300 -mr-4 mt-3"
          >
            <ChevronRight className="w-5 h-5 text-gray-800" />
          </button>
        )}
      </div>
    </div>
  );
};

export default LanguageSelection;
