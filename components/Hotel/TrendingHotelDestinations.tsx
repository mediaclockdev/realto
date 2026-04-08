"use client";

import React from "react";
import Image from "next/image";
import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import hongkong from "../../public/chinahotel.jpg";
import dubai from "../../public/dubaihotel.jpg";
import paris from "../../public/parishotel.jpg";

const TrendingHotelDestinations = () => {
  const data = [
    {
      img: hongkong,
      title: "Hong Kong, China",
      des: "Avg. price per night for a 3-star hotel: $ 11,800",
    },
    {
      img: dubai,
      title: "Dubai, UAE",
      des: "Avg. price per night for a 3-star hotel: $ 11,800",
    },
    {
      img: paris,
      title: "Paris, France",
      des: "Avg. price per night for a 3-star hotel: $ 11,800",
    },
    {
      img: hongkong,
      title: "Hong Kong, China",
      des: "Avg. price per night for a 3-star hotel: $ 11,800",
    },
    {
      img: dubai,
      title: "Dubai, UAE",
      des: "Avg. price per night for a 3-star hotel: $ 11,800",
    },
    {
      img: paris,
      title: "Paris, France",
      des: "Avg. price per night for a 3-star hotel: $ 11,800",
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
          Explore by property type
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
          {data.map((items, id) => (
            <div
              key={id}
              className="flex flex-col items-center shrink-0 w-full md:w-1/3"
            >
              <Image
                src={items.img}
                alt={items.title}
                className="rounded-2xl w-80 md:w-112.5 h-80 md:h-100 object-cover"
              />
              <p className="text-black font-medium text-center text-base md:text-xl">
                {items.title}
              </p>
              <p className="text-[#909090] font-normal text-center text-sm md:text-base ">
                {items.des}
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

export default TrendingHotelDestinations;
