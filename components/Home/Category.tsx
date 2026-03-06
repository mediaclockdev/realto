"use client";
import React from "react";
import agent from "../../public/agent.svg";
import airbnb from "../../public/airbnb.svg";
import buy from "../../public/buy.svg";
import rent from "../../public/rent.svg";
import hotel from "../../public/hotel.svg";
import student from "../../public/studentresidency.svg";
import loanbroker from "../../public/loanbroker.svg";
import commercial from "../../public/commercial.svg";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useRef } from "react";

const Features = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const agents = [
    { img: buy, href: "" },
    { img: rent, href: "" },
    { img: agent, href: "" },
    { img: loanbroker, href: "" },
    { img: commercial, href: "" },
    { img: hotel, href: "" },
    { img: airbnb, href: "" },
    { img: student, href: "/studentResidency" },
  ];
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
          {agents.map((item, idx) =>
            item.href ? (
              <Link key={idx} href={item.href} className="shrink-0">
                <Image src={item.img} alt="category" className="size-36" />
              </Link>
            ) : (
              <button key={idx} className="shrink-0">
                <Image src={item.img} alt="category" className="size-36" />
              </button>
            )
          )}
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

export default Features;
