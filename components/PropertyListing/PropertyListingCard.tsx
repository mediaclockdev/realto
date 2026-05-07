"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { ChevronRight, ChevronLeft } from "lucide-react";
import location from "@/public/rentlocation.svg";
import type { ListingVariant } from "@/lib/listings/types";
import type { ListingProperty } from "@/lib/properties/types";
import share from "../../public/share.svg";
import rentlike from "../../public/rentlike.svg";
import buylikeicon from "../../public/buylikeicon.svg";
import mobile from "../../public/mobileicon.svg";
import mail from "../../public/mailicon.svg";
import clock from "../../public/rentclock.svg";
import money from "../../public/money.svg";
import rentmoney from "../../public/rentmoneyicon.svg";
import calender from "../../public/rentcalender.svg";
import squaremetericon from "../../public/squaremetericon.svg";
import rentshare from "../../public/share.svg";
import rentlikedicon from "../../public/rentlikedicon.svg";
import homeliked from "@/public/homelike.svg";

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
}

const PropertyListingCard: React.FC<PropertyListingCardProps> = ({
  property,
  isMapView = false,
  onClick,
  listingVariant = "buy",
  isLastItem = false,
  onSeeMore,
}) => {
  const [imgIndex, setImgIndex] = useState(0);
  const [liked, setLiked] = useState(false);
  const [isRentLiked, setIsRentLiked] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [isActionAreaHovered, setIsActionAreaHovered] = useState(false);
  const [isAgentAreaHovered, setIsAgentAreaHovered] = useState(false);
  const outerRef = useRef<HTMLDivElement>(null);
  const hoverBorderRent = "linear-gradient(135deg, #C0C0C0 0%, #D1D5DB 100%)";
  const hoverBorderBuy = "linear-gradient(135deg, #f6d365 0%, #fda085 100%)";

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
            className={`rounded-[24px] cursor-pointer transition-all duration-300 hover:scale-[1.02] p-[4px] ${showShareModal ? "relative z-50" : ""}`}
            style={{ background: "transparent" }}
            onMouseEnter={() => {
              if (outerRef.current) {
                outerRef.current.style.background = hoverBorderRent;
              }
            }}
            onMouseLeave={() => {
              if (outerRef.current) {
                outerRef.current.style.background = "transparent";
              }
            }}
          >
            <div className="bg-white rounded-[22px] overflow-visible shadow-[0_12px_30px_rgba(0,0,0,0.16)] border border-[#e7e7e7] transition-shadow duration-200">
              <div
                className="bg-[#ED1C24] px-3 rounded-t-[22px] overflow-hidden"
                onMouseEnter={() => setIsAgentAreaHovered(true)}
                onMouseLeave={() => setIsAgentAreaHovered(false)}
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="min-w-0">
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

                  <div className="flex items-center gap-3 shrink-0">
                    <div className="text-right">
                      <p className="text-base font-semibold leading-none font-amasis">
                        {property.agentName}
                      </p>
                    </div>
                    <Image
                      src={property.agentImage}
                      alt={property.agentName}
                      width={40}
                      height={40}
                      className="rounded-full object-cover size-10 border-2 border-white/40"
                    />
                  </div>
                </div>
              </div>

              <div className="relative bg-gray-200 group/img shrink-0 h-44  lg:w-full -mt-1.5">
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

              <div className="px-2.5 pt-2 pb-2">
                {property.renticonImages &&
                  property.renticonImages.length > 0 && (
                    <div className="flex items-center justify-between gap-4 mb-2">
                      {property.renticonImages.map((icon, i) => (
                        <div
                          key={i}
                          className="flex items-center justify-between gap-0.5"
                        >
                          <div className="h-12 w-17 shrink-0 overflow-hidden rounded-lg">
                            <Image
                              src={icon}
                              alt=""
                              width={48}
                              height={40}
                              className="w-full h-full"
                            />
                          </div>
                          <span className="text-xl font-semibold labeltext text-[#343434]">
                            {property.iconLabels?.[i] ?? "1"}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}

                <div className="flex items-center justify-between gap-2 mb-1">
                  <div className="flex items-center gap-2 min-w-0">
                    <Image
                      src={location}
                      alt="location"
                      className="w-6 h-9 shrink-0"
                    />
                    <span className="text-base font-semibold font-amasis text-[#343434] truncate">
                      {property.location}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <Image
                      src={squaremetericon}
                      alt="size"
                      className="w-7 h-7 shrink-0"
                    />
                    <p className="text-base font-semibold font-amasis text-[#343434]">
                      {property.size}
                      <span className="text-xs">sqft</span>
                    </p>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2 min-w-0">
                    <Image
                      src={calender}
                      alt="money"
                      className="w-8 h-8 shrink-0"
                    />
                    <p className="text-base font-semibold text-[#343434] font-amasis truncate">
                      {property.date}
                    </p>
                  </div>
                  <div className=" flex items-center">
                    <Image
                      src={clock}
                      alt="clockicon"
                      width={36}
                      height={36}
                      className="h-9 w-9 object-contain"
                    />
                    <p className="ml-1 font-amasis text-base font-semibold text-[#343434]">
                      {property.time}{" "}
                      <span className="font-amasis text-xs font-semibold">
                        am
                      </span>
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-24 ">
                  <div className="flex items-center gap-2 min-w-0">
                    <Image
                      src={rentmoney}
                      alt="money"
                      className="w-8 h-8 shrink-0"
                    />
                    <p className="text-base font-semibold text-[#343434] font-amasis truncate">
                      {property.priceRange}
                    </p>
                  </div>
                  <p className="text-base font-semibold  font-amasis text-[#007CBE] shrink-0">
                    • {property.propertyType}
                  </p>
                </div>

                <div
                  className="flex justify-between items-center"
                  onMouseEnter={() => setIsActionAreaHovered(true)}
                  onMouseLeave={() => setIsActionAreaHovered(false)}
                >
                  <div className="flex items-center">
                    <Image src={mobile} alt="mobile icon" />
                    <p className=" text-base font-semibold leading-none text-[#343434] font-amasis">
                      {property.agentPhone}
                    </p>
                  </div>
                  <div className="relative flex">
                    <Tooltip text="Share">
                      <button
                        className="p-1 hover:bg-blue-50 rounded-lg transition-colors"
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
                          src={isRentLiked ? rentlikedicon : rentlike}
                          alt="Like"
                          width={40}
                          height={40}
                        />
                      </button>
                    </Tooltip>
                    {showShareModal && (
                      <div
                        className="absolute bottom-10 right-0 z-[100] flex items-center gap-1 justify-center animate-fade-in-up bg-white px-1 py-1 rounded-xl shadow-lg border border-gray-100"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <ShareMenuActionStrip iconSize={24} />
                      </div>
                    )}
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
              outerRef.current.style.background = hoverBorderBuy;
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
            <div className="px-3 pt-2 pb-3 flex flex-col flex-1">
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
                <div className="flex items-center gap-1.5 min-w-0 my-1">
                  <Image
                    src={location}
                    alt="location"
                    className="w-4 h-6 shrink-0"
                  />
                  <span className="font-semibold font-amasis text-gray-800 text-sm truncate">
                    {property.location}
                  </span>
                </div>
                <div className="flex items-center gap-1 ml-2 shrink-0">
                  <Image
                    src={squaremetericon}
                    alt="location"
                    className="w-6 h-6 shrink-0"
                  />
                  <span className="text-[#343434] font-semibold  font-amasis text-base">
                    {property.size}
                  </span>
                </div>
              </div>

              {listingVariant !== "land" && (
                <div className="flex items-center gap-3 mb-1 text-gray-500">
                  <div className="flex items-center gap-1">
                    <Image src={calender} alt="" className="w-8 h-8 shrink-0" />
                    <p className="text-[#343434] font-semibold font-amasis text-base">
                      {property.date}
                    </p>
                  </div>
                  <div className="flex items-center gap-1">
                    <Image src={clock} alt="" className="w-8 h-8 shrink-0" />
                    <p className="text-[#343434] font-semibold font-amasis text-base">
                      {property.time}
                    </p>
                  </div>
                </div>
              )}

              {/* Price + type */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <Image
                    src={money}
                    alt="money icon"
                    className="w-8 h-8 shrink-0"
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
                className="flex items-center justify-between"
                onMouseEnter={() => setIsActionAreaHovered(true)}
                onMouseLeave={() => setIsActionAreaHovered(false)}
              >
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
                    <p className="font-bold font-amasis text-red-500 text-base truncate">
                      {property.agentName}
                    </p>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-gray-600 mt-1">
                    <Image src={mobile} alt="" width={20} height={20} />
                    <span>{property.agentPhone}</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-blue-600 mt-1">
                    <Image src={mail} alt="" width={20} height={20} />
                    <span className="truncate font-amasis">
                      {property.agentEmail}
                    </span>
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

                  <div className="text-xs text-red-600 font-medium font-amasis">
                    <p>{property.agentLocation}</p>
                  </div>
                  <div className="relative flex items-center gap-1">
                    <Tooltip text="Share">
                      <button
                        className="flex items-center gap-1 px-2 py-1.5 hover:bg-blue-50 rounded-lg transition-colors text-xs text-blue-600 font-medium font-amasis"
                        onClick={(e) => {
                          e.stopPropagation();
                          setShowShareModal((prev) => !prev);
                        }}
                      >
                        <Image src={share} alt="Share" width={28} height={28} />
                      </button>
                    </Tooltip>
                    <Tooltip text="Like">
                      <button
                        className="flex items-center gap-1 px-2 py-1.5 hover:bg-red-50 rounded-lg transition-colors text-xs text-red-500 font-medium font-amasis"
                        onClick={(e) => {
                          e.stopPropagation();
                          setLiked((prev) => !prev);
                        }}
                      >
                        <Image
                          src={liked ? homeliked : buylikeicon}
                          alt="Home"
                          width={28}
                          height={28}
                          className="transition-all duration-200"
                        />
                      </button>
                    </Tooltip>
                    {showShareModal && (
                      <div
                        className="absolute bottom-20 right-0 z-[100] flex items-center justify-center animate-fade-in-up bg-white p-2 rounded-xl shadow-lg border border-gray-100"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <ShareMenuActionStrip iconSize={28} />
                      </div>
                    )}
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

export default PropertyListingCard;
