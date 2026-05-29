"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { ImageSource } from "@/lib/shared/types";
import defaultLocationIcon from "@/public/location.svg";

import share from "@/public/share.svg";
import home from "@/public/buylikeicon.svg";
import homeliked from "@/public/homelike.svg";
// import mobile from "@/public/mobileicon.svg";
import clock from "@/public/buyclock.svg";
import money from "@/public/money.svg";
import squaremetericon from "@/public/squaremetericon.svg";
import calender from "@/public/buycalender.svg";
import {
  Tooltip,
  FollowCursorTooltip,
  PropertySummaryTooltipContent,
  ShareMenuActionStrip,
} from "./PropertyCardTooltip";

export interface BuyPropertyCardData {
  id: string;
  images: ImageSource[];
  location: string;
  size: string;
  date: string;
  dateIcon?: ImageSource;
  time: string;
  priceRange: string;
  propertyType: string;
  agentName: string;
  agentCompany: ImageSource;
  agentLocation: string;
  agentPhone: string;
  agentEmail: string;
  agentImage: ImageSource;
  locationIcon?: ImageSource;
  buyiconImages?: ImageSource[];
  clockIcon?: ImageSource;
  iconLabels?: string[];
  likeIcon?: ImageSource;
  likedIcon?: ImageSource;
  hoverBorderGradient?: string;

  isLastItem?: boolean;
  onSeeMore?: () => void;
}

interface BuyPropertyCardProps {
  property: BuyPropertyCardData;
  onClick?: () => void;
  sliderMode?: boolean;
  isLastItem?: boolean;
  onSeeMore?: () => void;
}

const GOLD_GRADIENT =
  "linear-gradient(90deg, #7F1D1D, #B91C1C, #DC2626, #EF4444, #F87171, #991B1B)";

