"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { ChevronRight, ChevronLeft } from "lucide-react";
import location from "@/public/rentlocation.svg";
import type { ListingVariant } from "@/lib/listings/types";
import type { ListingProperty } from "@/lib/properties/types";
import share from "../../public/landshareicon.svg";
import rentlike from "../../public/rentlike.svg";
import mobile from "../../public/mobileicon.svg";
import clock from "../../public/rentclockicon1.svg";
import money from "../../public/money.svg";
import rentmoney from "../../public/rentmoneyicon.svg";
import calender from "../../public/rentcalender.svg";
import squaremetericon from "../../public/squaremetericon.svg";
import rentshare from "../../public/rentshareicon.svg";
import rentlikedicon from "../../public/rentlikedicon.svg";
import email from "@/public/mailicon.svg";
import landliked from "@/public/landlikedicon.svg";
import landlike from "@/public/landlikeicon.svg";

import BuyPropertyCard from "./BuyPropertyCard";
import {
  Tooltip,
  FollowCursorTooltip,
  PropertySummaryTooltipContent,
  ShareMenuActionStrip,
} from "./PropertyCardTooltip";

interface PropertyListingCardProps {
  property: ListingProperty;
  isMapView?: boolean;
  onClick?: () => void;
  listingVariant?: ListingVariant;
  isLastItem?: boolean;
  onSeeMore?: () => void;
  disableHoverScale?: boolean;
}

