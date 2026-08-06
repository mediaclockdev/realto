"use client";

import React, { useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { commercialListings } from "@/lib/commercial/data";
import { CommercialPropertyCard } from "./Explorenewproperties";

const STATES = [
  "All States",
  "Popular Areas",
  "VIC",
  "NSW",
  "WA",
  "QLD",
  "SA",
  "TAS",
  "ACT",
  "NT",
];

const GOLD_GRADIENT =
  "linear-gradient(90deg, #CB9E33, #EDD06A, #FCEA94, #FADE7B, #FDEE9D, #C29225)";

const PROPERTIES = commercialListings.slice(0, 4);

export default function PremiumFeaturedListing() {
  const [activeState, setActiveState] = useState("All States");
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 370;
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
        {/* Header */}

        <div className="flex flex-col lg:flex-row justify-between gap-5 mb-5">
          <h3 className="text-2xl lg:text-[32px] font-semibold text-[#0287C7]">
            Premium Featured Listing
          </h3>
          {/* State Tabs */}
          <div className=" flex flex-wrap gap-2 rounded-xl p-2 shadow-sm">
            {STATES.map((state) => (
              <button
                key={state}
                onClick={() => setActiveState(state)}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-all whitespace-nowrap ${
                  activeState === state
                    ? "text-[#4189DD] underline decoration-[#4189DD] font-poppins font-normal text-sm lg:text-base "
                    : "text-black font-poppins font-normal text-sm lg:text-base hover:cursor-pointer"
                }`}
              >
                {state}
              </button>
            ))}
          </div>
        </div>
        {/* Property Cards Slider */}
        <div className="relative group">
          <button
            onClick={() => scroll("left")}
            className="hidden md:flex absolute -left-4 top-1/2 -translate-y-1/2 z-10 bg-white hover:bg-slate-100 rounded-full p-2.5 shadow-lg border border-slate-100 text-slate-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300 items-center justify-center cursor-pointer"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <div
            className="flex gap-6 overflow-x-auto scroll-smooth py-2 px-1"
            ref={scrollContainerRef}
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {PROPERTIES.map((property, index) => (
              <CommercialPropertyCard
                key={property.id}
                property={property}
                index={index}
                borderGradient={GOLD_GRADIENT}
              />
            ))}
          </div>

          <button
            onClick={() => scroll("right")}
            className="hidden md:flex absolute -right-4 top-1/2 -translate-y-1/2 z-10 bg-white hover:bg-slate-100 rounded-full p-2.5 shadow-lg border border-slate-100 text-slate-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300 items-center justify-center cursor-pointer"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
