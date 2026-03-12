"use client";

import React, { useRef } from "react";
import {
  ChevronRight,
  ChevronLeft,
} from "lucide-react";
import location from "../../public/location.svg";
import Image from "next/image";
import share from "../../public/share.svg";
import home from "../../public/home.svg";
import mobile from "../../public/mobileicon.svg";
import mail from "../../public/mailicon.svg";
import clock from "../../public/clock.svg";
import money from "../../public/money.svg";
import calender from "../../public/calender.svg";
import squaremetericon from "../../public/squaremetericon.svg";

export interface PropertyData {
  id: string;
  images: string[];
  location: string;
  size: string;
  date: string;
  time: string;
  priceRange: string;
  propertyType: string;
  agentName: string;
  agentCompany: string;
  agentLocation: string;
  agentPhone: string;
  agentEmail: string;
  agentImage: string;
  iconImages?: string[];
  iconLabels?: string[]; // Optional labels for each icon (e.g. ["1", "1", "1"])
}

interface PropertySliderProps {
  properties: PropertyData[];
  onPropertyClick?: (property: PropertyData) => void;
}

export const PropertySlider: React.FC<PropertySliderProps> = ({
  properties,
  onPropertyClick,
}) => {
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
    <div className="relative group">
      {/* Left Arrow Button */}
      <button
        onClick={() => scroll("left")}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white hover:bg-gray-100 rounded-full p-3 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 -ml-6"
        aria-label="Scroll left"
      >
        <ChevronLeft className="w-6 h-6 text-gray-800" />
      </button>

      {/* Scrollable Container */}
      <div
        ref={scrollContainerRef}
        className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {properties.map((property) => (
          <PropertyCard
            key={property.id}
            property={property}
            onCardClick={onPropertyClick}
          />
        ))}
      </div>

      {/* Right Arrow Button */}
      <button
        onClick={() => scroll("right")}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white hover:bg-gray-100 rounded-full p-3 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 -mr-6"
        aria-label="Scroll right"
      >
        <ChevronRight className="w-6 h-6 text-gray-800" />
      </button>
    </div>
  );
};

