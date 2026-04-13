"use client";

import React, { ReactNode, useRef, useState } from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";
import locationIcon from "../../public/location.svg";
import Image from "next/image";
import share from "../../public/share.svg";
import home from "../../public/buylikeicon.svg";
import homeliked from "../../public/homelike.svg";
import mobile from "../../public/mobileicon.svg";

import clock from "../../public/clock.svg";
import money from "../../public/money.svg";
import squaremetericon from "../../public/squaremetericon.svg";
import { ImageSource } from "@/lib/shared/types";
import whatsapp from "@/public/whatsapp.svg";
import instagram from "@/public/logos_instagram.svg";
import facebook from "../../public/logos_facebook.svg";
import message from "../../public/mailicon.svg";

type TooltipProps = {
  text: string | ReactNode;
  children: ReactNode;
};

const Tooltip = ({ text, children }: TooltipProps) => {
  const [visible, setVisible] = useState(false);

  return (
    <div
      className="relative flex items-center justify-center"
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      {children}
      {visible && (
        <span
          style={{ background: "rgba(20, 20, 20, 0.75)" }}
          className="absolute bottom-full mb-2 whitespace-nowrap text-white text-xs rounded-[5px] px-1.5 py-0.5 shadow-lg animate-fade-in pointer-events-none z-30 backdrop-blur-md border border-white/20"
        >
          {text}
        </span>
      )}
    </div>
  );
};
const FollowCursorTooltip = ({
  text,
  children,
  disabled,
}: TooltipProps & { disabled?: boolean }) => {
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null);

  return (
    <div
      onMouseMove={(e) => {
        if (disabled) return;
        setPos({ x: e.clientX, y: e.clientY });
      }}
      onMouseLeave={() => setPos(null)}
    >
      {children}
      {pos && !disabled && (
        <div
          className="fixed z-50 pointer-events-none text-white text-xs rounded px-3 py-1.5 shadow-lg whitespace-nowrap backdrop-blur-md border border-white/20"
          style={{
            top: pos.y - 14,
            left: pos.x + 12,
            background: "rgba(0,0,0,0.25)",
          }}
        >
          {text}
        </div>
      )}
    </div>
  );
};

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
    <div className="relative group overflow-visible">
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
        className="flex gap-6 overflow-x-auto overflow-y-visible scrollbar-hide scroll-smooth py-7 px-0 lg:px-2"
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
  const [isLowerHovered, setIsLowerHovered] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [liked, setLiked] = useState(false);
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
    <FollowCursorTooltip
      disabled={isLowerHovered}
      text={
        <div className="flex items-center gap-1">
          <div className="flex items-center">
            <Image src={locationIcon} alt="location icon" />
            <p>{property.location}</p>
          </div>
          <div className="flex items-center">
            <Image src={money} alt="price icon" />
            <p>·{property.priceRange}</p>
          </div>
        </div>
      }
    >
      <div
        className="overflow-visible shrink-0 w-[340px] rounded-xl transition-all duration-300 hover:scale-105 p-0.5 cursor-pointer relative ml-5"
        style={{ background: isHovered ? GOLD_GRADIENT : "transparent" }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => onCardClick?.(property)}
      >
        {/* Inner: white card */}
        <div className="bg-white rounded-xl overflow-visible shadow-md hover:shadow-2xl transition-shadow duration-300 w-full h-full ">
          {/* Image Section */}
          <div className="relative h-52 bg-gray-200 group/image cursor-pointer  rounded-t-xl overflow-hidden">
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

            {/* {property.images.length > 1 && (
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
          )} */}
          </div>

          {/* Content Section */}
          <div className="px-2 pt-2 pb-1">
            {/* Icon Preview Images */}
            {property.iconImages && property.iconImages.length > 0 && (
              <div className="flex items-center justify-center gap-3 mb-1 pb-2">
                {property.iconImages.map((icon, index) => (
                  <div key={index} className="flex items-center  gap-1.5">
                    <div className="w-17 h-12 rounded-lg overflow-hidden shrink-0">
                      <Image
                        src={icon}
                        alt=""
                        width={48}
                        height={40}
                        className="w-full h-full"
                      />
                    </div>
                    <span className="text-[15px] font-semibold text-[#FA2F2F] font-">
                      {property.iconLabels?.[index] ?? "1"}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {/* Location and Size */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-0.5 min-w-0">
                <Image
                  src={locationIcon}
                  alt="location"
                  width={40}
                  height={40}
                  className="w-5 h-5 lg:w-10 lg:h-10 shrink-0 object-contain"
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
            <div className="flex items-center gap-1 text-gray-600">
              <div className="flex items-center">
                <Image
                  src={property.dateicon}
                  alt="calendericon"
                  width={40}
                  height={40}
                  className="w-4 h-4 lg:w-10 lg:h-10 shrink-0 object-contain"
                />
                <span className="text-[#343434] font-semibold font-poppins text-base ml-1">
                  {property.date}
                </span>
              </div>
              <div className="flex items-center ml-2">
                <Image
                  src={clock}
                  alt="clockicon"
                  width={40}
                  height={40}
                  className="w-4 h-4 lg:w-10 lg:h-10 shrink-0 object-contain"
                />
                <span className="text-[#343434] font-semibold font-poppins text-base ml-1">
                  {property.time}
                </span>
              </div>
            </div>

            {/* Price and Property Type */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                <Image
                  src={money}
                  alt="money icon"
                  width={40}
                  height={40}
                  className="w-10 h-10 object-contain"
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
            <div
              className="flex  flex-col justify-between border-t "
              onMouseEnter={() => setIsLowerHovered(true)}
              onMouseLeave={() => setIsLowerHovered(false)}
            >
              {/* Agent Info */}
              <div>
                <div className="flex gap-1 items-center justify-between ">
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
                  <div>
                    <Image
                      src={property.agentCompany}
                      alt="Company logo"
                      width={84}
                      height={40}
                      className="object-contain block"
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between gap-1  ">
                  <div className="flex items-center gap-1">
                    <Image
                      src={mobile}
                      alt="mobile icon"
                      width={32}
                      height={32}
                      className="object-contain"
                    />
                    <p className="font-semibold font-poppins text-[#FA2F2F] text-xs">
                      {property.agentPhone}
                    </p>
                  </div>
                  <div className="text-xs text-[#FA2F2F] font-medium font-poppins text-right">
                    <p>{property.agentLocation}</p>
                  </div>
                </div>
                {/* <div className="flex items-center gap-1 mt-1">
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
              </div> */}
              </div>

              {/* Company + Actions */}
              <div>
                {/* <Image
                src={property.agentCompany}
                alt="Company logo"
                width={80}
                height={36}
                className="object-contain block mx-auto"
              /> */}
                {/* <div className="text-xs text-[#FA2F2F] font-medium font-poppins text-right">
                <p>{property.agentLocation}</p>
              </div> */}

                <div className="flex items-center justify-end relative">
                  <Tooltip text="Share">
                    <button
                      className="flex items-center gap-1 px-2 py-1.5 hover:bg-blue-50 rounded-lg transition-colors z-10"
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowShareModal(!showShareModal);
                      }}
                    >
                      <Image
                        src={share}
                        alt="Share"
                        width={40}
                        height={40}
                        className="transition-all duration-200 object-contain cursor-pointer"
                      />
                    </button>
                  </Tooltip>
                  <Tooltip text="Like">
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
                        width={40}
                        height={40}
                        className="transition-all duration-200 object-contain"
                      />
                    </button>
                  </Tooltip>

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
    </FollowCursorTooltip>
  );
};
