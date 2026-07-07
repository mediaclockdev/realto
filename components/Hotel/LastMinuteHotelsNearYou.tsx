"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import star from "../../public/starsingle.svg";
import { getHotelListings } from "@/lib/hotel/repository";
import type { HotelListing } from "@/lib/hotel/types";

import sheratonLogo from "../../public/sheraton.svg";
import movenpickLogo from "../../public/movenpick.svg";
import marriottLogo from "../../public/marriott.svg";
import holidayInnLogo from "../../public/holidayinn.svg";
import crownePlazaLogo from "../../public/crowneplaza.svg";
import ibisLogo from "../../public/ibishotels.svg";
import facebook from "../../public/logos_facebook.svg";
import instagram from "../../public/logos_instagram.svg";
import whatsapp from "../../public/whatsapp.svg";
import locationIcon from "../../public/location.svg";
import mail from "../../public/hotelemailicon.svg";
import goldenArrowCircle from "../../public/goldencircle.svg";
import telephone from "../../public/telephone.svg";

const hotels = getHotelListings();

const GOLD_GRADIENT =
  // "linear-gradient(90deg , #0F172A , #1D4ED8, #38BDF8 , #7DD3FC , #BAE6FD , #2563EB)";
  // "linear-gradient(90deg, #1E3A8A, #2563EB, #60A5FA, #93C5FD, #BFDBFE ,#1D4ED8 )";
  // "linear-gradient( 90deg ,#001F5B ,#003C9E ,#005BFF ,#3399FF ,#66B2FF , #0047CC )";
  "linear-gradient(90deg, #7DD3FC ,#38BDF8, #0EA5E9, #60A5FA , #3B82F6 ,#1D4ED8)";

const hotelBrandLogos = {
  "hotel-1": { src: sheratonLogo, alt: "Sheraton Logo" },
  "hotel-2": { src: movenpickLogo, alt: "Movenpick Logo" },
  "hotel-3": { src: marriottLogo, alt: "Marriott Logo" },
  "hotel-4": { src: holidayInnLogo, alt: "Holiday Inn Logo" },
  "hotel-5": { src: crownePlazaLogo, alt: "Crowne Plaza Logo" },
  "hotel-6": { src: ibisLogo, alt: "Ibis Hotels Logo" },
} as const;

const HeartIcon = ({
  liked,
  onClick,
}: {
  liked: boolean;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}) => (
  <button
    onClick={onClick}
    className="w-12 h-12 flex items-center justify-center 
  bg-transparent border-none outline-none
  shadow-none hover:shadow-none
  transition-transform hover:scale-110 active:scale-95 shrink-0"
  >
    <svg
      viewBox="0 0 24 24"
      className={`w-6 h-6 transition-all duration-300 ${
        liked
          ? "fill-red-500 stroke-red-600 scale-110"
          : "fill-none stroke-gray-400 hover:stroke-red-500"
      }`}
      strokeWidth="2"
    >
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    </svg>
  </button>
);

const StarRating = ({ count }: { count: number }) => (
  <div className="flex gap-0.5">
    {[1, 2, 3, 4, 5].map((i) => (
      <div key={i}>
        <Image
          src={star}
          alt="star"
          width={30} // Smaller rating stars
          height={30}
          className={i <= count ? "opacity-100" : "opacity-30"}
        />
      </div>
    ))}
  </div>
);

