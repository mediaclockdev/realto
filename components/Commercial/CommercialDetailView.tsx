"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { CommercialListing } from "@/lib/commercial/types";
import locationIcon from "@/public/commerciallocationicon.svg";
import calender from "@/public/commercialcalender.svg";
import clock from "@/public/buyclockicon1.svg";
import money from "@/public/money.svg";
import squaremetericon from "@/public/squaremetericon.svg";
import defaultCarIcon from "@/public/commercialcaricon.svg";
import inqury from "@/public/inqurylogo.svg";
import GetMatchedNow from "@/components/PropertyListing/GetMatchedNow";
import mapview from "@/public/mapviewicon.svg";
import satallite from "@/public/sataliteicon.svg";

import officeIcon from "@/public/commercialofficeicon.svg";
import retailIcon from "@/public/commercialretailicon.svg";
import parkingIcon from "@/public/commercialcaricon.svg";
import securityIcon from "@/public/alarmsystem.svg";
import wifiIcon from "@/public/wifi.svg";
import acIcon from "@/public/airconditioner.svg";

import snapchat from "@/public/snapchaticonhotel.svg";
import tiktok from "@/public/tiktokiconhotel.svg";
import x from "@/public/xiconhotel.svg";
import wechat from "@/public/wechaticonhotel.svg";
import linkedin from "@/public/linkediniconhotel.svg";
import instagram from "@/public/instagramiconhotel.svg";

const socialImages = [instagram, snapchat, tiktok, x, wechat, linkedin];

const SocialIcons = () => (
  <div className="flex items-center gap-2">
    {socialImages.map((image, index) => (
      <Image
        key={index}
        src={image.src}
        alt={`Social media icon ${index + 1}`}
        className="h-6 w-6"
      />
    ))}
  </div>
);

const commercialFeatures = [
  { name: "Office Space", icons: [officeIcon] },
  { name: "Retail Space", icons: [retailIcon] },
  { name: "Parking", icons: [parkingIcon] },
  { name: "Security System", icons: [securityIcon] },
  { name: "Wi-fi", icons: [wifiIcon] },
  { name: "Air Conditioner", icons: [acIcon] },
];

interface CommercialDetailViewProps {
  listing: CommercialListing;
  onBack?: () => void;
}

