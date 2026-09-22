"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { getHotelListings } from "@/lib/hotel/repository";
import type { HotelListing } from "@/lib/hotel/types";
import sheratonLogo from "../../public/sheraton.svg";
import holidayInnLogo from "../../public/holidayinn1.svg";
import crownePlazaLogo from "../../public/crowneplaza1.svg";
import locationIcon from "../../public/hotellocationicon.svg";
import mail from "../../public/contactemailicon.svg";
import goldenArrowCircle from "../../public/goldencircle.svg";
import telephone from "../../public/telephone.svg";

const hotels = getHotelListings();

const GOLD_GRADIENT =
  // "linear-gradient(90deg , #0F172A , #1D4ED8, #38BDF8 , #7DD3FC , #BAE6FD , #2563EB)";
  // "linear-gradient(90deg, #1E3A8A, #2563EB, #60A5FA, #93C5FD, #BFDBFE ,#1D4ED8 )";
  // "linear-gradient( 90deg ,#001F5B ,#003C9E ,#005BFF ,#3399FF ,#66B2FF , #0047CC )";
  "linear-gradient(90deg, #52BEFE ,#52BEFE, #52BEFE, #52BEFE , #52BEFE ,#52BEFE)";

const hotelBrandLogos = {
  "hotel-1": { src: sheratonLogo, alt: "Sheraton Logo" },
  "hotel-2": { src: holidayInnLogo, alt: "Holiday Inn Logo" },
  "hotel-3": { src: crownePlazaLogo, alt: "Crowne Plaza Logo" },
  "hotel-4": { src: sheratonLogo, alt: "Sheraton Logo" },
  "hotel-5": { src: holidayInnLogo, alt: "Holiday Inn Logo" },
  "hotel-6": { src: crownePlazaLogo, alt: "Crowne Plaza Logo" },
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
      className={`w-10 h-10 transition-all duration-300 ${
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

// const StarRating = ({ count }: { count: number }) => (
//   <div className="flex gap-0.5">
//     {[1, 2, 3, 4, 5].map((i) => (
//       <div key={i}>
//         <Image
//           src={star}
//           alt="star"
//           width={30}
//           height={30}
//           className={i <= count ? "opacity-100" : "opacity-30"}
//         />
//       </div>
//     ))}
//   </div>
// );

export const HotelCard = ({ hotel }: { hotel: HotelListing }) => {
  const router = useRouter();
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
      onClick={() => router.push(`/hotel/${hotel.id}`)}
      className="relative rounded-2xl p-[4px] transition-all duration-300 hover:scale-[1.02] cursor-pointer w-full"
      style={{
        background: isHovered ? GOLD_GRADIENT : "transparent",
        boxShadow: isHovered
          ? "0 20px 40px -15px rgba(203, 158, 51, 0.3)"
          : "0 10px 25px -10px rgba(0,0,0,0.08)",
      }}
    >
      <div className="bg-gray-100 rounded-2xl flex flex-col justify-between h-full overflow-hidden shadow-[-5px_5px_20px_-3px_rgba(0,0,0,0.9)]">
        {/* Top Brand/Logo & City Bar */}

        <div className="flex items-center justify-center gap-2  py-2   shadow-[0_-10px_15px_-3px_rgba(0,0,0,0.1)] bg-white">
          <div className="w-full">
            <Image
              src={brandLogo.src}
              alt={brandLogo.alt}
              className="object-cover w-full h-full"
            />
          </div>
        </div>

        {/* <div className="mt-1.5 h-1.5"></div> */}
        {/* Auto-rotating Header Photo Container */}
        <div>
          <div
            onClick={(e) => {
              e.stopPropagation();
              setCurrentImageIndex((prev) => (prev + 1) % displayImages.length);
            }}
            className="relative w-full h-40 lg:h-56  overflow-hidden shadow-sm shrink-0 bg-gray-100 group/image"
          >
            <Image
              src={displayImages[currentImageIndex]}
              alt={`${hotel.title} - ${displayRoomNames[currentImageIndex]}`}
              fill
              unoptimized
              className="object-cover transition-opacity duration-700 select-none"
            />
            {/* Elegant Semi-Transparent Overlay Room Name Badge */}
            {/* <div className="absolute top-2 left-2 bg-black/60 backdrop-blur-sm text-white text-[10px] uppercase tracking-wider font-extrabold px-2.5 py-1 rounded-md shadow-sm select-none border border-white/10">
              {displayRoomNames[currentImageIndex]}
            </div> */}
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
                  className={`relative flex-1 w-full h-20 lg:h-20 rounded-lg overflow-hidden cursor-pointer border-2 shadow-[-7.86px_7.86px_15.72px_0_#999FB4,2px_-2px_5px_0_#737687] transition-all duration-300 hover:-translate-y-0.5 shrink-0 ${
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
                  {/* <div className="absolute top-0 left-0 right-0 bg-black/50 backdrop-blur-[1px] text-white text-[7px] font-bold py-0.5 px-0.5 text-center truncate leading-tight select-none">
                    {displayRoomNames[targetIndex]}
                  </div> */}
                </div>
              );
            })}
          </div>

          {/* Contact Details (Location, Phone, Email) Flexed with Pricing Section */}
          <div className="flex justify-between items-start  border-t border-gray-50 pt-2 gap-2 px-2.5">
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
          </div>

          {/* Rating & Actions Row (Star rating flexed horizontally with like and share) */}
          <div className="flex justify-between items-center mt-1 px-2.5 pb-1 border-t border-gray-50/50">
            {/* Left Side: Star Rating - Sized Down */}
            <div className="flex flex-col gap-1">
              {/* <StarRating count={hotel.rating} /> */}
              <div className="w-full  flex justify-between items-center ">
                <div className="flex items-center gap-1">
                  <Image
                    src={goldenArrowCircle}
                    alt="golden circle"
                    className="size-10"
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

            {/* Right Side: Enlarged Heart and Golden Arrow Circle (Like & Share) */}
            <div className="text-right flex flex-col items-end shrink-0 ">
              <span className="text-[10px] uppercase tracking-widest font-extrabold text-gray-400 font-TimesNewRoman italic">
                from
              </span>
              <p className="text-3xl font-extrabold text-[#0496FF] font-poppins leading-none">
                {hotel.priceLabel}
              </p>
              {hotel.oldPrice && (
                <p className="text-xs font-semibold text-[#D62828] line-through font-poppins mt-1">
                  was {hotel.oldPrice}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const LastMinuteHotels = ({
  pillHeading = false,
}: {
  pillHeading?: boolean;
}) => {
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
    <div className={`max-w-screen-2xl mx-auto px-2  ${pillHeading}`}>
      {/* Header */}
      {/* <div className={`flex items-center justify-between ${pillHeading ? "mb-4" : "mb-2"}`}> */}
      {/* <div
          className={`flex items-center gap-2 ${pillHeading ? "w-fit rounded-full px-4 py-2" : ""}`}
          style={
            pillHeading
              ? {
                  background:
                    "url('/homepageheadingbackground.svg') no-repeat center / 107.7% 153.4%",
                }
              : undefined
          }
        >
          <h2
            className={
              pillHeading
                ? "font-amasis text-[32px] font-extrabold reel-text-heading [text-shadow:_0px_0px_4px_rgb(255_255_255_/_100%)]"
                : "font-amasis text-xl lg:text-[32px] font-semibold text-[#0287C7]"
            }
          >
            Last - Minute Hotels Near You
          </h2> */}
      {/* Trending icon */}
      {/* <svg
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
        <Link
          href="/hotel/browse"
          className="shrink-0 text-sm font-semibold text-[#0287C7] hover:underline"
        >
          View All
        </Link>
      </div> */}

      {/* Horizontal Card Slider with Arrow Navigation */}
      <div className="group relative overflow-visible">
        {/* Left Arrow */}
        <button
          onClick={() => scroll("left")}
          className="absolute left-0 top-1/2 z-10 hidden sm:block -translate-y-1/2 rounded-full bg-white p-3 shadow-lg opacity-0 transition-opacity duration-300 group-hover:opacity-100 hover:bg-gray-100"
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
            <div key={hotel.id} className="w-[370px] shrink-0">
              <HotelCard hotel={hotel} />
            </div>
          ))}
        </div>

        {/* Right Arrow */}
        <button
          onClick={() => scroll("right")}
          className="absolute right-0 top-1/2 z-10 hidden sm:block -translate-y-1/2 rounded-full bg-white p-3 shadow-lg opacity-0 transition-opacity duration-300 group-hover:opacity-100 hover:bg-gray-100"
          aria-label="Scroll right"
        >
          <ChevronRight className="h-6 w-6 text-gray-800" />
        </button>
      </div>
    </div>
  );
};

export default LastMinuteHotels;
