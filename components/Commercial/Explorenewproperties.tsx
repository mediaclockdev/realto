"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import elder from "../../public/elderrealestate.svg";

// ==========================================
// LOCAL ICONS - CHANGE THESE PATHS TO REPLACE
// ICONS FOR THE COMMERCIAL NEW PROPERTIES CARD
// Changing icons here will NOT affect BuyPropertyCard
// ==========================================
import defaultLocationIcon from "@/public/commerciallocationicon.svg";
import defaultCalendarIcon from "@/public/commercialcalender.svg";
import defaultMoneyIcon from "@/public/money.svg";
import defaultSquareMeterIcon from "@/public/squaremetericon.svg";
import defaultShareIcon from "@/public/commercialshareicon.svg";
import defaultLikeOutlineIcon from "@/public/commerciallikeicon.svg";
import defaultLikeFilledIcon from "@/public/commerciallikedicon.svg";
import mailicon from "@/public/commercialmailicon.svg";

// ==========================================
// FEATURE ICONS
// Property Type Icon - CHANGE THIS to a warehouse/office/factory etc. icon
// Currently using bedroom.svg as placeholder
// ==========================================
import defaultPropertyIcon from "@/public/commercialretailicon.svg";
import defaultPropertyIcon2 from "@/public/commercialofficeicon.svg";
import defaultCarIcon from "@/public/commercialcaricon.svg";

// ==========================================
// SOCIAL MEDIA ICONS (Local SVGs)
// Change these to update social icons for commercial cards only
// ==========================================
import socialIconWhatsApp from "@/public/whatsapp.svg";
import socialIconInstagram from "@/public/logos_instagram.svg";
import socialIconTikTok from "@/public/tiktok.svg";
import socialIconWeChat from "@/public/wechat.svg";
import socialIconSnapchat from "@/public/snapchat.svg";
import socialIconLinkedIn from "@/public/logos_linkedin.svg";

// Property images for mock data
import new1 from "../../public/new1.svg";
import new2 from "../../public/new2.svg";
import new3 from "../../public/new3.svg";
import agent1 from "../../public/agentimg1.jpg";
import agent2 from "../../public/agentimg2.jpg";
import agent3 from "../../public/agentimg3.jpg";
import { ImageSource } from "@/lib/shared/types";

interface PropertyData {
  id: string;
  images: ImageSource[];
  agentName: string;
  agentPhone: string;
  agentEmail: string;
  agentImage: ImageSource;
  agencyLogoText: string;
  propertyType: string;
  carSpaces: string;
  size: string;
  address: string;
  day: string;
  date: string;
  time: string;
  price: string;
  listingType: "Buy" | "Lease";
}

const GOLD_GRADIENT =
  "linear-gradient(90deg, #000000, #000000, #000000, #000000, #000000, #000000)";