const PropertyListingCard: React.FC<PropertyListingCardProps> = ({
  property,
  isMapView = false,
  onClick,
  listingVariant = "buy",
  isLastItem = false,
  onSeeMore,
  disableHoverScale = false,
}) => {
  const [imgIndex, setImgIndex] = useState(0);
  const [liked, setLiked] = useState(false);
  const [isRentLiked, setIsRentLiked] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [isActionAreaHovered, setIsActionAreaHovered] = useState(false);
  const [isAgentAreaHovered, setIsAgentAreaHovered] = useState(false);
  const outerRef = useRef<HTMLDivElement>(null);
  const hoverBorderRent = "linear-gradient(135deg, #DC6D74 0%, #DC6D74 100%)";
  const hoverBorderLand = "linear-gradient(135deg, #2A9A00 0%, #246B05 100%)";

  const next = (e: React.MouseEvent) => {
    e.stopPropagation();
    setImgIndex((p) => (p + 1) % property.images.length);
  };
  const prev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setImgIndex(
      (p) => (p - 1 + property.images.length) % property.images.length,
    );
  };
  console.log("variant:", listingVariant);
  console.log("rent icons:", property.renticonImages);
  console.log("buy icons:", property.buyiconImages);
  if (listingVariant === "buy") {
    return (
      <BuyPropertyCard
        property={{
          id: property.id,
          images: property.images,
          location: property.location,
          size: property.size,
          date: property.date,
          dateIcon: Array.isArray(property.dateicon)
            ? property.dateicon[0]
            : property.dateicon,
          time: property.time,
          priceRange: property.priceRange,
          propertyType: property.propertyType,
          agentName: property.agentName,
          agentCompany: property.agentCompany,
          agentLocation: property.agentLocation,
          agentPhone: property.agentPhone,
          agentEmail: property.agentEmail,
          agentImage: property.agentImage,
          buyiconImages: property.buyiconImages,
          likeIcon: property.likeIcon,
          likedIcon: property.likedIcon,
          hoverBorderGradient: property.hoverBorderGradient,

          iconLabels: property.iconLabels,
        }}
        onClick={onClick}
        isLastItem={isLastItem}
        onSeeMore={onSeeMore}
      />
    );
  }

  if (listingVariant === "rent") {
    return (
      <FollowCursorTooltip
        disabled={
          isActionAreaHovered ||
          isAgentAreaHovered ||
          showShareModal ||
          isLastItem
        }
        text={
          <PropertySummaryTooltipContent
            location={property.location}
            priceRange={property.priceRange}
          />
        }
      >
        <div className="relative">
          <div
            ref={outerRef}
            onClick={onClick}
            className={`rounded-3xl cursor-pointer transition-all duration-300 p-1 ${disableHoverScale ? "" : "hover:scale-[1.02]"} ${showShareModal ? "relative z-50" : ""}`}
            style={{ background: "transparent" }}
            onMouseEnter={() => {
              if (outerRef.current) {
                outerRef.current.style.background =
                  property.hoverBorderGradient ?? hoverBorderRent;
              }
            }}
            onMouseLeave={() => {
              if (outerRef.current) {
                outerRef.current.style.background = "transparent";
              }
            }}
          >
            <div className="relative py-2 px-2 bg-white rounded-3xl shadow-2xl">
              {/* SECTION 1: Agent Banner */}
              <div className="w-full overflow-hidden rounded-[20px] shadow-[0_2px_5px_rgb(0,0,0,0.8)] transition-shadow duration-300">
                <div
                  className="bg-[#ED1C24] px-1"
                  onMouseEnter={() => setIsAgentAreaHovered(true)}
                  onMouseLeave={() => setIsAgentAreaHovered(false)}
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="min-w-0">
                      {" "}
                      <div className="flex items-center gap-3 shrink-0">
                        <Image
                          src={property.agentImage}
                          alt={property.agentName}
                          width={56}
                          height={56}
                          className="rounded-full object-cover size-14 border-2 border-white/40"
                        />
                        <div className="text-right">
                          <p className="text-base font-semibold leading-none font-amasis">
                            {property.agentName}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="">
                      <Image
                        src={property.agentCompany}
                        alt="Company logo"
                        width={100}
                        height={44}
                        className="object-contain"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-1 h-1"></div>

              {/* SECTION 2: Image and Details */}
              <div className="w-full overflow-hidden rounded-[20px] bg-white shadow-[0_2px_5px_rgb(0,0,0,0.8)] transition-shadow duration-300">
                <div className="relative bg-gray-200 group/img shrink-0 h-44 lg:w-full">
                  <Image
                    src={property.images[imgIndex]}
                    alt={`Property in ${property.location}`}
                    fill
                    className="object-cover w-3/4 lg:w-full h-1/4 lg:h-full"
                  />
                  {property.images.length > 1 && (
                    <>
                      <button
                        onClick={prev}
                        className="absolute left-2 top-1/2 -translate-y-1/2 text-black bg-white/80 hover:bg-white rounded-full p-1.5 opacity-0 group-hover/img:opacity-100 transition-opacity"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>
                      <button
                        onClick={next}
                        className="absolute right-2 top-1/2 -translate-y-1/2 text-black bg-white/80 hover:bg-white rounded-full p-1.5 opacity-0 group-hover/img:opacity-100 transition-opacity"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </>
                  )}
                </div>

                <div className="px-2.5 pb-2">
                  {property.renticonImages &&
                    property.renticonImages.length > 0 && (
                      <div className="flex items-center justify-between gap-4 mb-2 mt-1">
                        {property.renticonImages.map((icon, i) => (
                          <div
                            key={i}
                            className="flex items-center justify-between gap-0.5"
                          >
                            <div className="h-14 w-17 shrink-0 overflow-hidden rounded-lg">
                              <Image
                                src={icon}
                                alt=""
                                width={56}
                                height={56}
                                className="w-full h-full"
                              />
                            </div>
                            <span className="text-xl font-bold font-amasis  text-[#343434]">
                              {property.iconLabels?.[i] ?? "1"}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}

                  <div className="flex items-center justify-between gap-2 mb-1">
                    <div className="flex items-center gap-2 min-w-0">
                      <Image
                        src={property.locationIcon ?? location}
                        alt="location"
                        className="w-6 h-9 shrink-0"
                      />
                      <span className="text-base font-semibold font-amasis text-[#343434] truncate">
                        {property.location}
                      </span>
                    </div>
                    <div className="flex items-center shrink-0">
                      <div className="w-10 flex justify-center">
                        <Image
                          src={squaremetericon}
                          alt="size"
                          className="w-7 h-7 shrink-0"
                        />
                      </div>

                      <p className="text-base font-semibold font-amasis text-[#343434]">
                        {property.size}
                        <span className="text-xs">sqft</span>
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-left gap-12 items-center">
                    <div className="flex items-center gap-2 min-w-0">
                      <Image
                        src={calender}
                        alt="money"
                        className="w-7 h-8 shrink-0"
                      />
                      <p className="text-base font-semibold text-[#343434] font-amasis truncate">
                        {property.date}
                      </p>
                    </div>

                    <div className="flex items-center shrink-0">
                      <div className="w-10 flex justify-center">
                        <Image
                          src={property.clockIcon ?? clock}
                          alt="clockicon"
                          width={36}
                          height={36}
                          className="h-9 w-9 object-contain"
                        />
                      </div>

                      <p className="font-amasis text-base font-semibold text-[#343434]">
                        {property.time}
                        <span className="font-amasis text-xs font-semibold ml-1">
                          am
                        </span>
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center justify-left gap-13">
                    <div className="flex items-center gap-2 min-w-0">
                      <Image
                        src={rentmoney}
                        alt="money"
                        className="w-7 h-8 shrink-0"
                      />
                      <p className="text-base font-semibold text-[#343434] font-amasis ">
                        {property.priceRange}
                      </p>
                    </div>
                    <p className="text-base font-semibold font-amasis text-[#007CBE] shrink-0">
                      • {property.propertyType}
                    </p>
                  </div>

                  <div
                    className="flex justify-between items-center"
                    onMouseEnter={() => setIsActionAreaHovered(true)}
                    onMouseLeave={() => setIsActionAreaHovered(false)}
                  >
                    <div className="flex items-center gap-2 ">
                      <Image
                        src={email}
                        alt="email icon"
                        width={36}
                        height={36}
                        className="w-6 h-9 shrink-0"
                      />
                      <p className=" text-base font-semibold leading-none text-[#343434] font-amasis">
                        {property.agentEmail}
                      </p>
                    </div>
                    <div className="flex items-center">
                      <Image
                        src={mobile}
                        alt="mobile icon"
                        width={36}
                        height={36}
                        className="w-5 h-9 shrink-0"
                      />
                      <p className="text-base font-semibold leading-none text-[#343434] font-amasis">
                        {property.agentPhone}
                      </p>
                    </div>
                  </div>

                  <div
                    className="flex items-center justify-between animate-fade-in-u rounded-xl -mt-2"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="mt-2">
                      <ShareMenuActionStrip iconSize={26} />
                    </div>
                    <div className="flex">
                      <Tooltip text="Share">
                        <button
                          className="pl-0.5 pt-1.5 pb-0.5 hover:bg-blue-50 rounded-lg transition-colors"
                          onClick={(e) => {
                            e.stopPropagation();
                            setShowShareModal((prev) => !prev);
                          }}
                        >
                          <Image
                            src={rentshare}
                            alt="Share"
                            width={36}
                            height={36}
                          />
                        </button>
                      </Tooltip>
                      <Tooltip text="Like">
                        <button
                          className="pl-0.5 pt-0.5 pb-0.5 hover:bg-red-50 rounded-lg transition-colors"
                          onClick={(e) => {
                            e.stopPropagation();
                            setIsRentLiked((prev) => !prev);
                          }}
                        >
                          <Image
                            src={
                              isRentLiked
                                ? (property.likedIcon ?? rentlikedicon)
                                : (property.likeIcon ?? rentlike)
                            }
                            alt="Like"
                            width={40}
                            height={40}
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
                backdropFilter: "blur(2px)",
                WebkitBackdropFilter: "blur(2px)",
                backgroundColor: "rgba(255,255,255,0.3)",
              }}
              onClick={(e) => {
                e.stopPropagation();
                onSeeMore?.();
              }}
            >
              <Image
                src="/seemoreicon.svg"
                alt="See More"
                width={300}
                height={300}
                className="w-3/4 h-auto"
              />
            </div>
          )}
        </div>
      </FollowCursorTooltip>
    );
  }

  return (
    <FollowCursorTooltip
      disabled={isActionAreaHovered || showShareModal || isLastItem}
      text={
        <PropertySummaryTooltipContent
          location={property.location}
          priceRange={property.priceRange}
        />
      }
    >
      <div className="relative">
        <div
          ref={outerRef}
          onClick={onClick}
          className={`rounded-[14px] cursor-pointer transition-all duration-300 hover:scale-[1.02] p-[2px] ${showShareModal ? "relative z-50" : ""}`}
          style={{ background: "transparent" }}
          onMouseEnter={() => {
            if (outerRef.current) {
              outerRef.current.style.background = hoverBorderLand;
            }
          }}
          onMouseLeave={() => {
            if (outerRef.current) {
              outerRef.current.style.background = "transparent";
            }
          }}
        >
          <div
            className={`bg-white rounded-xl overflow-visible shadow-sm hover:shadow-md border border-gray-100 transition-shadow duration-200 ${
              isMapView ? "flex flex-row" : "flex flex-col"
            }`}
          >
            {/* Image */}
            <div
              className={`relative bg-gray-200 group/img shrink-0 overflow-hidden ${
                isMapView
                  ? "w-40 sm:w-48 h-auto rounded-l-xl"
                  : "h-44 lg:w-full rounded-t-xl"
              }`}
            >
              <Image
                src={property.images[imgIndex]}
                alt={`Property in ${property.location}`}
                fill
                className="object-cover w-3/4 lg:w-full h-1/4 lg:h-full"
              />
              {property.images.length > 1 && (
                <>
                  <button
                    onClick={prev}
                    className="absolute left-1.5 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-1 opacity-0 group-hover/img:opacity-100 transition-opacity"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={next}
                    className="absolute right-1.5 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-1 opacity-0 group-hover/img:opacity-100 transition-opacity"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </>
              )}
            </div>

            {/* Content */}
            <div className="px-3  pb-1 flex flex-col flex-1">
              {/* Icons row */}
              {property.renticonImages && (
                <div className="flex items-center gap-2.5 ">
                  {property.renticonImages.map((icon, i) => (
                    <div key={i} className="flex items-center gap-1">
                      <div className="w-14 h-10 rounded-xl overflow-hidden ">
                        <Image
                          src={icon}
                          alt=""
                          width={48}
                          height={40}
                          className="w-full h-full"
                        />
                      </div>
                      <span className="text-xs font-semibold labeltext text-gray-700">
                        {property.iconLabels?.[i] ?? "1"}
                      </span>
                    </div>
                  ))}
                </div>
              )}
              {/* Location + size */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 min-w-0">
                  <Image
                    src={property.locationIcon ?? location}
                    alt="location"
                    width={32}
                    height={40}
                    className="w-8 h-10 shrink-0"
                  />
                  <span className="font-semibold font-amasis text-gray-800 text-sm truncate">
                    {property.location}
                  </span>
                </div>
                <div className="flex items-center gap-1 ml-2 shrink-0">
                  <Image
                    src={squaremetericon}
                    alt="size"
                    width={32}
                    height={32}
                    className="w-8 h-8 shrink-0"
                  />
                  <span className="text-[#343434] font-semibold  font-amasis text-base">
                    {property.size}
                  </span>
                </div>
              </div>
              {listingVariant !== "land" && (
                <div className="flex items-center gap-3 mb-1 text-gray-500">
                  <div className="flex items-center gap-1">
                    <Image
                      src={calender}
                      alt=""
                      width={32}
                      height={32}
                      className="w-8 h-8 shrink-0"
                    />
                    <p className="text-[#343434] font-semibold font-amasis text-base">
                      {property.date}
                    </p>
                  </div>
                  <div className="flex items-center gap-1">
                    <Image
                      src={property.clockIcon ?? clock}
                      alt=""
                      width={32}
                      height={32}
                      className="w-8 h-8 shrink-0"
                    />
                    <p className="text-[#343434] font-semibold font-amasis text-base">
                      {property.time}
                    </p>
                  </div>
                </div>
              )}
              {/* Price + type */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 min-w-0">
                  <Image
                    src={money}
                    alt="money icon"
                    width={40}
                    height={40}
                    className="w-10 h-10 shrink-0"
                  />
                  <p className="text-[#343434] font-semibold font-amasis text-base">
                    {property.priceRange}
                  </p>
                </div>
                <span className="text-[#007CBE] font-semibold font-amasis text-base">
                  • {property.propertyType}
                </span>
              </div>
              {/* Agent */}
              <div
                onMouseEnter={() => setIsActionAreaHovered(true)}
                onMouseLeave={() => setIsActionAreaHovered(false)}
              >
                {/* Row: agent photo + name/phone | company + location */}
                <div className="flex items-center justify-between gap-1 mt-1">
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

                {/* Share + Like icons right-aligned */}
                <div className=" flex items-center justify-between">
                  <div
                    className="z-20 flex items-center justify-center animate-fade-in-up ml-1 mt-1"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <ShareMenuActionStrip iconSize={28} />
                  </div>
                  <div className="flex items-center animate-fade-in-up">
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
                              ? (property.likedIcon ?? landliked)
                              : (property.likeIcon ?? landlike)
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
              backdropFilter: "blur(2px)",
              WebkitBackdropFilter: "blur(2px)",
              backgroundColor: "rgba(255,255,255,0.3)",
            }}
            onClick={(e) => {
              e.stopPropagation();
              onSeeMore?.();
            }}
          >
            <Image
              src="/seemoreicon.svg"
              alt="See More"
              width={300}
              height={300}
              className="w-3/4 h-auto"
            />
          </div>
        )}
      </div>
    </FollowCursorTooltip>
  );
};

export default PropertyListingCard;
