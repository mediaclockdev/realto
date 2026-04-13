"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { ImageSource } from "@/lib/shared/types";
import locationIcon from "@/public/location.svg";
import share from "@/public/share.svg";
import home from "@/public/buylikeicon.svg";
import homeliked from "@/public/homelike.svg";
import mobile from "@/public/mobileicon.svg";
import clock from "@/public/clock.svg";
import money from "@/public/money.svg";
import squaremetericon from "@/public/squaremetericon.svg";
import calender from "@/public/calender.svg";
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
  iconImages?: ImageSource[];
  iconLabels?: string[];
}

interface BuyPropertyCardProps {
  property: BuyPropertyCardData;
  onClick?: () => void;
  sliderMode?: boolean;
}

const GOLD_GRADIENT =
  "linear-gradient(90deg, #CB9E33, #EDD06A, #FCEA94, #FADE7B, #FDEE9D, #C29225)";

const BuyPropertyCard: React.FC<BuyPropertyCardProps> = ({
  property,
  onClick,
  sliderMode = false,
}) => {
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
      disabled={isLowerHovered || showShareModal}
      text={
        <PropertySummaryTooltipContent
          location={property.location}
          priceRange={property.priceRange}
        />
      }
    >
      <div
        className={`relative overflow-visible rounded-xl p-0.5 transition-all duration-300 cursor-pointer ${
          sliderMode ? "ml-5 w-[340px] shrink-0 hover:scale-105" : "w-full"
        }`}
        style={{ background: isHovered ? GOLD_GRADIENT : "transparent" }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={onClick}
      >
        <div className="h-full w-full overflow-visible rounded-xl bg-white shadow-md transition-shadow duration-300 hover:shadow-2xl">
          <div className="group/image relative h-52 cursor-pointer overflow-hidden rounded-t-xl bg-gray-200">
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

          <div className="px-2 pt-2 pb-1">
            {property.iconImages && property.iconImages.length > 0 && (
              <div className="mb-1 flex items-center justify-center gap-3 pb-2">
                {property.iconImages.map((icon, index) => (
                  <div key={index} className="flex items-center gap-1.5">
                    <div className="h-12 w-17 shrink-0 overflow-hidden rounded-lg">
                      <Image
                        src={icon}
                        alt=""
                        width={48}
                        height={40}
                        className="h-full w-full"
                      />
                    </div>
                    <span className="text-[15px] font-semibold text-[#FA2F2F]">
                      {property.iconLabels?.[index] ?? "1"}
                    </span>
                  </div>
                ))}
              </div>
            )}

            <div className="flex items-center justify-between">
              <div className="flex min-w-0 items-center gap-0.5">
                <Image
                  src={locationIcon}
                  alt="location"
                  width={40}
                  height={40}
                  className="h-5 w-5 shrink-0 object-contain lg:h-10 lg:w-10"
                />
                <span className="ml-0.5 truncate font-poppins text-sm font-semibold text-gray-800">
                  {property.location}
                </span>
              </div>
              <div className="ml-2 flex shrink-0 items-center gap-1">
                <Image
                  src={squaremetericon}
                  alt="size"
                  width={28}
                  height={28}
                  className="h-5 w-5 shrink-0 object-contain lg:h-7 lg:w-7"
                />
                <p className="ml-1 font-poppins text-base font-semibold text-[#343434]">
                  {property.size}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1 text-gray-600">
              <div className="flex items-center">
                <Image
                  src={property.dateIcon ?? calender}
                  alt="calendericon"
                  width={40}
                  height={40}
                  className="h-4 w-4 shrink-0 object-contain lg:h-10 lg:w-10"
                />
                <span className="ml-1 font-poppins text-base font-semibold text-[#343434]">
                  {property.date}
                </span>
              </div>
              <div className="ml-2 flex items-center">
                <Image
                  src={clock}
                  alt="clockicon"
                  width={40}
                  height={40}
                  className="h-4 w-4 shrink-0 object-contain lg:h-10 lg:w-10"
                />
                <span className="ml-1 font-poppins text-base font-semibold text-[#343434]">
                  {property.time}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                <Image
                  src={money}
                  alt="money icon"
                  width={40}
                  height={40}
                  className="h-10 w-10 object-contain"
                />
                <p className="font-poppins text-base font-semibold text-[#343434]">
                  {property.priceRange}
                </p>
              </div>
              <span className="font-poppins text-base font-semibold text-[#343434]">
                • {property.propertyType}
              </span>
            </div>

            <div
              className="flex flex-col justify-between border-t"
              onMouseEnter={() => setIsLowerHovered(true)}
              onMouseLeave={() => setIsLowerHovered(false)}
            >
              <div>
                <div className="flex items-center justify-between gap-1">
                  <div className="flex items-center gap-1">
                    <Image
                      src={property.agentImage}
                      alt={property.agentName}
                      width={30}
                      height={30}
                      className="shrink-0 rounded-full border-2 border-red-100 object-cover"
                    />
                    <p className="truncate font-poppins text-base font-semibold text-[#FA2F2F]">
                      {property.agentName}
                    </p>
                  </div>
                  <div>
                    <Image
                      src={property.agentCompany}
                      alt="Company logo"
                      width={84}
                      height={40}
                      className="block object-contain"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between gap-1">
                  <div className="flex items-center gap-1">
                    <Image
                      src={mobile}
                      alt="mobile icon"
                      width={32}
                      height={32}
                      className="object-contain"
                    />
                    <p className="font-poppins text-xs font-semibold text-[#FA2F2F]">
                      {property.agentPhone}
                    </p>
                  </div>
                  <div className="text-right font-poppins text-xs font-medium text-[#FA2F2F]">
                    <p>{property.agentLocation}</p>
                  </div>
                </div>
              </div>

              <div>
                <div className="relative flex items-center justify-end">
                  <Tooltip text="Share">
                    <button
                      className="z-10 flex items-center gap-1 rounded-lg px-2 py-1.5 transition-colors hover:bg-blue-50"
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
                      className="z-10 flex cursor-pointer items-center gap-1 rounded-lg px-2 py-1.5 transition-colors hover:bg-red-50"
                      onClick={(e) => {
                        e.stopPropagation();
                        setLiked((prev) => !prev);
                      }}
                    >
                      <Image
                        src={liked ? homeliked : home}
                        alt="Home"
                        width={40}
                        height={40}
                        className="object-contain transition-all duration-200"
                      />
                    </button>
                  </Tooltip>

                  {showShareModal && (
                    <div
                      className="absolute bottom-3 right-28 z-20 flex items-center justify-center animate-fade-in-up"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <ShareMenuActionStrip iconSize={32} />
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

export default BuyPropertyCard;
