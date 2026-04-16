"use client";
import React from "react";
import agent from "../../public/agentimg1.jpg";
import agent1 from "../../public/agentimg2.jpg";
import agent2 from "../../public/agentimg3.jpg";
import airbnb from "../../public/airbnbimg1.jpg";
import airbnb1 from "../../public/airbnbimg2.jpg";

import buy from "../../public/buyimg1.jpg";
import buy1 from "../../public/buyimg2.png";

import rent from "../../public/rentimg1.jpg";
import rent1 from "../../public/rentimg2.jpg";
import rent2 from "../../public/rentimg3.jpg";
import rent3 from "../../public/rentimg4.jpg";
import hotel from "../../public/hotelimg1.jpg";
import hotel1 from "../../public/hotelimg2.jpg";
import student from "../../public/studentresidencyimg1.jpg";
import student1 from "../../public/studentresidencyimg2.jpg";
import student2 from "../../public/studentresidencyimg3.jpg";
import student3 from "../../public/studentresidencyimg4.jpg";
import loanbroker from "../../public/loanbrokerimg1.jpg";
import loanbroker1 from "../../public/loanbrokerimg2.jpg";
import commercial from "../../public/commercialimg1.jpg";
import flatmate from "../../public/flatmateimg1.png";
import flatmate1 from "../../public/flatmateimg2.jpg";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useRef, useState, useEffect } from "react";
import land from "../../public/land.svg";
import land1 from "../../public/landimg1.jpg";
import land2 from "../../public/landimg2.jpg";
import land3 from "../../public/landimg3.jpg";
import land4 from "../../public/landimg4.jpg";
import land5 from "../../public/landimg5.jpg";
import land6 from "../../public/landimg6.jpg";

const categoryItems = [
  { imgs: [buy, buy1], href: "/propertyListingpage", title: "Buy" },
  { imgs: [rent, rent1, rent2, rent3], href: "/rent", title: "Rent" },
  { imgs: [agent, agent1, agent2], href: "/agentspage", title: "Agent" },
  { imgs: [loanbroker, loanbroker1], href: "/broker", title: "Loan Broker" },
  { imgs: [commercial], href: "/commercial", title: "Commercial" },
  { imgs: [hotel, hotel1], href: "/hotel", title: "Hotel" },
  {
    imgs: [airbnb, airbnb1],
    href: "https://www.airbnb.com.au/",
    title: "Airbnb",
  },
  {
    imgs: [student, student1, student2, student3],
    href: "/studentResidency",
    title: "Student Residency",
  },
  { imgs: [flatmate, flatmate1], href: "/flatmate", title: "Flatmate" },
  {
    imgs: [land, land1, land2, land3, land4, land5, land6],
    href: "/land",
    title: "Land",
  },
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
                <div className="relative size-40 rounded-[12px] overflow-hidden">
                  {/* Image */}
                  <Image
                    src={item.imgs[currentIndexes[idx]]}
                    alt="category"
                    fill
                    className="object-cover object-top"
                    unoptimized
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                  {/* Text */}
                  <p className="absolute bottom-2 left-2 right-2 font-extrabold font-amasis text-2xl text-center reel-text">
                    {item.title}
                  </p>
                </div>
              </Link>
            ) : (
              <button key={idx} className="shrink-0">
                <div className="relative size-40 rounded-[12px] overflow-hidden">
                  <Image
                    src={item.imgs[currentIndexes[idx]]}
                    alt="category"
                    fill
                    className="object-cover object-top"
                    unoptimized
                  />

                  {/* <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" /> */}

                  <p className="absolute bottom-2 left-2 right-2 text-white font-semibold text-sm text-center">
                    {item.title}
                  </p>
                </div>
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
