"use client";
import React, { useState } from "react";
import building from "../../public/luxurybuildingicon.svg";
import luxury from "../../public/Luxury Modern Villa.jpg";
import modern from "../../public/Luxury Modern Villa1.jpg";
import villa from "../../public/Luxury Modern Villa2.jpg";
import Image from "next/image";

const properties = [
  {
    src: luxury,
    title: "Luxury Modern Villa",
    location: "Port Melbourne",
    price: "$ 5,50,000",
  },
  {
    src: modern,
    title: "Luxury Modern Villa",
    location: "Port Melbourne",
    price: "$ 5,50,000",
  },
  {
    src: villa,
    title: "Luxury Modern Villa",
    location: "Port Melbourne",
    price: "$ 5,50,000",
  },
];

const ArrowIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="white"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="7" y1="17" x2="17" y2="7" />
    <polyline points="7 7 17 7 17 17" />
  </svg>
);

const LuxuryProperties = () => {
  // Track which card was last hovered (persists after mouse leave)
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const getFlexValue = (index: number) => {
    return activeIndex === index ? 2.5 : 1;
  };

  const isFeatured = (index: number) => {
    return activeIndex === index;
  };

  return (
    <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 py-6 bg-[#BCD3DB]">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left text section */}
        <div className="lg:w-1/4 w-full space-y-5 shrink-0">
          <div className="flex items-center gap-2">
            <p className="text-[#343434] font-bold text-xl sm:text-2xl">
              Luxury Properties
            </p>
            <Image src={building} alt="icon" width={28} height={28} />
          </div>
          <div className="space-y-3">
            <p className="text-[#343434] text-sm sm:text-base">
              Experience the extraordinary. These are the most popular
              properties of our collections.
            </p>
            <p className="text-[#4189DD] cursor-pointer hover:underline text-sm sm:text-base">
              Explore more ...
            </p>
          </div>
        </div>

        {/* Desktop Cards — flex expand on hover */}
        <div className="hidden lg:flex flex-1 gap-3 h-80">
          {properties.map((property, index) => {
            const featured = isFeatured(index);
            return (
              <div
                key={index}
                style={{ flex: getFlexValue(index) }}
                className="relative rounded-2xl overflow-hidden cursor-pointer transition-all duration-500 ease-in-out"
                onMouseEnter={() => setActiveIndex(index)}
              >
                {/* Image with zoom effect */}
                <Image
                  src={property.src}
                  alt={property.title}
                  fill
                  className=" object-cover "
                />

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />

                {/* Bottom content */}
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  {/* Property info — animates in when featured */}
                  <div
                    style={{
                      maxHeight: featured ? "100px" : "0px",
                      opacity: featured ? 1 : 0,
                      transform: featured ? "translateY(0)" : "translateY(2px)",
                      transition:
                        "max-height 0.4s ease, opacity 0.35s ease, transform 0.4s ease",
                      overflow: "hidden",
                      marginBottom: featured ? "12px" : "0px",
                    }}
                  >
                    <p className="text-white font-semibold text-base leading-tight">
                      {property.title}
                    </p>
                    <p className="text-white/80 text-sm">
                      Location : {property.location}
                    </p>
                    <p className="text-white/80 text-sm">
                      Price : {property.price}
                    </p>
                  </div>

                  {/* Button */}
                  {featured ? (
                    <button className="w-full bg-[#2a2a2a]/90 hover:bg-[#3a3a3a] text-white rounded-full py-3 text-sm font-medium transition-colors duration-200">
                      View detail
                    </button>
                  ) : (
                    <button className="w-full bg-[#2a2a2a]/90 hover:bg-[#3a3a3a] text-white rounded-full py-3 flex items-center justify-center transition-colors duration-200">
                      <ArrowIcon />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Mobile / Tablet Cards — stacked */}
        <div className="lg:hidden flex flex-col sm:grid sm:grid-cols-2 gap-4">
          {properties.map((property, index) => (
            <div
              key={index}
              className={`relative rounded-2xl overflow-hidden cursor-pointer group ${
                index === 0 ? "sm:col-span-2" : ""
              }`}
            >
              <div className="relative w-full h-56 sm:h-72">
                <Image
                  src={property.src}
                  alt={property.title}
                  fill
                  className="object-cover transition-transform duration-500  hover:object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
              </div>

              {/* Always show info on mobile */}
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <p className="text-white font-semibold text-base">
                  {property.title}
                </p>
                <p className="text-white/80 text-sm">
                  Location : {property.location}
                </p>
                <p className="text-white/80 text-sm mb-3">
                  Price : {property.price}
                </p>
                <button className="w-full bg-[#2a2a2a]/90 hover:bg-[#3a3a3a] text-white rounded-full py-2.5 text-sm font-medium transition-colors duration-200">
                  View detail
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LuxuryProperties;
