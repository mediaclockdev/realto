"use client";

import React, { useRef} from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import century from "../../public/century21.svg";
import raywhite from "../../public/raywhite.svg";
import elderrealstate from "../../public/elderrealestate.svg";

const RealEstateAgents = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
 const agents = [
   century, raywhite, elderrealstate
 ];

const agent = Array.from({ length: 30 }, (_, i) => ({
  id: i + 1,
  ...agents[i % agents.length], // rotate between flags
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
      <div className="">
        <p className="text-black font-medium">Real Estate Agents :</p>
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
          className="flex items-center gap-5 overflow-x-auto scrollbar-hide scroll-smooth "
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {agent.map((agents) => (
            <button key={agents.id} className="shrink-0 ">
              <Image src={agents} alt={agents} className="size-28" />
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

export default RealEstateAgents;
