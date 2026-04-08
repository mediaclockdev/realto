"use client";

import React, { useRef } from "react";
import hotel from "../../public/hotel2.svg";
import villas from "../../public/villas.svg";
import resorts from "../../public/resorts.svg";
import Image from "next/image";

const Browsebypropertytype = () => {
  const property = [
    {
      title: "Hotel",
      icon: hotel,
    },
    {
      title: "Villas",
      icon: villas,
    },
    {
      title: "Resorts",
      icon: resorts,
    },
    {
      title: "Hotel",
      icon: hotel,
    },
    {
      title: "Villas",
      icon: villas,
    },
    {
      title: "Resorts",
      icon: resorts,
    },
  ];

  const gap = 24;
  const scrollRef = useRef<HTMLDivElement>(null);
  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;

    const firstCard = scrollRef.current.children[0] as HTMLElement;
    if (!firstCard) return;

    const cardWidth = firstCard.offsetWidth;

    scrollRef.current.scrollBy({
      left: direction === "left" ? -(cardWidth + gap) : cardWidth + gap,
      behavior: "smooth",
    });
  };

  return (
    <div className="max-w-screen-2xl mx-auto px-5 py-5">
      <div className="flex items-center justify-between gap-5 mb-2">
        <h2 className="font-poppins font-semibold text-lg lg:text-[32px] text-black">
          Browse by property type
        </h2>

        <div className="flex items-center gap-2">
          <button
            onClick={() => scroll("left")}
            className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-500 hover:border-blue-500 hover:text-blue-500 transition-colors"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          <button
            onClick={() => scroll("right")}
            className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-500 hover:border-blue-500 hover:text-blue-500 transition-colors"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>
      </div>
      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto pb-2 scrollbar-hide"
        style={{
          scrollSnapType: "x mandatory",
        }}
      >
        {property.map((items, idx) => (
          <div
            key={idx}
            className="shrink-0 sm:w-[80%] 
        md:w-[48%] 
        lg:w-[32%] 
         flex flex-col gap-2 lg:gap-4"
            style={{ scrollSnapAlign: "start" }}
          >
            {/* Image Card */}
            <div className="w-full h-55 sm:h-60 md:h-65 rounded-2xl overflow-hidden">
              <Image
                src={items.icon}
                alt={items.title}
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105 cursor-pointer"
              />
            </div>

            {/* Title */}
            <p className="font-poppins font-semibold text-lg lg:text-[32px] text-black text-center">
              {items.title}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Browsebypropertytype;
