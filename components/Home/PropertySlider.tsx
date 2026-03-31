"use client";

import React, { useRef, useState } from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";
import locationIcon from "../../public/location.svg";
import Image from "next/image";
import share from "../../public/share.svg";
import home from "../../public/buylikeicon.svg";
import homeliked from "../../public/homelike.svg";
import mobile from "../../public/mobileicon.svg";
import mail from "../../public/mailicon.svg";
import clock from "../../public/clock.svg";
import money from "../../public/money.svg";
import squaremetericon from "../../public/squaremetericon.svg";
import { ImageSource } from "@/lib/shared/types";
import whatsapp from "@/public/whatsapp.svg";
import instagram from "@/public/logos_instagram.svg";
import facebook from "../../public/logos_facebook.svg";
import message from "../../public/mailicon.svg";
import sharegold from "../../public/sharegold.svg";

export interface PropertyData {
  id: string;
  images: string[];
  location: string;
  size: string;
  date: string;
  dateicon: ImageSource;
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
  iconLabels?: string[];
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
      {/* Left Arrow */}
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
        className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth py-0 lg:py-4 px-0 lg:px-2"
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

      {/* Right Arrow */}
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

const GOLD_GRADIENT =
  "linear-gradient(90deg, #CB9E33, #EDD06A, #FCEA94, #FADE7B, #FDEE9D, #C29225)";

const PropertyCard: React.FC<{
  property: PropertyData;
  onCardClick?: (property: PropertyData) => void;
}> = ({ property, onCardClick }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [liked, setLiked] = useState(false);
  const [isShared, setIsShared] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

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
      className="shrink-0 w-[340px] rounded-xl transition-all duration-300 hover:scale-105 p-[2px] cursor-pointer relative"
      style={{ background: isHovered ? GOLD_GRADIENT : "transparent" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onCardClick?.(property)}
    >
      {/* Inner: white card */}
      <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 w-full h-full">
        {/* Image Section */}
        <div className="relative h-40 bg-gray-200 group/image cursor-pointer">
          <Image
            src={property.images[currentImageIndex]}
            alt={`Property in ${property.location}`}
            fill
            className="object-cover"
          />

          {property.images.length > 1 && (
            <>
              <button
                onClick={handlePrevImage}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 opacity-0 group-hover/image:opacity-100 transition-opacity"
              >
                <ChevronLeft className="w-4 h-4 text-black" />
              </button>
              <button
                onClick={handleNextImage}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 opacity-0 group-hover/image:opacity-100 transition-opacity"
              >
                <ChevronRight className="w-4 h-4 text-black" />
              </button>
            </>
          )}

          {property.images.length > 1 && (
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
              {property.images.map((_, idx) => (
                <span
                  key={idx}
                  className={`w-1.5 h-1.5 rounded-full ${
                    idx === currentImageIndex ? "bg-white" : "bg-white/50"
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Content Section */}
        <div className="px-4 pt-3 pb-4">
          {/* Icon Preview Images */}
          {property.iconImages && property.iconImages.length > 0 && (
            <div className="flex items-center gap-3 mb-1 pb-2">
              {property.iconImages.map((icon, index) => (
                <div key={index} className="flex items-center gap-1.5">
                  <div className="w-14 h-10 rounded-lg overflow-hidden shrink-0">
                    <Image
                      src={icon}
                      alt={`Feature ${index + 1}`}
                      width={48}
                      height={40}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="text-sm font-semibold text-gray-700 font-poppins">
                    {property.iconLabels?.[index] ?? "1"}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* Location and Size */}
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-0.5 min-w-0">
              <Image
                src={locationIcon}
                alt="location"
                width={28}
                height={28}
                className="w-5 h-5 lg:w-7 lg:h-7 shrink-0 object-contain"
              />
              <span className="font-semibold text-gray-800 text-sm truncate font-poppins ml-0.5">
                {property.location}
              </span>
            </div>
            <div className="flex items-center gap-1 ml-2 shrink-0">
              <Image
                src={squaremetericon}
                alt="size"
                width={28}
                height={28}
                className="w-5 h-5 lg:w-7 lg:h-7 shrink-0 object-contain"
              />
              <p className="text-[#343434] font-semibold text-base font-poppins ml-1">
                {property.size}
              </p>
            </div>
          </div>

          {/* Date and Time */}
          <div className="flex items-center gap-1 mb-1 text-gray-600">
            <div className="flex items-center">
              <Image
                src={property.dateicon}
                alt="calendericon"
                width={28}
                height={28}
                className="w-4 h-4 lg:w-7 lg:h-7 shrink-0 object-contain"
              />
              <span className="text-[#343434] font-semibold font-poppins text-base ml-1">
                {property.date}
              </span>
            </div>
            <div className="flex items-center ml-2">
              <Image
                src={clock}
                alt="clockicon"
                width={28}
                height={28}
                className="w-4 h-4 lg:w-7 lg:h-7 shrink-0 object-contain"
              />
              <span className="text-[#343434] font-semibold font-poppins text-base ml-1">
                {property.time}
              </span>
            </div>
          </div>

          {/* Price and Property Type */}
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-1">
              <Image
                src={money}
                alt="money icon"
                width={28}
                height={28}
                className="w-7 h-7 object-contain"
              />
              <p className="text-[#343434] font-semibold font-poppins text-base">
                {property.priceRange}
              </p>
            </div>
            <span className="text-[#343434] font-semibold font-poppins text-base">
              • {property.propertyType}
            </span>
          </div>

          {/* Lower content */}
          <div className="flex items-center justify-between">
            {/* Agent Info */}
            <div>
              <div className="flex gap-1 items-center">
                <Image
                  src={property.agentImage}
                  alt={property.agentName}
                  width={30}
                  height={30}
                  className="rounded-full shrink-0 border-2 border-red-100 object-cover"
                />
                <p className="font-semibold font-poppins text-[#FA2F2F] text-base truncate">
                  {property.agentName}
                </p>
              </div>
              <div className="flex items-center gap-1 mt-1">
                <Image
                  src={mobile}
                  alt=""
                  width={20}
                  height={20}
                  className="object-contain"
                />
                <p className="font-semibold font-poppins text-[#FA2F2F] text-xs">
                  {property.agentPhone}
                </p>
              </div>
              <div className="flex items-center gap-1 mt-1">
                <Image
                  src={mail}
                  alt=""
                  width={20}
                  height={20}
                  className="object-contain"
                />
                <p className="truncate font-semibold font-poppins text-[#FA2F2F] text-xs">
                  {property.agentEmail}
                </p>
              </div>
            </div>

            {/* Company + Actions */}
            <div>
              <Image
                src={property.agentCompany}
                alt="Company logo"
                width={80}
                height={36}
                className="object-contain block mx-auto mb-1"
              />
              <div className="text-xs text-[#FA2F2F] font-medium font-poppins mb-1 text-right">
                <p>{property.agentLocation}</p>
              </div>

              <div className="flex items-center justify-end relative">
                <button
                  className="flex items-center gap-1 px-2 py-1.5 hover:bg-blue-50 rounded-lg transition-colors z-10"
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowShareModal(!showShareModal);
                    setIsShared(!isShared);
                  }}
                >
                  <Image
                    src={isShared ? sharegold : share}
                    alt="Share"
                    width={28}
                    height={28}
                    className="transition-all duration-200 object-contain"
                  />
                </button>
                <button
                  className="flex items-center gap-1 px-2 py-1.5 cursor-pointer hover:bg-red-50 rounded-lg transition-colors z-10"
                  onClick={(e) => {
                    e.stopPropagation();
                    setLiked(!liked);
                  }}
                >
                  <Image
                    src={liked ? homeliked : home}
                    alt="Home"
                    width={32}
                    height={32}
                    className="transition-all duration-200 object-contain"
                  />
                </button>

                {showShareModal && (
                  <div
                    className="absolute bottom-full right-1 mb-2 flex items-center justify-center z-20 animate-fade-in-up "
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="bg-black/70  px-2 py-2.5 flex gap-2 items-center">
                      <button className="hover:scale-110 transition-transform cursor-pointer">
                        <Image
                          src={whatsapp}
                          alt="whatsapp"
                          width={80}
                          height={80}
                        />
                      </button>
                      <button className="hover:scale-110 transition-transform">
                        <Image
                          src={instagram}
                          alt="instagram"
                          width={80}
                          height={80}
                        />
                      </button>
                      <button className="hover:scale-110 transition-transform">
                        <Image
                          src={facebook}
                          alt="facebook"
                          width={80}
                          height={80}
                        />
                      </button>
                      <button className="hover:scale-110 transition-transform">
                        <Image
                          src={message}
                          alt="message"
                          width={80}
                          height={80}
                        />
                      </button>
                    </div>
                  </div>
                )}
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