const HotelCard = ({ hotel }: { hotel: HotelListing }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [liked, setLiked] = useState(false);
  const brandLogo = hotelBrandLogos[hotel.id as keyof typeof hotelBrandLogos];

  // Setup dynamic list of room images for slideshow (4 total photos)
  const displayImages = hotel.gallery
    ? hotel.gallery.slice(0, 4)
    : [hotel.heroImage];
  const displayRoomNames = hotel.roomNames || [
    "Bedroom",
    "Balcony View",
    "Bathroom",
    "Open Buffet",
  ];

  // Setup auto slideshow rotation every 3 seconds
  useEffect(() => {
    if (displayImages.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % displayImages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [displayImages.length]);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative rounded-2xl p-[4px] transition-all duration-300 hover:scale-[1.02] cursor-pointer w-[420px] shrink-0"
      style={{
        background: isHovered ? GOLD_GRADIENT : "transparent",
        boxShadow: isHovered
          ? "0 20px 40px -15px rgba(203, 158, 51, 0.3)"
          : "0 10px 25px -10px rgba(0,0,0,0.08)",
      }}
    >
      <div className="bg-white rounded-2xl flex flex-col justify-between h-full overflow-hidden shadow-md">
        <div className="px-2 pt-1 pb-2">
          {/* Top Brand/Logo & City Bar */}
          <div className="flex items-center gap-2 mb-1 border-b border-gray-100 pb-1">
            {brandLogo ? (
              <div className="w-8 h-8 rounded-full overflow-hidden shrink-0 flex items-center justify-center border border-gray-100 shadow-sm bg-white p-1">
                <Image
                  src={brandLogo.src}
                  alt={brandLogo.alt}
                  className="object-contain w-full h-full"
                />
              </div>
            ) : (
              <div className="w-8 h-8 rounded-full overflow-hidden shrink-0 flex items-center justify-center bg-gradient-to-tr from-[#CB9E33] to-[#EDD06A] text-white font-bold text-base shadow-sm font-poppins">
                {hotel.title.slice(0, 1)}
              </div>
            )}
            <div className="flex items-baseline gap-1.5 truncate">
              <h3 className="text-xl font-bold font-poppins text-black truncate leading-tight">
                {hotel.title}
              </h3>
              <span className="text-gray-500 text-xs font-semibold font-poppins truncate shrink-0">
                {hotel.subtitle}
              </span>
            </div>
          </div>

          {/* Auto-rotating Header Photo Container */}
          <div
            onClick={() =>
              setCurrentImageIndex((prev) => (prev + 1) % displayImages.length)
            }
            className="relative w-full h-40 lg:h-56 rounded-xl overflow-hidden shadow-sm shrink-0 bg-gray-100 group/image"
          >
            <Image
              src={displayImages[currentImageIndex]}
              alt={`${hotel.title} - ${displayRoomNames[currentImageIndex]}`}
              fill
              unoptimized
              className="object-cover transition-opacity duration-700 select-none"
            />
            {/* Elegant Semi-Transparent Overlay Room Name Badge */}
            <div className="absolute top-2 left-2 bg-black/60 backdrop-blur-sm text-white text-[10px] uppercase tracking-wider font-extrabold px-2.5 py-1 rounded-md shadow-sm select-none border border-white/10">
              {displayRoomNames[currentImageIndex]}
            </div>
          </div>

          {/* Deeper 3D Thumbnail Photos under the Header */}
          <div className="flex justify-between gap-2.5 mt-1">
            {displayImages.slice(1, 4).map((img, idx) => {
              const targetIndex = idx + 1;
              const isActive = currentImageIndex === targetIndex;
              return (
                <div
                  key={idx}
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentImageIndex(targetIndex);
                  }}
                  className={`relative flex-1 w-full h-20 lg:h-28 rounded-lg overflow-hidden cursor-pointer border-2 shadow-[0_6px_14px_rgba(0,0,0,0.25)] hover:shadow-[0_8px_18px_rgba(0,0,0,0.35)] transition-all duration-300 hover:-translate-y-0.5 shrink-0 ${
                    isActive ? "border-[#CB9E33] scale-105" : "border-white"
                  }`}
                >
                  <Image
                    src={img}
                    alt={displayRoomNames[targetIndex]}
                    fill
                    unoptimized
                    className="object-cover"
                  />
                  {/* Subtle dynamic overlay name text on top of thumbnail */}
                  <div className="absolute top-0 left-0 right-0 bg-black/50 backdrop-blur-[1px] text-white text-[7px] font-bold py-0.5 px-0.5 text-center truncate leading-tight select-none">
                    {displayRoomNames[targetIndex]}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Contact Details (Location, Phone, Email) Flexed with Pricing Section */}
          <div className="flex justify-between items-start  border-t border-gray-50 pt-2 gap-2">
            {/* Left Side: Address, Phone, Email Details (with increased spacing & size) */}
            <div className="flex flex-col gap-1 flex-1 min-w-0">
              {/* Address */}
              <div className="flex items-center gap-1">
                <Image
                  src={locationIcon}
                  alt="Location"
                  width={40}
                  height={40}
                  className="shrink-0"
                />
                <span className="font-poppins text-sm font-semibold text-gray-800 leading-tight">
                  {hotel.mapLabel || hotel.location}
                </span>
              </div>

              {/* Phone */}
              <div className="flex items-center gap-1">
                <Image
                  src={telephone}
                  alt="Phone"
                  width={40}
                  height={40}
                  className="shrink-0"
                />
                <span className="font-poppins text-sm font-semibold text-gray-800 leading-tight">
                  {hotel.phone || "02 8745 3020"}
                </span>
              </div>

              {/* Email */}
              <div className="flex items-center gap-1">
                <Image
                  src={mail}
                  alt="mail"
                  width={40}
                  height={40}
                  className="shrink-0"
                />
                <span className="font-poppins text-sm font-semibold text-gray-800 leading-tight truncate">
                  {hotel.email ||
                    `Booking@${hotel.title.toLowerCase().replace(/\s+/g, "")}.com.au`}
                </span>
              </div>
            </div>

            {/* Right Side: Price Box - Positioned Upwards, bold, very big red price & grey old price */}
            <div className="text-right flex flex-col items-end shrink-0 pt-1">
              <span className="text-[10px] uppercase tracking-widest font-extrabold text-gray-400 font-poppins">
                from
              </span>
              <p className="text-3xl font-extrabold text-[#FA2F2F] font-poppins leading-none">
                {hotel.priceLabel}
              </p>
              {hotel.oldPrice && (
                <p className="text-xs font-semibold text-gray-400 line-through font-poppins mt-1">
                  was {hotel.oldPrice}
                </p>
              )}
            </div>
          </div>

          {/* Rating & Actions Row (Star rating flexed horizontally with like and share) */}
          <div className="flex justify-between items-center mt-1 px-1 pb-1 border-t border-gray-50/50">
            {/* Left Side: Star Rating - Sized Down */}
            <div className="flex flex-col gap-1">
              <StarRating count={hotel.rating} />
              <div className="w-full  flex justify-between items-center ">
                <div className="flex gap-2.5">
                  <a
                    href="#"
                    onClick={(e) => e.preventDefault()}
                    className="hover:scale-125 transition-transform duration-200"
                  >
                    <div className="w-6 h-6 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors">
                      <Image
                        src={whatsapp}
                        alt="WhatsApp"
                        width={20}
                        height={20}
                        className="object-contain"
                      />
                    </div>
                  </a>
                  <a
                    href="#"
                    onClick={(e) => e.preventDefault()}
                    className="hover:scale-125 transition-transform duration-200"
                  >
                    <div className="w-6 h-6 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors">
                      <Image
                        src={instagram}
                        alt="Instagram"
                        width={20}
                        height={20}
                        className="object-contain"
                      />
                    </div>
                  </a>
                  <a
                    href="#"
                    onClick={(e) => e.preventDefault()}
                    className="hover:scale-125 transition-transform duration-200"
                  >
                    <div className="w-6 h-6 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors">
                      <Image
                        src={facebook}
                        alt="Facebook"
                        width={20}
                        height={20}
                        className="object-contain"
                      />
                    </div>
                  </a>
                  <a
                    href="#"
                    onClick={(e) => e.preventDefault()}
                    className="hover:scale-125 transition-transform duration-200"
                  >
                    <div className="w-6 h-6 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"></div>
                  </a>
                </div>
              </div>
            </div>

            {/* Right Side: Enlarged Heart and Golden Arrow Circle (Like & Share) */}
            <div className="flex items-center gap-1">
              <Image
                src={goldenArrowCircle}
                alt="golden circle"
                className="size-7"
              />
              <HeartIcon
                liked={liked}
                onClick={(e) => {
                  e.stopPropagation();
                  setLiked(!liked);
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const LastMinuteHotels = ({ pillHeading = false }: { pillHeading?: boolean }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 380; // Slightly more than card width for smooth feel
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
    <div className="max-w-screen-2xl mx-auto px-2 lg:px-5 py-8">
      {/* Header */}
      <div
        className={`flex items-center gap-2 mb-2 ${pillHeading ? "w-fit rounded-full px-4 py-2" : ""}`}
        style={
          pillHeading
            ? {
                background:
                  "linear-gradient(180deg, rgba(237,200,78,0.97) 0%, #ECC440 54%)",
              }
            : undefined
        }
      >
        <h2 className="font-amasis text-xl lg:text-[32px] font-semibold text-[#0287C7]">
          Last - Minute Hotels Near You
        </h2>
        {/* Trending icon */}
        <svg
          className="w-6 h-6 text-[#0287C7] animate-pulse"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
        >
          <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
          <polyline points="16 7 22 7 22 13" />
          <path d="M22 7l-1 1" strokeLinecap="round" />
          <circle cx="22" cy="6" r="1" fill="currentColor" stroke="none" />
        </svg>
      </div>

      {/* Horizontal Card Slider with Arrow Navigation */}
      <div className="group relative overflow-visible">
        {/* Left Arrow */}
        <button
          onClick={() => scroll("left")}
          className="absolute left-0 top-1/2 z-10 -ml-5 -translate-y-1/2 rounded-full bg-white p-3 shadow-lg opacity-0 transition-opacity duration-300 group-hover:opacity-100 hover:bg-gray-100"
          aria-label="Scroll left"
        >
          <ChevronLeft className="h-6 w-6 text-gray-800" />
        </button>

        {/* Scrollable Container */}
        <div
          ref={scrollContainerRef}
          className="flex  gap-4 lg:gap-6 overflow-x-auto overflow-y-visible scroll-smooth px-0 py-2 lg:px-2"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {hotels.map((hotel) => (
            <HotelCard key={hotel.id} hotel={hotel} />
          ))}
        </div>

        {/* Right Arrow */}
        <button
          onClick={() => scroll("right")}
          className="absolute right-0 top-1/2 z-10 -mr-5 -translate-y-1/2 rounded-full bg-white p-3 shadow-lg opacity-0 transition-opacity duration-300 group-hover:opacity-100 hover:bg-gray-100"
          aria-label="Scroll right"
        >
          <ChevronRight className="h-6 w-6 text-gray-800" />
        </button>
      </div>
    </div>
  );
};

export default LastMinuteHotels;
