"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { ListingVariant } from "@/lib/listings/types";
import locationIcon from "@/public/location.svg";
import type { ListingProperty } from "@/lib/properties/types";

import airconditioner from "../../public/airconditioner.svg";
import airconditioner1 from "../../public/ac1.svg";
import airconditioner2 from "../../public/ac2.svg";
import airconditioner3 from "../../public/ac3.svg";
import airconditioner4 from "../../public/ac4.svg";
import airconditioner5 from "../../public/ac5.svg";
import airconditioner6 from "../../public/ac6.svg";

import Wifi from "../../public/wifi.svg";
import wifi1 from "../../public/wifi1.svg";
import wifi2 from "../../public/wifi2.svg";
import wifi3 from "../../public/wifi3.svg";
import wifi4 from "../../public/wifi4.svg";

import alarmsystem from "../../public/alarmsystem.svg";
import alarmsystem1 from "../../public/alarmsystem1.svg";
import alarmsystem2 from "../../public/alarmsystem2.svg";
import alarmsystem3 from "../../public/alarmsystem3.svg";

import dishwasher from "../../public/dishwasher.svg";
import dishwasher1 from "../../public/dishwasher1.svg";
import dishwasher2 from "../../public/dishwasher2.svg";
import dishwasher3 from "../../public/dishwasher3.svg";
import dishwasher4 from "../../public/dishwasher4.svg";
import dishwasher5 from "../../public/dishwasher5.svg";
import dishwasher6 from "../../public/dishwasher6.svg";

import builtInRobes from "../../public/buildinrobes.svg";
import builtInRobes1 from "../../public/buildinrobes1.svg";
import builtInRobes2 from "../../public/buildinrobes2.svg";
import builtInRobes3 from "../../public/buildinrobes3.svg";
import builtInRobes4 from "../../public/buildinrobes4.svg";

import balcony from "../../public/balcony.svg";
import balcony1 from "../../public/balcony1.svg";
import balcony2 from "../../public/balcony2.svg";
import balcony3 from "../../public/balcony3.svg";
import balcony4 from "../../public/balcony4.svg";

import garage from "../../public/garage.svg";
import fullyfenced from "../../public/fullyfenced.svg";
import swimmingpool from "../../public/swimmingpool.svg";
import clock from "../../public/buyclock.svg";
import money from "../../public/money.svg";
import calender from "../../public/buycalender.svg";
import squaremetericon from "../../public/squaremetericon.svg";
import star from "../../public/star.svg";
import inqury from "../../public/inqurylogo.svg";
import GetMatchedNow from "./GetMatchedNow";
import well from "../../public/well.svg";
import electricity from "../../public/electricity.svg";
import councilapproval from "../../public/councilapproval.svg";
import neartransport from "../../public/neartransport.svg";
import mapview from "../../public/mapviewicon.svg";
import satallite from "../../public/sataliteicon.svg";

import snapchat from "../../public/snapchaticonhotel.svg";
import tiktok from "../../public/tiktokiconhotel.svg";
import x from "../../public/xiconhotel.svg";
import wechat from "../../public/wechaticonhotel.svg";
import linkedin from "../../public/linkediniconhotel.svg";

import instagram from "../../public/instagramiconhotel.svg";

const images = [instagram, snapchat, tiktok, x, wechat, linkedin];

const SocialIcons = () => (
  <div className="flex items-center gap-2">
    {images.map((image, index) => (
      <Image
        key={index}
        src={image.src}
        alt={`Social media icon ${index + 1}`}
        width={24}
        height={24}
        className="h-6 w-6"
      />
    ))}
  </div>
);

interface PropertyDetailViewProps {
  property: ListingProperty;
  onBack?: () => void;
  listingVariant?: ListingVariant;
}