const CommercialPropertyCard: React.FC<{
  property: PropertyData;
  index: number;
}> = ({ property, index }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [liked, setLiked] = useState(false);

  const [isHovered, setIsHovered] = useState(false);

  // Auto-slider effect: switch image every 3 seconds
  useEffect(() => {
    if (!property.images || property.images.length === 0) return;
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % property.images.length);
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

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    const newLiked = !liked;
    setLiked(newLiked);
  };

  // ==========================================
  // LOCAL SOCIAL MEDIA ICONS LIST
  // Change these to update social icons for commercial cards only
  // ==========================================
  const socialIconsLocal = [
    socialIconWhatsApp,
    socialIconInstagram,
    socialIconTikTok,
    socialIconWeChat,
    socialIconSnapchat,
    socialIconLinkedIn,
  ];
  const socialLabelsLocal = [
    "WhatsApp",
    "Instagram",
    "TikTok",
    "WeChat",
    "Snapchat",
    "LinkedIn",
  ];

  return (
    <div
      className="relative overflow-visible rounded-xl p-0.5 transition-all duration-300 cursor-pointer my-3 w-full sm:w-[340px] shrink-0"
      style={{
        background: isHovered ? GOLD_GRADIENT : "transparent",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative pb-1 bg-white rounded-xl shadow-2xl">
        <div className="h-full w-full overflow-visible rounded-xl bg-white shadow-xl transition-shadow duration-300 hover:shadow-2xl">
          {/* ========================================== */}
          {/* 1. IMAGE AUTO-SLIDER - No frame             */}
          {/* ========================================== */}
          <div className="group/image relative h-52 cursor-pointer overflow-hidden rounded-t-xl bg-gray-200">
            <Image
              src={property.images[currentImageIndex]}
              alt={`Property in ${property.address}`}
              fill
              className="object-cover transition-opacity duration-700"
            />

            {property.images.length > 1 && (
              <>
                <button
                  onClick={handlePrevImage}
                  className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 opacity-0 transition-opacity group-hover/image:opacity-100 hover:bg-white z-10"
                >
                  <ChevronLeft className="h-4 w-4 text-black" />
                </button>
                <button
                  onClick={handleNextImage}
                  className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 opacity-0 transition-opacity group-hover/image:opacity-100 hover:bg-white z-10"
                >
                  <ChevronRight className="h-4 w-4 text-black" />
                </button>
              </>
            )}
          </div>

          {/* ========================================== */}
          {/* 2. AGENT HEADER BOX                        */}
          {/* Agent headshot (left) | Name | Logo (right) */}
          {/* Same style as Rent property card top box    */}
          {/* ========================================== */}
          <div className="px-2 -mt-2">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 min-w-0">
                <Image
                  src={property.agentImage}
                  alt={property.agentName}
                  width={50}
                  height={50}
                  className="shrink-0 rounded-full border-2 border-red-100 object-cover w-[40px] h-[40px]"
                />
                <p className="truncate font-amasis text-base font-semibold text-[#343434]">
                  {property.agentName}
                </p>
              </div>

              <Image src={elder} alt="agency logo" className="w-20 h-16" />
            </div>
          </div>

          {/* Card Details Section */}
          <div className="px-2 -mt-8">
            {/* ========================================== */}
            {/* 3. FEATURES ROW                            */}
            {/* Property Type Photo | Car + Parking # | SqFt */}
            {/* ========================================== */}
            <div className="flex items-center justify-between gap-3">
              {/* Property Type Photo/Icon */}
              <div className="flex items-center gap-0.5">
                <div className="h-8 w-12 shrink-0 overflow-hidden rounded-lg">
                  <Image
                    src={
                      index % 2 === 0
                        ? defaultPropertyIcon
                        : defaultPropertyIcon2
                    }
                    alt={property.propertyType}
                    width={60}
                    height={44}
                    className="h-full w-full object-contain"
                  />
                </div>
              </div>
              {/* Car / Parking Spots */}
              <div className="flex items-center gap-0.5">
                <div className="shrink-0 overflow-hidden rounded-lg">
                  <Image
                    src={defaultCarIcon}
                    alt="parking"
                    width={60}
                    height={72}
                    className="w-20 h-24"
                  />
                </div>
                <span className="text-base font-bold font-amasis text-[#FA2F2F]">
                  {property.carSpaces}
                </span>
              </div>
              {/* Square Feet Area */}
              <div className="flex shrink-0 items-center gap-1">
                <Image
                  src={defaultSquareMeterIcon}
                  alt="size"
                  width={28}
                  height={28}
                  className="shrink-0 object-contain h-7 w-7"
                />
                <p className="font-amasis text-base font-semibold text-[#343434]">
                  {property.size}
                  <span className="text-[10px]">sqft</span>
                </p>
              </div>
            </div>

            {/* ========================================== */}
            {/* 4. LOCATION ROW                            */}
            {/* ========================================== */}
            <div className="-mt-7">
              <div className="flex items-center gap-0.5">
                <Image
                  src={defaultLocationIcon}
                  alt="location"
                  width={40}
                  height={40}
                  className="shrink-0 object-contain h-10 w-10"
                />
                <span className="ml-0.5 truncate font-amasis text-sm font-semibold text-gray-800">
                  {property.address}
                </span>
              </div>

              {/* ========================================== */}
              {/* 5. CALENDAR ROW (Date + Time)              */}
              {/* ========================================== */}
              <div className="flex items-center justify-between gap-1 text-gray-600 mt-1">
                <div className="flex items-center">
                  <Image
                    src={defaultCalendarIcon}
                    alt="calendar icon"
                    width={36}
                    height={36}
                    className="h-9 w-9 object-contain"
                  />
                  <span className="ml-1 font-amasis text-base font-semibold text-[#343434]">
                    Monday {property.date}
                  </span>
                </div>
                <div className="flex items-center">
                  <p className="ml-1 font-amasis text-base font-semibold text-[#343434]">
                    {property.time}
                    <span className="text-xs"> am</span>
                  </p>
                </div>
              </div>

              {/* ========================================== */}
              {/* 6. PRICE + PROPERTY TYPE + BUY/LEASE       */}
              {/* ========================================== */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <Image
                    src={defaultMoneyIcon}
                    alt="money icon"
                    width={40}
                    height={40}
                    className="h-10 w-10 object-contain"
                  />
                  <p className="font-amasis text-base font-semibold text-[#343434]">
                    {property.price}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-amasis text-sm font-bold text-[#007CBE]">
                    {property.listingType}
                  </span>
                  <span className="font-amasis text-base font-semibold text-[#007CBE]">
                    {property.propertyType}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================== */}
        {/* 7. 3D SEPARATING LINE                      */}
        {/* ========================================== */}
        <div
          className="mx-1 my-2 h-[3px] rounded-full"
          style={{
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.06), rgba(0,0,0,0.18), rgba(0,0,0,0.06))",
            boxShadow:
              "0 1px 2px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,0.5), inset 0 -1px 0 rgba(0,0,0,0.08)",
          }}
        />

        {/* ========================================== */}
        {/* 8. LOWER CONTACT SECTION                   */}
        {/* ========================================== */}
        <div className="px-3">
          {/* Agent Name + Mobile Number */}
          <div className="flex items-center justify-between gap-2">
            <p className="font-amasis text-base font-semibold text-[#FA2F2F] truncate">
              {property.agentName}
            </p>
            <p className="font-amasis text-sm font-semibold text-[#FA2F2F] shrink-0">
              {property.agentPhone}
            </p>
          </div>

          {/* Email Address */}
          <div className="flex items-center gap-1.5 ">
            <Image src={mailicon} alt="" className="w-8 h-8 shrink-0" />

            <a
              href={`mailto:${property.agentEmail}`}
              className="font-amasis text-xs font-semibold text-slate-500 hover:text-blue-600 transition-colors truncate"
            >
              {property.agentEmail}
            </a>
          </div>

          {/* Social Media Links (left) + Share & Save (right) */}
          <div className="flex items-center justify-between pt-2 border-t border-slate-100">
            {/* Social media icon boxes */}
            <div className="flex gap-1.5">
              {socialIconsLocal.map((icon, i) => (
                <button
                  key={i}
                  className="w-7.5 h-7.5 rounded border border-slate-200 flex items-center justify-center bg-white hover:scale-115 hover:border-slate-400 transition-all cursor-pointer overflow-hidden p-0.5 shrink-0"
                  title={socialLabelsLocal[i]}
                >
                  <Image
                    src={icon}
                    alt={socialLabelsLocal[i]}
                    width={20}
                    height={20}
                    className="object-contain w-full h-full"
                  />
                </button>
              ))}
            </div>

            {/* Share + Save/Like buttons */}
            <div className="flex gap-2 shrink-0">
              <button
                className="p-0.5 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer"
                title="Share"
              >
                <Image
                  src={defaultShareIcon}
                  alt="Share"
                  width={32}
                  height={32}
                  className="object-contain"
                />
              </button>
              <button
                onClick={handleLike}
                className="p-0.5 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                title="Like"
              >
                <Image
                  src={liked ? defaultLikeFilledIcon : defaultLikeOutlineIcon}
                  alt="Like"
                  width={32}
                  height={32}
                  className="object-contain"
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Explorenewproperties = () => {
  const newproperties: PropertyData[] = [
    {
      id: "commercial-1",
      images: [new1, new2, new3],
      agentName: "John Citizen",
      agentPhone: "0400 123 456",
      agentEmail: "John.Citizen@niemeyer.com.au",
      agentImage: agent1,
      agencyLogoText: "Niemeyer",
      propertyType: "Warehouse",
      carSpaces: "2",
      size: "850",
      address: "500 King George Street, Sydney NSW 2000",
      day: "Monday",
      date: "08.06.2026",
      time: "10:30",
      price: "$100,000",
      listingType: "Lease",
    },
    {
      id: "commercial-2",
      images: [new2, new3, new1],
      agentName: "Sarah Connor",
      agentPhone: "0422 987 654",
      agentEmail: "Sarah.Connor@niemeyer.com.au",
      agentImage: agent2,
      agencyLogoText: "Niemeyer",
      propertyType: "Retail",
      carSpaces: "4",
      size: "1,200",
      address: "12 Collins Street, Melbourne VIC 3000",
      day: "Tuesday",
      date: "09.06.2026",
      time: "02:00",
      price: "$250,000",
      listingType: "Buy",
    },
    {
      id: "commercial-3",
      images: [new3, new1, new2],
      agentName: "Michael Chang",
      agentPhone: "0433 555 777",
      agentEmail: "Michael.Chang@niemeyer.com.au",
      agentImage: agent3,
      agencyLogoText: "Niemeyer",
      propertyType: "Office",
      carSpaces: "8",
      size: "2,500",
      address: "88 Barangaroo Avenue, Sydney NSW 2000",
      day: "Wednesday",
      date: "10.06.2026",
      time: "11:00",
      price: "$1,800,000",
      listingType: "Buy",
    },
    {
      id: "commercial-4",
      images: [new1, new3, new2],
      agentName: "Emily Rodriguez",
      agentPhone: "0455 111 222",
      agentEmail: "Emily.Rodriguez@niemeyer.com.au",
      agentImage: agent1,
      agencyLogoText: "Niemeyer",
      propertyType: "Showroom",
      carSpaces: "1",
      size: "450",
      address: "104 Main North Road, Medindie SA 5081",
      day: "Thursday",
      date: "11.06.2026",
      time: "09:30",
      price: "$85,000",
      listingType: "Lease",
    },
  ];

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 370;
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
    <div className="max-w-screen-2xl mx-auto px-5 py-5 relative">
      <div className="mb-4">
        <h2 className="font-poppins font-semibold text-2xl lg:text-[32px] text-black">
          Explore new properties
        </h2>
      </div>

      <div className="relative group">
        {/* Left Arrow Button */}
        <button
          onClick={() => scroll("left")}
          className="hidden md:flex absolute -left-6 top-1/2 -translate-y-1/2 z-10 bg-white hover:bg-slate-100 rounded-full p-2.5 shadow-lg border border-slate-100 text-slate-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300 items-center justify-center cursor-pointer"
          aria-label="Scroll left"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* Horizontal scroll container */}
        <div
          className="flex gap-6 overflow-x-auto scroll-smooth py-2 px-1"
          ref={scrollContainerRef}
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {newproperties.map((property, index) => (
            <CommercialPropertyCard
              key={property.id}
              property={property}
              index={index}
            />
          ))}
        </div>

        {/* Right Arrow Button */}
        <button
          onClick={() => scroll("right")}
          className="hidden md:flex absolute -right-6 top-1/2 -translate-y-1/2 z-10 bg-white hover:bg-slate-100 rounded-full p-2.5 shadow-lg border border-slate-100 text-slate-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300 items-center justify-center cursor-pointer"
          aria-label="Scroll right"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default Explorenewproperties;
