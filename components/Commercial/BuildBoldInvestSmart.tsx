"use client";

import React from "react";
import Image from "next/image";
import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import coworkerspace from "../../public/coworkerspace.svg";
import commercialproperty from "../../public/commercialpropertyinvest.svg";
import commercialnews from "../../public/commercialnews.svg";
import commercialagency from "../../public/commercialagency.svg";

const BuildBoldInvestSmart = () => {
  const invest = [
    {
      title: "Find coworking spaces",
      icon: coworkerspace,
    },
    {
      title: "Invest in commercial property",
      icon: commercialproperty,
    },
    {
      title: "Read the latest commercial news",
      icon: commercialnews,
    },
    {
      title: "Find a commercial agency",
      icon: commercialagency,
    },
    {
      title: "Find coworking spaces",
      icon: coworkerspace,
    },
    {
      title: "Invest in commercial property",
      icon: commercialproperty,
    },
    {
      title: "Read the latest commercial news",
      icon: commercialnews,
    },
    {
      title: "Find a commercial agency",
      icon: commercialagency,
    },
  ];

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 400;
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
    <div className="max-w-screen-2xl mx-auto px-5 py-12">
      <div className="mb-8">
        <h2 className="text-2xl md:text-[32px] font-semibold text-black">
          Build Bold. Invest Smart.
        </h2>
      </div>

      <div className="relative group">
        {/* Left Arrow Button */}
        <button
          onClick={() => scroll("left")}
          className="hidden md:block absolute -left-6 top-1/2 -translate-y-1/2 z-10 bg-white hover:bg-gray-100 rounded-full p-2 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          aria-label="Scroll left"
        >
          <ChevronLeft className="w-5 h-5 text-gray-800" />
        </button>

        <div
          className="flex gap-6 overflow-x-auto scroll-smooth"
          ref={scrollContainerRef}
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {invest.map((items, id) => (
            <div
              key={id}
              className="flex flex-col items-center shrink-0 w-full md:w-1/4"
            >
              <Image
                src={items.icon}
                alt={items.title}
                className="rounded-2xl w-full h-64 md:h-72 object-cover"
              />
              <p className="text-black font-semibold text-center text-base md:text-lg mt-4">
                {items.title}
              </p>
            </div>
          ))}
        </div>

        {/* Right Arrow Button */}
        <button
          onClick={() => scroll("right")}
          className="hidden md:block absolute -right-6 top-1/2 -translate-y-1/2 z-10 bg-white hover:bg-gray-100 rounded-full p-2 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          aria-label="Scroll right"
        >
          <ChevronRight className="w-5 h-5 text-gray-800" />
        </button>
      </div>
    </div>
  );
};

export default BuildBoldInvestSmart;