const PropertyDetailView: React.FC<PropertyDetailViewProps> = ({
  property,
  onBack,
  listingVariant = "buy",
}) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const nextImage = () => {
    setActiveImageIndex((prev) => (prev + 1) % property.thumbnail.length);
  };

  const prevImage = () => {
    setActiveImageIndex(
      (prev) =>
        (prev - 1 + property.thumbnail.length) % property.thumbnail.length,
    );
  };
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [isInquiryOpen, setIsInquiryOpen] = useState(false);
  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTick((t) => t + 1);
    }, 10000); // 10 seconds

    return () => clearInterval(interval);
  }, []);

  const residentialAmenities = [
    {
      name: "Air Conditioner",
      icons: [
        airconditioner,
        airconditioner1,
        airconditioner2,
        airconditioner3,
        airconditioner4,
        airconditioner5,
        airconditioner6,
      ],
    },
    { name: "Wi-fi", icons: [Wifi, wifi1, wifi2, wifi3, wifi4] },
    {
      name: "Alarm System",
      icons: [alarmsystem, alarmsystem1, alarmsystem2, alarmsystem3],
    },
    {
      name: "Dishwasher",
      icons: [
        dishwasher,
        dishwasher1,
        dishwasher2,
        dishwasher3,
        dishwasher4,
        dishwasher5,
        dishwasher6,
      ],
    },
    {
      name: "Built-in robes",
      icons: [
        builtInRobes,
        builtInRobes1,
        builtInRobes2,
        builtInRobes3,
        builtInRobes4,
      ],
    },
    {
      name: "Balcony",
      icons: [balcony, balcony1, balcony2, balcony3, balcony4],
    },
    { name: "Garage", icons: [garage] },
    { name: "Fully fenced", icons: [fullyfenced] },
    { name: "Swimming pool", icons: [swimmingpool] },
  ];

  const landFeatures = [
    {
      name: "Well",
      icons: [well],
    },
    {
      name: "electricity",
      icons: [electricity],
    },
    {
      name: "Council Approval",
      icons: [councilapproval],
    },
    {
      name: "Near Transport",
      icons: [neartransport],
    },
  ];

  const amenities =
    listingVariant === "land" ? landFeatures : residentialAmenities;

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
          src={property.thumbnail[activeImageIndex]}
          alt={`Property view ${activeImageIndex + 1}`}
          fill
          className="w-full h-full"
        />
        {property.thumbnail.length > 1 && (
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
          {(property.thumbnail || property.images).map((img, idx) => (
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
            {(listingVariant === "rent"
              ? property.renticonImages
              : property.buyiconImages) && (
              <div className="flex items-center gap-10">
                {(listingVariant === "rent"
                  ? property.renticonImages
                  : property.buyiconImages)!.map((icon, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className="w-[55px] lg:w-[95px] h-[40px] lg:h-[65px]">
                      <Image
                        src={icon}
                        alt="Feature"
                        width={100}
                        height={60}
                        className="w-full h-full"
                      />
                    </div>
                    <span className="text-xl font-extrabold font-amasis  text-[#343434]">
                      {property.iconLabels?.[i] ?? "1"}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {/* Location & Size */}
            <div className="flex flex-col sm:flex-row sm:items-center">
              <div className="flex items-center gap-1">
                <Image
                  src={locationIcon}
                  alt="Location"
                  className="w-10 h-10 shrink-0 mt-0.5 sm:mt-0"
                />
                <h1 className="text-base lg:text-xl font-semibold text-[#343434]">
                  {property.location}
                </h1>
              </div>
            </div>

            <div className="flex flex-col lg:flex-row items-start lg:items-center gap-3 lg:gap-4 text-gray-600">
              {listingVariant !== "land" && (
                <>
                  <div className="flex items-center gap-1 ">
                    <Image
                      src={calender}
                      alt="calendericon"
                      className="w-10 h-10  shrink-0"
                    />
                    <span className="text-[#343434] font-semibold text-base lg:text-xl">
                      {property.date}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Image
                      src={clock}
                      alt="clockicon"
                      className="w-10 h-10  shrink-0"
                    />
                    <span className="text-[#343434] font-semibold text-base lg:text-xl">
                      {property.time}
                    </span>
                  </div>
                </>
              )}
              <div className="flex items-center gap-2 ml-2 shrink-0">
                <Image
                  src={squaremetericon}
                  alt="location"
                  className="w-6 h-6 shrink-0"
                />
                <p className="text-[#343434] font-semibold text-base lg:text-xl">
                  {property.size}
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
                  {property.priceRange}
                </p>
              </div>

              <p className="text-[#343434] font-semibold text-base lg:text-xl">
                • {property.propertyType}
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
                    src={property.agentImageCard}
                    alt={property.agentName}
                    width={120}
                    height={120}
                    className="rounded-full object-cover w-18 h-18 lg:w-20 lg:h-20 "
                  />

                  {/* Flags */}
                  <div className="flex gap-2">
                    {property.flags.map((flag, idx) => (
                      <Image
                        key={idx}
                        src={flag}
                        alt="flag"
                        width={24}
                        height={24}
                        className="w-4 h-4 lg:w-8 lg:h-8 "
                      />
                    ))}
                  </div>

                  {/* Name */}
                  <h3 className="font-semibold text-sm lg:text-lg whitespace-nowrap text-[#343434] lg:text-center">
                    {property.agentName}
                  </h3>
                </div>

                {/* RIGHT SECTION */}
                <div className="flex flex-col justify-center gap-1 flex-1">
                  {/* Company */}
                  <h2 className="text-xl lg:text-3xl  font-bold text-[#343434] whitespace-nowrap">
                    {property.agentCompanyName}
                  </h2>

                  {/* phone number */}
                  <p className="text-sm text-gray-500">+614578912305</p>

                  {/* Stars */}

                  {/* Social Icons */}
                  <div className="my-2">
                    <SocialIcons />
                  </div>
                  <div className="">
                    {" "}
                    <Image
                      src={star}
                      alt="star icons"
                      className="size-1/2 lg:size-auto"
                    />{" "}
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
            This architecturally designed development offers an sophisticated
            retreat, just 5km from the Sydney CBD. Bathed in natural light, the
            spacious open-plan living and dining areas flow effortlessly onto a
            private balcony with city views. Featuring a gourmet Caesarstone
            kitchen with Smeg appliances, and a luxurious master suite, this
            property is the epitome of comfort and style.
          </p>
        </div>

        {/* Amenities & Facilities */}
        <div
          className="bg-white px-6 py-5 rounded-2xl shadow-sm border border-gray-100 relative group overflow-hidden"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <h2 className="text-xl font-bold  mb-4 font-amasis  bg-[#F0F0F0] text-[#111827] px-8 py-2 rounded-3xl inline-block  [text-shadow:_0px_0px_4px_rgb(255_255_255_/_100%)] shadow-[4px_4px_10px_rgba(0,0,0,0.15)">
            Amenities & Facilities
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
            {amenities.map((item, idx) => (
              <div
                key={idx}
                className="relative rounded-xl shrink-0 overflow-hidden flex flex-col items-center justify-center text-center transition-transform hover:scale-105 cursor-default w-32 h-32"
              >
                <Image
                  src={item.icons[tick % item.icons.length]}
                  alt="amenity"
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
                title="Map view"
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
              {/* Fake satellite view using a different openstreetmap tile layer or just placeholder */}
              <iframe
                title="Satellite view"
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
              This provides a typical localized sales and construction history
              for an apartment complex in this area.
            </p>
            <p>
              Mar 2026: Property listed on REALTO by Peter Nikolatos (LJ
              Hooker).
            </p>
            <p>
              Nov 2025: Construction completion certificate issued for
              &apos;A&apos; Block development.
            </p>
            <p>
              Jun 2024: Construction commenced for the &apos;A&apos; Block
              modern complex.
            </p>
            <p>
              Jan 2024: DA Approval granted by City of Sydney Council for
              development (DA/2023/1234).
            </p>
            <p>
              Oct 2023: Site acquisition and DA submission for a new residential
              development.
            </p>
            <p>
              Sep 2023: Vacant site listed for sale by Expressions of Interest.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetailView;
