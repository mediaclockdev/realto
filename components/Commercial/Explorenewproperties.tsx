"use client";

import React from "react";
import new1 from "../../public/new1.svg";
import new2 from "../../public/new2.svg";
import new3 from "../../public/new3.svg";
import Image from "next/image";
import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import squaremeter from "../../public/squaremetericon.svg";

const Explorenewproperties = () => {
  const newproperties = [
    {
      title: "51-53 Main North Road, Medindie Gardens, SA 5081",
      agent: "Contact Agent",
      buy: "buy",
      warehouse: "1054 m² Warehouse",
      place: "Factory & Industrial",
      icon: new1,
    },
    {
      title: "51-53 Main North Road, Medindie Gardens, SA 5081",
      agent: "Contact Agent",
      buy: "buy",
      warehouse: "1054 m² Warehouse",
      place: "Factory & Industrial",
      icon: new2,
    },
    {
      title: "51-53 Main North Road, Medindie Gardens, SA 5081",
      agent: "Contact Agent",
      buy: "buy",
      warehouse: "1054 m² Warehouse",
      place: "Factory & Industrial",
      icon: new3,
    },
    {
      title: "51-53 Main North Road, Medindie Gardens, SA 5081",
      agent: "Contact Agent",
      buy: "buy",
      warehouse: "1054 m² Warehouse",
      place: "Factory & Industrial",
      icon: new1,
    },
    {
      title: "51-53 Main North Road, Medindie Gardens, SA 5081",
      agent: "Contact Agent",
      buy: "buy",
      warehouse: "1054 m² Warehouse",
      place: "Factory & Industrial",
      icon: new2,
    },
    {
      title: "51-53 Main North Road, Medindie Gardens, SA 5081",
      agent: "Contact Agent",
      buy: "buy",
      warehouse: "1054 m² Warehouse",
      place: "Factory & Industrial",
      icon: new3,
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
    <div className="max-w-screen-2xl mx-auto px-5 py-5">
      <div className="mb-4">
        <h2 className="font-poppins font-semibold text-2xl lg:text-[32px] text-black">
          Explore new properties
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
          {newproperties.map((items, idx) => (
            <div
              key={idx}
              className="shrink-0 w-full md:w-[32%] bg-white rounded-2xl shadow-sm border overflow-hidden"
            >
              {/* Image */}
              <div className="w-full h-60 md:h-64 relative">
                <Image
                  src={items.icon}
                  alt="property"
                  fill
                  className="object-cover"
                />
              </div>

              {/* Content */}
              <div className="p-4">
                {/* Title */}
                <p className="text-base md:text-lg font-medium text-black leading-snug">
                  {items.title}
                </p>

                {/* Agent */}
                <p className="text-base text-black font-light mt-2">
                  {items.agent}
                </p>

                {/* Buy */}
                <p className="text-base text-black font-light">{items.buy}</p>

                {/* Warehouse */}
                <div className="flex items-center gap-2 mt-2 text-sm text-black">
                  <Image src={squaremeter} alt="squaremeter icon" />
                  <span className="font-light text-base">
                    {items.warehouse}
                  </span>
                </div>

                {/* Type */}
                <p className="text-sm text-black font-light mt-1">
                  {items.place}
                </p>
              </div>
            </div>
          ))}
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
    </div>
  );
};

export default Explorenewproperties;