const CommercialDetailView: React.FC<CommercialDetailViewProps> = ({
  listing,
  onBack,
}) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const nextImage = () => {
    setActiveImageIndex((prev) => (prev + 1) % listing.gallery.length);
  };

  const prevImage = () => {
    setActiveImageIndex(
      (prev) => (prev - 1 + listing.gallery.length) % listing.gallery.length,
    );
  };

  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [isInquiryOpen, setIsInquiryOpen] = useState(false);
  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  const checkScroll = () => {
    const el = scrollRef.current;
    if (!el) return;

    setShowLeft(el.scrollLeft > 0);
    setShowRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 5);
  };

  const scroll = (dir: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;

    const scrollAmount = 200;
    el.scrollBy({
      left: dir === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <div className="bg-gray-50 flex-1 overflow-y-auto">
      {/* Back Button */}
      {onBack && (
        <div className="p-4 bg-white sticky top-0 z-50 shadow-sm border-b">
          <button
            onClick={onBack}
            className="flex items-center text-gray-700 font-medium hover:text-red-500 transition-colors"
          >
            <ChevronLeft className="w-5 h-5 mr-1" />
            Back to listings
          </button>
        </div>
      )}

      {/* Hero Image Section */}
      <div className="relative w-full h-[300px] md:h-[450px] lg:h-[310px] bg-gray-200">
        <Image
          src={listing.gallery[activeImageIndex]}
          alt={`${listing.title} view ${activeImageIndex + 1}`}
          fill
          className="w-full h-full object-cover"
        />
        {listing.gallery.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-md transition-colors z-10"
            >
              <ChevronLeft className="w-6 h-6 text-gray-800" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-md transition-colors z-10"
            >
              <ChevronRight className="w-6 h-6 text-gray-800" />
            </button>
          </>
        )}
      </div>

      {/* Thumbnails */}
      <div className="bg-white px-4 py-3 border-b border-gray-100">
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {listing.gallery.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setActiveImageIndex(idx)}
              className={`relative w-20 h-20 md:w-32 md:h-28 shrink-0 rounded-lg overflow-hidden border-2 transition-all ${
                activeImageIndex === idx
                  ? "border-red-500 opacity-100"
                  : "border-transparent opacity-70 hover:opacity-100"
              }`}
            >
              <Image
                src={img}
                alt={`Thumbnail ${idx + 1}`}
                fill
                className="object-cover cursor-pointer"
              />
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-screen-2xl lg:max-w-10xl mx-auto px-0 lg:px-4 py-4 space-y-8">
        {/* Main Info & Agent Card Grid */}
        <div className="flex flex-col lg:flex-row justify-between gap-8 bg-white rounded-[10px] shadow-sm  p-6 sm:p-8">
          {/* Left Column: Property Highlights */}
          <div className=" space-y-3 lg:space-y-3   ">
            {/* Features Icons */}
            <div className="flex items-center gap-10">
              <div className="flex items-center gap-2">
                <div className="w-[55px] lg:w-[95px] h-[40px] lg:h-[65px]">
                  <Image
                    src={defaultCarIcon}
                    alt="Car spaces"
                    width={100}
                    height={60}
                    className="w-full h-full"
                  />
                </div>
                <span className="text-xl font-extrabold font-amasis  text-[#343434]">
                  {listing.carSpaces}
                </span>
              </div>
            </div>

            {/* Location & Size */}
            <div className="flex flex-col sm:flex-row sm:items-center">
              <div className="flex items-center gap-1">
                <Image
                  src={locationIcon}
                  alt="Location"
                  className="w-10 h-10 shrink-0 mt-0.5 sm:mt-0"
                />
                <h1 className="text-base lg:text-xl font-semibold text-[#343434]">
                  {listing.address}
                </h1>
              </div>
            </div>

            <div className="flex flex-col lg:flex-row items-start lg:items-center gap-3 lg:gap-4 text-gray-600">
              <div className="flex items-center gap-1 ">
                <Image
                  src={calender}
                  alt="calendericon"
                  className="w-10 h-10  shrink-0"
                />
                <span className="text-[#343434] font-semibold text-base lg:text-xl">
                  {listing.day} {listing.date}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <Image
                  src={clock}
                  alt="clockicon"
                  className="w-10 h-10  shrink-0"
                />
                <span className="text-[#343434] font-semibold text-base lg:text-xl">
                  {listing.time}
                </span>
              </div>
              <div className="flex items-center gap-2 ml-2 shrink-0">
                <Image
                  src={squaremetericon}
                  alt="size"
                  className="w-6 h-6 shrink-0"
                />
                <p className="text-[#343434] font-semibold text-base lg:text-xl">
                  {listing.size} sqm
                </p>
              </div>
            </div>

            {/* Price & Type */}
            <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4">
              <div className="flex items-center gap-1">
                <Image
                  src={money}
                  alt="money icon"
                  className="w-10 h-10  shrink-0"
                />
                <p className="text-[#343434] font-semibold text-base lg:text-xl">
                  {listing.price}
                </p>
              </div>

              <p className="text-[#343434] font-semibold text-base lg:text-xl">
                • {listing.listingType} • {listing.propertyType}
              </p>
            </div>
          </div>

          {/* Right Column: Agent Card */}
          <div className="w-full lg:max-w-md  rounded-2xl  ">
            {/* Card */}
            <div
              className="bg-[#ffffff]/10 rounded-2xl shadow-md p-2 lg:p-5 bg-no-repeat bg-center bg-cover"
              style={{ backgroundImage: "url('/glasseffect.svg')" }}
            >
              <div className="flex items-center gap-2 lg:gap-6">
                {/* LEFT SECTION */}
                <div className="flex flex-col items-center gap-2 lg:gap-3 min-w-[80px] lg:min-w-[100px]">
                  <Image
                    src={listing.agent.image}
                    alt={listing.agent.name}
                    width={120}
                    height={120}
                    className="rounded-full object-cover w-18 h-18 lg:w-20 lg:h-20 "
                  />

                  {/* Name */}
                  <h3 className="font-semibold text-sm lg:text-lg whitespace-nowrap text-[#343434] lg:text-center">
                    {listing.agent.name}
                  </h3>
                </div>

                {/* RIGHT SECTION */}
                <div className="flex flex-col justify-center gap-1 flex-1">
                  {/* Company */}
                  <h2 className="text-xl lg:text-3xl  font-bold text-[#343434] whitespace-nowrap">
                    {listing.agent.agencyLogoText}
                  </h2>

                  {/* phone number */}
                  <p className="text-sm text-gray-500">{listing.agent.phone}</p>

                  {/* Social Icons */}
                  <div className="my-2">
                    <SocialIcons />
                  </div>
                </div>
              </div>
            </div>

            <GetMatchedNow
              open={isInquiryOpen}
              onClose={() => setIsInquiryOpen(false)}
            />

            {/* Enquiry Button */}
            <div
              className="bg-no-repeat bg-center bg-cover"
              style={{ backgroundImage: "url('/glasseffect1.svg')" }}
            >
              <button
                type="button"
                onClick={() => setIsInquiryOpen(true)}
                className="bg-[#ffffff]/10 mt-3 rounded-2xl shadow-md flex items-center justify-center gap-3 py-3 lg:py-4 w-full  cursor-pointer"
              >
                <Image src={inqury} alt="enquiry" width={28} height={28} />
                <p
                  className="text-base lg:text-2xl font-bold text-[#343434]"
                  style={{
                    WebkitTextFillColor: "white",
                    WebkitTextStroke: "1.5px #000000",
                  }}
                >
                  Send an inquiry
                </p>
              </button>
            </div>
          </div>
        </div>

        {/* Property Description */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm ">
          <h2 className="text-xl font-bold  mb-4 font-amasis  bg-[#F0F0F0] text-[#111827] px-8 py-2 rounded-3xl inline-block  [text-shadow:_0px_0px_4px_rgb(255_255_255_/_100%)] shadow-[4px_4px_10px_rgba(0,0,0,0.15)">
            Property description
          </h2>
          <p className="text-gray-600 leading-relaxed font-TimesNewRoman text-lg">
            {listing.description}
          </p>
        </div>

        {/* Features & Facilities */}
        <div
          className="bg-white px-6 py-5 rounded-2xl shadow-sm border border-gray-100 relative group overflow-hidden"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <h2 className="text-xl font-bold  mb-4 font-amasis  bg-[#F0F0F0] text-[#111827] px-8 py-2 rounded-3xl inline-block  [text-shadow:_0px_0px_4px_rgb(255_255_255_/_100%)] shadow-[4px_4px_10px_rgba(0,0,0,0.15)">
            Features & Facilities
          </h2>

          {/* LEFT BUTTON */}
          {isHovered && showLeft && (
            <button
              onClick={() => scroll("left")}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-white text-black shadow-md rounded-full p-2 mt-2"
            >
              ←
            </button>
          )}

          {/* RIGHT BUTTON */}
          {isHovered && showRight && (
            <button
              onClick={() => scroll("right")}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-white text-black shadow-md rounded-full p-2 mt-2"
            >
              →
            </button>
          )}

          {/* SCROLL CONTAINER */}
          <div
            ref={scrollRef}
            onScroll={checkScroll}
            className="flex gap-2 overflow-x-auto overflow-y-hidden scrollbar-hide items-center"
          >
            {commercialFeatures.map((item, idx) => (
              <div
                key={idx}
                className="relative rounded-xl shrink-0 overflow-hidden flex flex-col items-center justify-center text-center transition-transform hover:scale-105 cursor-default w-32 h-32"
              >
                <Image
                  src={item.icons[0]}
                  alt="feature"
                  fill
                  className="object-cover"
                  unoptimized
                />

                <div className="absolute bottom-0 left-0 right-0 h-[18%] bg-white/50 flex items-center justify-center">
                  <p className="text-[#343434] font-semibold text-[15px]">
                    {item.name}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Maps */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-sm border border-gray-100">
            <div className="w-full h-[300px] bg-gray-200 rounded-xl overflow-hidden relative mb-4">
              <iframe
                title="Map view of property"
                width="100%"
                height="100%"
                loading="lazy"
                src="https://www.openstreetmap.org/export/embed.html?bbox=151.0%2C-34.0%2C151.2%2C-33.8&layer=mapnik&marker=-33.9%2C151.1"
                className="border-0 w-full h-full pointer-events-none"
              />
            </div>
            <div className="flex gap-2 items-center justify-center">
              <Image src={mapview} alt="map icon" />
              <h3 className="text-center font-bold text-lg text-[#F77F00]">
                Map view of property
              </h3>
            </div>
          </div>
          <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-sm border border-gray-100">
            <div className="w-full h-75 bg-gray-200 rounded-xl overflow-hidden relative mb-4">
              <iframe
                title="Satellite view of property"
                width="100%"
                height="100%"
                loading="lazy"
                src="https://www.openstreetmap.org/export/embed.html?bbox=151.0%2C-34.0%2C151.2%2C-33.8&layer=hot&marker=-33.9%2C151.1"
                className="border-0 w-full h-full pointer-events-none"
              />
            </div>
            <div className="flex gap-2 items-center justify-center">
              <Image src={satallite} alt="satallite icon" className="size-14" />
              <h3 className="text-center font-bold text-lg text-[#F77F00]">
                Satellite view of property
              </h3>
            </div>
          </div>
        </div>

        {/* Property History */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-xl font-bold  mb-4 font-amasis  bg-[#F0F0F0] text-[#111827] px-8 py-2 rounded-3xl inline-block  [text-shadow:_0px_0px_4px_rgb(255_255_255_/_100%)] shadow-[4px_4px_10px_rgba(0,0,0,0.15)]">
            Property History
          </h2>
          <div className="text-gray-600 leading-relaxed font-TimesNewRoman text-lg">
            <p>
              This provides a typical localized sales and leasing history for a
              commercial asset in this area.
            </p>
            <p>
              Mar 2026: Property listed on REALTO by {listing.agent.name} (
              {listing.agent.agencyLogoText}).
            </p>
            <p>Nov 2025: Fit-out and compliance certificate issued.</p>
            <p>Jun 2024: Refurbishment of common areas completed.</p>
            <p>
              Jan 2024: DA Approval granted by local council for signage and
              awning upgrade.
            </p>
            <p>Oct 2023: Site acquired by current owner.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommercialDetailView;