const BuyPropertyCard: React.FC<BuyPropertyCardProps> = ({
  property,
  onClick,
  sliderMode = false,
  isLastItem = false,
  onSeeMore,
}) => {
  const [isLowerHovered, setIsLowerHovered] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [liked, setLiked] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (!property?.images?.length) return;

    const interval = setInterval(() => {
      setCurrentImageIndex((prev) =>
        prev === property.images.length - 1 ? 0 : prev + 1,
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [property.images]);
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
      disabled={isLowerHovered || showShareModal || isLastItem}
      text={
        <PropertySummaryTooltipContent
          location={property.location}
          priceRange={property.priceRange}
        />
      }
    >
      <div
        className={`relative overflow-visible rounded-xl p-0.5 transition-all duration-300 cursor-pointer my-3 ${
          sliderMode ? " w-[340px] shrink-0 hover:scale-105" : "w-full"
        }`}
        style={{
          background: isHovered
            ? (property.hoverBorderGradient ?? GOLD_GRADIENT)
            : "transparent",
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={onClick}
      >
        <div className="relative py-2 px-2 bg-white rounded-xl shadow-2xl">
          <div className="h-full w-full overflow-visible rounded-xl bg-white shadow-xl transition-shadow duration-300 hover:shadow-2xl">
            <div className="group/image relative h-52 cursor-pointer overflow-hidden rounded-t-xl bg-gray-200">
              <Image
                src={property.images[currentImageIndex]}
                alt={`Property in ${property.location}`}
                fill
                className="object-cover transition-opacity duration-700"
              />

              {property.images.length > 1 && (
                <>
                  <button
                    onClick={handlePrevImage}
                    className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 opacity-0 transition-opacity group-hover/image:opacity-100 hover:bg-white"
                  >
                    <ChevronLeft className="h-4 w-4 text-black" />
                  </button>
                  <button
                    onClick={handleNextImage}
                    className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 opacity-0 transition-opacity group-hover/image:opacity-100 hover:bg-white"
                  >
                    <ChevronRight className="h-4 w-4 text-black" />
                  </button>
                </>
              )}
            </div>

            <div className="px-2 pb-1">
              {property.buyiconImages && property.buyiconImages.length > 0 && (
                <div className="mb-1 flex items-center justify-between gap-3">
                  {property.buyiconImages.map((icon, index) => (
                    <div key={index} className="flex items-center  gap-0.5">
                      <div className="h-14 w-18aw3aw33wa3wwwa shrink-0 overflow-hidden rounded-lg">
                        <Image
                          src={icon}
                          alt="icons for bed , bath , car"
                          width={60}
                          height={56}
                          className="h-full w-full"
                        />
                      </div>
                      <span className="text-[15px] font-bold font-amasis text-[#FA2F2F]">
                        {property.iconLabels?.[index] ?? "1"}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              <div className="flex items-center justify-between">
                <div className="flex min-w-0 items-center gap-0.5">
                  <Image
                    src={property.locationIcon ?? defaultLocationIcon}
                    alt="location"
                    width={40}
                    height={40}
                    className="shrink-0 object-contain h-10 w-10"
                  />
                  <span className="ml-0.5 truncate font-amasis text-sm font-semibold text-gray-800">
                    {property.location}
                  </span>
                </div>
                <div className=" flex shrink-0 items-center gap-3">
                  <Image
                    src={squaremetericon}
                    alt="size"
                    width={28}
                    height={28}
                    className="shrink-0 object-contain h-7 w-7"
                  />
                  <p className=" font-amasis text-base font-semibold text-[#343434]">
                    {property.size}
                    <span className="text-xs">sqft</span>
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between gap-1 text-gray-600 mt-1">
                <div className="flex items-center">
                  <Image
                    src={property.dateIcon ?? calender}
                    alt="calendericon"
                    width={36}
                    height={36}
                    className="h-9 w-9 object-contain"
                  />
                  <span className="ml-1 font-amasis text-base font-semibold text-[#343434]">
                    {property.date}
                  </span>
                </div>
                <div className=" flex items-center">
                  <Image
                    src={property.clockIcon ?? clock}
                    alt="clockicon"
                    width={40}
                    height={40}
                    className="h-10 w-10 object-contain"
                  />

                  <p className="ml-1 font-amasis text-base font-semibold text-[#343434]">
                    {property.time}
                    <span className="text-xs"> am</span>
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <Image
                    src={money}
                    alt="money icon"
                    width={52}
                    height={52}
                    className="h-13 w-13 object-contain"
                  />
                  <p className="font-amasis text-base font-semibold text-[#343434]">
                    {property.priceRange}
                  </p>
                </div>
                <span className="font-amasis text-base font-semibold text-[#007CBE] mr-2">
                  • {property.propertyType}
                </span>
              </div>
            </div>
          </div>
          <div className="mt-[2px] h-[2px]"></div>
          <div
            className="flex flex-col justify-between shadow-sm rounded-xl bg-white hover:shadow-2xl px-2 pb-1"
            onMouseEnter={() => setIsLowerHovered(true)}
            onMouseLeave={() => setIsLowerHovered(false)}
          >
            <div className="">
              <div>
                <div className="flex items-center justify-between gap-1">
                  <div className="flex items-center gap-1 mt-1">
                    <Image
                      src={property.agentImage}
                      alt={property.agentName}
                      width={60}
                      height={60}
                      className="shrink-0 rounded-full border-2 border-red-100 object-cover"
                    />
                    <div className="space-y-1">
                      <p className="truncate font-amasis text-base font-semibold text-[#FA2F2F]">
                        {property.agentName}
                      </p>
                      <p className="font-amasis text-xs font-semibold text-[#FA2F2F]">
                        {property.agentPhone}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col items-center">
                    <Image
                      src={property.agentCompany}
                      alt="Company logo"
                      width={80}
                      height={40}
                      className="block object-contain"
                    />

                    <p className="text-right font-amasis text-xs font-medium text-[#FA2F2F]">
                      {property.agentLocation}
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <div
                    className=" z-20 flex items-center justify-center animate-fade-in-up mt-2 ml-1"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <ShareMenuActionStrip iconSize={28} />
                  </div>
                  <div className="flex items-center">
                    <Tooltip text="Share">
                      <button
                        className="z-10 flex items-center gap-1 rounded-lg px-0.5 py-0.5 transition-colors hover:bg-blue-50"
                        onClick={(e) => {
                          e.stopPropagation();
                          setShowShareModal((prev) => !prev);
                        }}
                      >
                        <Image
                          src={share}
                          alt="Share"
                          width={40}
                          height={40}
                          className="cursor-pointer object-contain transition-all duration-200"
                        />
                      </button>
                    </Tooltip>

                    <Tooltip text="Like">
                      <button
                        className="z-10 flex cursor-pointer items-center gap-1 rounded-lg px-0.5 py-0.5 transition-colors hover:bg-red-50"
                        onClick={(e) => {
                          e.stopPropagation();
                          setLiked((prev) => !prev);
                        }}
                      >
                        <Image
                          src={
                            liked
                              ? (property.likedIcon ?? homeliked)
                              : (property.likeIcon ?? home)
                          }
                          alt="Home"
                          width={40}
                          height={40}
                          className="object-contain transition-all duration-200"
                        />
                      </button>
                    </Tooltip>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {isLastItem && (
          <div
            className="absolute inset-0 z-30 flex items-center justify-center rounded-xl cursor-pointer"
            style={{
              backdropFilter: "blur(6px)",
              WebkitBackdropFilter: "blur(6px)",
              backgroundColor: "rgba(255,255,255,0.3)",
            }}
            onClick={(e) => {
              e.stopPropagation();
              onSeeMore?.();
            }}
          >
            <span className="font-amasis text-2xl font-bold text-[#1a1a1a] drop-shadow-sm">
              See More
            </span>
          </div>
        )}
      </div>
    </FollowCursorTooltip>
  );
};

export default BuyPropertyCard;
