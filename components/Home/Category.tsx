"use client";
import React from "react";
import agent from "../../public/agent.svg";
import agent1 from "../../public/agent1.svg";
import agent2 from "../../public/agent2.svg";
import airbnb from "../../public/airbnb.svg";
import airbnb1 from "../../public/airbnb1.svg";
import buy from "../../public/buy.svg";
import buy1 from "../../public/buy1.svg";
import rent from "../../public/rent.svg";
import rent1 from "../../public/rent1.svg";
import rent2 from "../../public/rent2.svg";
import rent3 from "../../public/rent3.svg";
import hotel from "../../public/hotel.svg";
import hotel1 from "../../public/hotel1.svg";
import student from "../../public/studentresidency.svg";
import student1 from "../../public/student1.svg";
import student2 from "../../public/student2.svg";
import student3 from "../../public/student3.svg";
import loanbroker from "../../public/loanbroker.svg";
import loanbroker1 from "../../public/loanbroker1.svg";
import commercial from "../../public/commercial.svg";
import flatmate from "../../public/flatmate.svg";
import flatmate1 from "../../public/flatmate1.svg";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useRef, useState, useEffect } from "react";
import land from "../../public/land.svg";

const categoryItems = [
  { imgs: [buy, buy1], href: "/propertyListingpage" },
  { imgs: [rent, rent1, rent2, rent3], href: "/rent" },
  { imgs: [agent, agent1, agent2], href: "/agentspage" },
  { imgs: [loanbroker, loanbroker1], href: "/broker" },
  { imgs: [commercial], href: "/commercial" },
  { imgs: [hotel, hotel1], href: "" },
  { imgs: [airbnb, airbnb1], href: "https://www.airbnb.com.au/" },
  {
    imgs: [student, student1, student2, student3],
    href: "/studentResidency",
  },
  { imgs: [flatmate, flatmate1], href: "/flatmate" },
  { imgs: [land, land], href: "/land" },
];

const Features = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [currentIndexes, setCurrentIndexes] = useState(
    categoryItems.map(() => 0),
  );
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndexes((prev) =>
        prev.map((index, i) => {
          const total = categoryItems[i].imgs?.length;
          return (index + 1) % total;
        }),
      );
    }, 10000); // 10 seconds

    return () => clearInterval(interval);
  }, []);

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
          className="hidden md:block absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white hover:bg-gray-100 rounded-full p-2 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 -ml-4"
          aria-label="Scroll left"
        >
          <ChevronLeft className="w-5 h-5 text-gray-800" />
        </button>

        {/* Scrollable Container */}
        <div
          ref={scrollContainerRef}
          className="flex gap-5 overflow-x-auto scrollbar-hide scroll-smooth"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {categoryItems.map((item, idx) =>
            item.href ? (
              <Link key={idx} href={item.href} className="shrink-0">
                <Image
                  src={item.imgs[currentIndexes[idx]]}
                  alt="category"
                  className="size-36"
                  unoptimized
                />
              </Link>
            ) : (
              <button key={idx} className="shrink-0">
                <Image
                  src={item.imgs[currentIndexes[idx]]}
                  alt="category"
                  className="size-36"
                  unoptimized
                />
              </button>
            ),
          )}
        </div>

        {/* Right Arrow Button */}
        <button
          onClick={() => scroll("right")}
          className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white hover:bg-gray-100 rounded-full p-2 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 -mr-4"
          aria-label="Scroll right"
        >
          <ChevronRight className="w-5 h-5 text-gray-800" />
        </button>
      </div>
    </div>
  );
};

export default Features;
