"use client";

import { useMemo, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import type { HotelListing } from "@/lib/hotel/types";
import LastMinuteHotels from "./LastMinuteHotelsNearYou";
import SearchFilterBar from "@/components/PropertyListing/SearchFilterBar";
import location from "@/public/location.svg";
import calender from "@/public/calender.svg";
import clock from "@/public/clock.svg";
import squaremetericon from "@/public/squaremetericon.svg";
import GetMatchedNow from "../PropertyListing/GetMatchedNow";
import inqury from "../../public/inqurylogo.svg";
import star from "../../public/star.svg";
import PropertyDetailView from "../PropertyListing/PropertyDetailView";

interface HotelDetailPageProps {
  hotel: HotelListing;
}

export default function HotelDetailPage({ hotel }: HotelDetailPageProps) {
  const router = useRouter();
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [isInquiryOpen, setIsInquiryOpen] = useState(false);

  const hotelSummary = useMemo(() => hotel.summary, [hotel.summary]);

  const featureImages = [
    hotel.gallery[1] ?? hotel.heroImage,
    hotel.gallery[2] ?? hotel.heroImage,
    hotel.gallery[3] ?? hotel.heroImage,
  ];

  const amenityCards = hotel.amenities.map((amenity) => ({
    title: amenity.label,
    image: amenity.icon,
  }));

  const checkScroll = () => {
    const el = scrollRef.current;
    if (!el) return;

    setShowLeft(el.scrollLeft > 0);
    setShowRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 5);
  };

  const scrollAmenities = (dir: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;

    el.scrollBy({
      left: dir === "left" ? -220 : 220,
      behavior: "smooth",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <SearchFilterBar
        isMapView={false}
        onToggleView={() => router.push(`/hotel/map?id=${hotel.slug}`)}
        listingVariant="buy"
      />

      <div>
        <section className="overflow-hidden border border-gray-200 bg-white shadow-sm">
          <div className="relative h-[260px] sm:h-[380px] lg:h-[430px]">
            <Image
              src={hotel.gallery[activeImageIndex]}
              alt={hotel.title}
              fill
              className="object-cover"
              priority
            />
            <button
              type="button"
              onClick={() =>
                setActiveImageIndex(
                  (current) => (current + 1) % hotel.gallery.length,
                )
              }
              className="absolute right-0 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-r-xl bg-white/90 text-[#343434] shadow"
              aria-label="Next image"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>

          <div className="scrollbar-hide flex gap-2 overflow-x-auto bg-[#f7f7f7] px-2 py-3">
            {hotel.gallery.map((image, index) => (
              <button
                key={`${hotel.id}-${index}`}
                type="button"
                onClick={() => setActiveImageIndex(index)}
                className={`relative h-40 w-40 shrink-0 overflow-hidden rounded-[10px] border ${
                  activeImageIndex === index
                    ? "border-[#5b8def]"
                    : "border-transparent"
                }`}
              >
                <Image
                  src={image}
                  alt={`${hotel.title} thumbnail ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        </section>

        <section className="mt-4 grid gap-4 lg:grid-cols-[1.5fr_1fr]">
          {/* LEFT CARD — info on left, agent card on right */}
          <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Left section — icons, location, meta, price */}
              <div className="flex flex-col gap-3 flex-1">
                {hotel.iconImages && (
                  <div className="flex items-center gap-2">
                    {hotel.iconImages.map((icon, i) => (
                      <div key={i} className="flex items-center gap-1">
                        <div className="w-[95px] h-[65px]">
                          <Image
                            src={icon}
                            alt="Feature"
                            width={100}
                            height={60}
                            className="w-full h-full"
                          />
                        </div>
                        <span className="text-sm font-bold text-gray-800">
                          {hotel.iconLabels?.[i] ?? "1"}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                <div className="flex items-center gap-2">
                  <Image src={location} alt="Location" className="h-8 w-8" />
                  <p className="text-[15px] font-semibold text-[#343434] sm:text-xl">
                    {hotel.location}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3 text-sm font-semibold text-[#343434]">
                  <div className="flex items-center gap-1">
                    <Image src={calender} alt="Date" className="h-8 w-8" />
                    <span>{hotel.meta[0]}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Image src={clock} alt="Time" className="h-8 w-8" />
                    <span>{hotel.meta[1]}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Image
                      src={squaremetericon}
                      alt="Area"
                      className="h-6 w-6"
                    />
                    <span>{hotel.meta[2]}</span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2 text-lg font-semibold text-[#343434]">
                  <span>{hotel.priceLabel}</span>
                  <span className="text-gray-400">•</span>
                  <span>Apartment</span>
                </div>
              </div>

              {/* Right section — agent card + inquiry */}
              {/* <div className="flex flex-col gap-3 w-[320px] shrink-0">
                <div className="bg-[#EDEDED] rounded-2xl shadow-md p-3">
                  <div className="flex items-center gap-3">
                    <div className="flex flex-col items-center gap-2 min-w-[80px]">
                      <Image
                        src={hotel.host.avatar}
                        alt="hotel host"
                        width={72}
                        height={72}
                        className="rounded-full object-cover w-16 h-16"
                      />
                      <div className="flex gap-1">
                        {hotel.host.flags.map((flag, idx) => (
                          <Image
                            key={idx}
                            src={flag}
                            alt="flag"
                            width={16}
                            height={16}
                            className="w-4 h-4"
                          />
                        ))}
                      </div>
                      <h3 className="font-semibold text-xs text-[#343434] text-center">
                        {hotel.host.name}
                      </h3>
                    </div>

                    <div className="w-[1px] bg-gray-300 self-stretch" />

                    <div className="flex flex-col gap-1 flex-1">
                      <h2 className="text-sm font-bold text-[#343434]">
                        {hotel.host.company}
                      </h2>
                      <p className="text-xs text-gray-500">License #12345678</p>
                      <Image src={star} alt="star icons" className="w-1/2" />
                      <div className="flex items-center gap-1.5 mt-1">
                        {hotel.host.socials.map((icon, i) => (
                          <Image
                            key={i}
                            src={icon}
                            alt="icon"
                            width={18}
                            height={18}
                            className="object-contain"
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <GetMatchedNow
                  open={isInquiryOpen}
                  onClose={() => setIsInquiryOpen(false)}
                />

                <button
                  type="button"
                  onClick={() => setIsInquiryOpen(true)}
                  className="bg-[#EDEDED] rounded-2xl shadow-md flex items-center justify-center gap-2 py-3 w-full hover:bg-gray-200 transition cursor-pointer"
                >
                  <Image src={inqury} alt="enquiry" width={24} height={24} />
                  <span className="text-sm font-semibold text-[#343434]">
                    Send an inquiry
                  </span>
                </button>
              </div> */}
              <div className="w-full lg:max-w-md ">
                {/* Card */}
                <div className="bg-[#EDEDED] rounded-2xl shadow-md p-2 lg:p-5 sticky top-6">
                  <div className="flex items-center gap-2 lg:gap-6">
                    {/* LEFT SECTION */}
                    <div className="flex flex-col items-center gap-2 lg:gap-3 min-w-[100px]">
                      <Image
                        src={hotel.host.avatar}
                        alt="hotel host"
                        width={120}
                        height={120}
                        className="rounded-full object-cover w-18 h-18 lg:w-18 lg:h-18 "
                      />

                      {/* Flags */}
                      <div className="flex gap-2">
                        {hotel.host.flags.map((flag, idx) => (
                          <Image
                            key={idx}
                            src={flag}
                            alt="flag"
                            width={24}
                            height={24}
                            className="w-4 h-4 lg:w-4 lg:h-4 "
                          />
                        ))}
                      </div>

                      {/* Name */}
                      <h3 className="font-semibold text-sm lg:text-base text-[#343434] lg:text-center">
                        {hotel.host.name}
                      </h3>
                    </div>

                    {/* Divider */}
                    <div className="w-[1px] bg-gray-300 h-full" />

                    {/* RIGHT SECTION */}
                    <div className="flex flex-col justify-center gap-1 flex-1">
                      {/* Company */}
                      <h2 className="text-base  font-bold text-[#343434]">
                        {hotel.host.company}
                      </h2>

                      {/* License */}
                      <p className="text-sm text-gray-500">License #12345678</p>

                      {/* Stars */}
                      <div className="">
                        {" "}
                        <Image
                          src={star}
                          alt="star icons"
                          className="size-1/2 lg:size-auto"
                        />{" "}
                      </div>

                      {/* Social Icons */}
                      <div className="flex items-center gap-2.5 mt-2">
                        {hotel.host.socials.map((icon, i) => (
                          <div
                            key={i}
                            className="w-4 lg:w-8 h-4 lg:h-8  flex items-center justify-center "
                          >
                            <Image
                              src={icon}
                              alt="icon"
                              width={24}
                              height={24}
                              className="object-contain"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <GetMatchedNow
                  open={isInquiryOpen}
                  onClose={() => setIsInquiryOpen(false)}
                />

                {/* Enquiry Button */}
                <button
                  type="button"
                  onClick={() => setIsInquiryOpen(true)}
                  className="bg-[#EDEDED] mt-3 rounded-2xl shadow-md flex items-center justify-center gap-3 py-3 lg:py-4 w-full hover:bg-gray-200 transition cursor-pointer"
                >
                  <Image src={inqury} alt="enquiry" width={28} height={28} />
                  <span className="text-base lg:text-lg font-semibold text-[#343434]">
                    Send an inquiry
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* RIGHT CARD — Property description */}
          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <h2 className="text-xl font-semibold text-[#343434]">
              Property description
            </h2>
            <p className="mt-3 text-sm text-[#4a4a4a] leading-7">
              {hotelSummary}
            </p>
          </div>
        </section>

        <section
          className="relative mt-4 overflow-hidden rounded-2xl border border-gray-200 bg-white px-5 py-5 shadow-sm"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <h2 className="text-xl font-semibold text-[#343434]">
            Amenities & Facilities
          </h2>

          {isHovered && showLeft ? (
            <button
              type="button"
              onClick={() => scrollAmenities("left")}
              className="absolute left-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white text-[#343434] shadow-md"
              aria-label="Scroll amenities left"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
          ) : null}

          {isHovered && showRight ? (
            <button
              type="button"
              onClick={() => scrollAmenities("right")}
              className="absolute right-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white text-[#343434] shadow-md"
              aria-label="Scroll amenities right"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          ) : null}

          <div
            ref={scrollRef}
            onScroll={checkScroll}
            className="scrollbar-hide mt-4 flex gap-5 overflow-x-auto"
          >
            {amenityCards.map((item, idx) => (
              <div
                key={idx}
                className="rounded-xl shrink-0 flex flex-col items-center justify-center gap-3 text-center transition-transform hover:scale-105 cursor-default"
              >
                <Image
                  src={item.image}
                  alt="amenity"
                  width={120}
                  height={120}
                  className="w-32 h-32"
                />
              </div>
            ))}
          </div>
        </section>

        <LastMinuteHotels />

        <section className="mt-4 grid gap-4 md:grid-cols-2">
          <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
            <iframe
              title="Map view of property"
              width="100%"
              height="300"
              loading="lazy"
              src="https://www.openstreetmap.org/export/embed.html?bbox=151.0%2C-34.0%2C151.2%2C-33.8&layer=mapnik&marker=-33.9%2C151.1"
              className="border-0"
            />
            <p className="px-4 py-3 text-center text-sm font-semibold text-[#343434]">
              Map view of property
            </p>
          </div>
          <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
            <iframe
              title="Satellite view of property"
              width="100%"
              height="300"
              loading="lazy"
              src="https://www.openstreetmap.org/export/embed.html?bbox=151.0%2C-34.0%2C151.2%2C-33.8&layer=hot&marker=-33.9%2C151.1"
              className="border-0"
            />
            <p className="px-4 py-3 text-center text-sm font-semibold text-[#343434]">
              Satellite view of property
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