// Property Card Component (embedded)
const PropertyCard: React.FC<{
  property: PropertyData;
  onCardClick?: (property: PropertyData) => void;
}> = ({ property, onCardClick }) => {
  const [currentImageIndex, setCurrentImageIndex] = React.useState(0);

  const handleNextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % property.images.length);
  };

  const handlePrevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex(
      (prev) => (prev - 1 + property.images.length) % property.images.length,
    );
  };

  return (
    <div
     className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 shrink-0 w-[340px] cursor-pointer border border-transparent hover:border-black"
      onClick={() => onCardClick?.(property)}
    >
      {/* Image Section */}
      <div className="relative h-52 bg-gray-200 group/image">
        <Image
          src={property.images[currentImageIndex]}
          alt={`Property in ${property.location}`}
          fill
          className="object-cover"
        />

        {/* Image Navigation Arrows */}
        {property.images.length > 1 && (
          <>
            <button
              onClick={handlePrevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 opacity-0 group-hover/image:opacity-100 transition-opacity"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 opacity-0 group-hover/image:opacity-100 transition-opacity"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </>
        )}

        {/* Image counter dots */}
        {property.images.length > 1 && (
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
            {property.images.map((_, idx) => (
              <span
                key={idx}
                className={`w-1.5 h-1.5 rounded-full ${idx === currentImageIndex ? "bg-white" : "bg-white/50"}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="px-4 pt-3 pb-4">
        {/* Icon Preview Images */}
        {property.iconImages && property.iconImages.length > 0 && (
          <div className="flex items-center gap-3 mb-3 pb-2 ">
            {property.iconImages.map((icon, index) => (
              <div key={index} className="flex items-center gap-1.5">
                <div className="w-10 h-10 rounded-lg overflow-hidden shrink-0">
                  <Image
                    src={icon}
                    alt={`Feature ${index + 1}`}
                    width={40}
                    height={40}
                    className="object-cover w-full h-full"
                  />
                </div>
                <span className="text-sm font-semibold text-gray-700">
                  {property.iconLabels?.[index] ?? "1"}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Location and Size */}
        <div className="flex items-center justify-between mb-2.5">
          <div className="flex items-center gap-1.5 min-w-0">
            <Image src={location} alt="location" className="w-5 h-5 shrink-0" />
            <span className="font-semibold text-gray-800 text-sm truncate">
              {property.location}
            </span>
          </div>
          <div className="flex items-center gap-1 ml-2 shrink-0">
              <Image src={squaremetericon} alt="location" className="w-5 h-5 shrink-0" />
            <p className="text-[#343434] font-semibold text-base">
              {property.size}
            </p>
          </div>
        </div>

        {/* Date and Time */}
        <div className="flex items-center gap-1 mb-2.5 text-gray-600">
          <div className="flex items-center ">
            <Image src={calender} alt="calendericon" className="w-4 h-4  shrink-0" />
            <span className="text-[#343434] font-semibold text-base">{property.date}</span>
          </div>
          <div className="flex items-center ">
            <Image src={clock} alt="clockicon" className="w-4 h-4  shrink-0" />
            <span className="text-[#343434] font-semibold text-base">{property.time}</span>
          </div>
        </div>

        {/* Price and Property Type */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-1">

          <Image src={money} alt="money icon"/>
          <p className="text-[#343434] font-semibold text-base">
            {property.priceRange}
          </p>
          </div>
          <span className="text-[#343434] font-semibold text-base">
            • {property.propertyType}
          </span>
        </div>

        {/* lower content */}
        <div className="flex items-center justify-between">
          {/* Agent Information */}
          <div>
            <div className="flex gap-1">
              <Image
                src={property.agentImage}
                alt={property.agentName}
                width={30}
                height={30}
                className="rounded-full shrink-0 border-2 border-red-100 object-cover"
              />
              <p className="font-semibold text-[#FA2F2F] text-base truncate">
                {property.agentName}
              </p>
            </div>
            <div className="flex items-center gap-1 text-xs text-gray-600 mt-1">
              <Image src={mobile} alt="" width={20} height={20} />
              <p className="font-semibold text-[#FA2F2F] text-xs">{property.agentPhone}</p>
            </div>
            <div className="flex items-center gap-1 text-xs text-blue-600 mt-1">
              <Image src={mail} alt="" width={20} height={20} />
              <p className="truncate font-semibold text-[#FA2F2F] text-xs">{property.agentEmail}</p>
            </div>
          </div>

          {/* Company Badge + Actions */}
          <div>
            <Image
              src={property.agentCompany}
              alt="Company logo"
              width={80}
              height={36}
              className="object-contain"
            />

            <div className="text-xs text-[#FA2F2F] font-medium ">
              <p>{property.agentLocation}</p>
            </div>
            <div className="flex items-center gap-1">
              <button
                className="flex items-center gap-1 px-2 py-1.5 hover:bg-blue-50 rounded-lg transition-colors text-xs text-blue-600 font-medium"
                onClick={(e) => e.stopPropagation()}
              >
                <Image src={share} alt="Share" width={20} height={20} />
              </button>
              <button
                className="flex items-center gap-1 px-2 py-1.5 hover:bg-red-50 rounded-lg transition-colors text-xs text-red-500 font-medium"
                onClick={(e) => e.stopPropagation()}
              >
                <Image src={home} alt="Home" width={20} height={20} />
              </button>
            </div>
          </div>

          {/* <div className="flex items-start gap-3">
            <Image
              src={property.agentImage}
              alt={property.agentName}
              width={56}
              height={56}
              className="rounded-full shrink-0 border-2 border-red-100 object-cover"
            />
            <div className="min-w-0">
              <h4 className="font-bold text-red-500 text-base truncate">
                {property.agentName}
              </h4>
              <div className="flex items-center gap-1.5 text-xs text-gray-600 mt-1">
                <Image src={mobile} alt="" width={16} height={16} />
                <span>{property.agentPhone}</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-blue-600 mt-1">
                <Image src={mail} alt="" width={16} height={16} />
                <span className="truncate">{property.agentEmail}</span>
              </div>
            </div>
          </div> */}

          {/* Company Badge + Actions */}
          {/* <div className="flex flex-col items-end shrink-0 ml-4">
            <div className="flex items-center gap-2">
              <Image
                src={property.agentCompany}
                alt="Company logo"
                width={80}
                height={36}
                className="object-contain"
              />
            </div>
            <div className="text-xs text-red-600 font-medium mt-1">
              {property.agentLocation}
            </div> */}

          {/* Action Buttons */}
          {/* <div className="flex items-center gap-1 mt-2">
              <button
                className="flex items-center gap-1 px-2 py-1.5 hover:bg-blue-50 rounded-lg transition-colors text-xs text-blue-600 font-medium"
                onClick={(e) => e.stopPropagation()}
              >
                <Image src={share} alt="Share" width={28} height={28} />
              </button>
              <button
                className="flex items-center gap-1 px-2 py-1.5 hover:bg-red-50 rounded-lg transition-colors text-xs text-red-500 font-medium"
                onClick={(e) => e.stopPropagation()}
              >
                <Image src={home} alt="Home" width={28} height={28} />
              </button>
            </div> */}
        </div>
      </div>
    </div>
  );
};
