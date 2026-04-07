"use client";

import React from "react";
import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import warehouse from "../../public/warehouse.jpg";
import shops from "../../public/shops.jpg";
import offices from "../../public/offices.jpg";
import workspaces from "../../public/workspace.jpg";
import store from "../../public/store.jpg";
import storage from "../../public/storage.jpg";
import Image from "next/image";

const Explorebypropertytype = () => {
  const properties = [
    {
      name: "Warehouse, Factory & Industrial",
      icon: warehouse,
    },
    {
      name: "Shops & Retail",
      icon: shops,
    },
    {
      name: "Offices",
      icon: offices,
    },
    {
      name: "Workspace",
      icon: workspaces,
    },
    {
      name: "Store",
      icon: store,
    },
    {
      name: "Storage",
      icon: storage,
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
          {properties.map((items, id) => (
            <div
              key={id}
              className="flex flex-col items-center shrink-0 w-full md:w-1/3"
            >
              <Image
                src={items.icon}
                alt={items.name}
                className="rounded-2xl w-full h-64 md:h-72 object-cover"
              />
              <p className="text-black font-semibold text-center text-base md:text-lg mt-4">
                {items.name}
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

export default Explorebypropertytype;
