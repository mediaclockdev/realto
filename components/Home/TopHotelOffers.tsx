"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { getHotelListings } from "@/lib/hotel/repository";
import type { HotelListing } from "@/lib/hotel/types";
import star from "@/public/starsingle.svg";

const hotels = getHotelListings();

const StarRating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((item) => (
        <Image
          key={item}
          src={star}
          alt=""
          width={18}
          height={18}
          className={item <= rating ? "opacity-100" : "opacity-30"}
        />
      ))}
    </div>
  );
};

const TrendingIcon = () => {
  return (
    <svg
      className="h-6 w-6 text-gray-900"
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
  );
};

const HotelOfferCard = ({ hotel }: { hotel: HotelListing }) => {
  return (
    <Link
      href={`/hotel/${hotel.slug}`}
      className="group shrink-0 rounded-xl p-[2px] transition hover:bg-[linear-gradient(90deg,#CB9E33,#EDD06A,#FCEA94,#FADE7B,#FDEE9D,#C29225)]"
    >
      <article className="flex w-[280px] sm:w-[320px] md:w-[620px] max-w-[88vw] flex-col md:flex-row gap-3 md:gap-4 rounded-xl bg-white p-3 shadow-sm transition group-hover:shadow-lg">
        <div className="relative h-[160px] md:h-[150px] w-full md:w-[250px] shrink-0 overflow-hidden rounded-lg">
          <Image
            src={hotel.heroImage}
            alt={hotel.title}
            fill
            unoptimized
            className="object-cover"
            sizes="(max-width: 768px) 320px, 250px"
          />
        </div>

        <div className="flex min-w-0 flex-1 flex-col justify-between">
          <div>
            <div className="flex items-start justify-between gap-3">
              <StarRating rating={hotel.rating} />
              <div className="text-right">
                <p className="rounded-md bg-[#E7F2FD] px-2 py-0.5 text-[10px] md:text-xs font-semibold leading-tight text-[#4197EF]">
                  {hotel.badge}
                </p>
                <span className="text-[9px] text-[#909090]">525 reviews</span>
              </div>
            </div>

            <h3 className="mt-1 truncate font-poppins text-xl md:text-3xl font-semibold leading-tight text-black capitalize">
              {hotel.title.toLowerCase()}
            </h3>

            <div className="mt-1.5 md:mt-2 flex flex-wrap gap-1.5">
              {hotel.amenities.slice(0, 3).map((amenity) => (
                <span
                  key={amenity.label}
                  className="rounded-full border border-gray-300 px-2 py-0.5 text-[10px] md:text-xs text-gray-700"
                >
                  {amenity.label}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-3 md:mt-0 flex items-end justify-between gap-2 md:gap-4">
            <div>
              <p className="font-poppins text-[11px] md:text-sm font-semibold text-[#7ECC9B]">
                Free Cancellation
              </p>
              <p className="font-poppins text-[9px] md:text-xs text-[#909090]">
                {hotel.totalLabel}
              </p>
            </div>

            <div className="text-right mt-0 lg:mt-3">
              <p className="font-poppins text-xl md:text-3xl font-semibold leading-none text-black">
                {hotel.priceLabel}  <span className="font-poppins text-[10px] md:text-xs font-semibold text-[#909090]">
                /night
              </span>
              </p>
              
              <span className="mt-1.5 md:mt-2 inline-block rounded-lg bg-[#4189DD] px-3 md:px-6 py-1.5 font-poppins text-[11px] md:text-sm text-white transition group-hover:bg-[#3298DF]">
                View Detail
              </span>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
};

const TopHotelOffers = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [isAtEnd, setIsAtEnd] = useState(false);

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft: nextScrollLeft, scrollWidth, clientWidth } =
      scrollRef.current;
    setScrollLeft(nextScrollLeft);
    setIsAtEnd(nextScrollLeft + clientWidth >= scrollWidth - 10);
  };

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollTo({
      left: scrollRef.current.scrollLeft + (direction === "left" ? -640 : 640),
      behavior: "smooth",
    });
  };

  return (
    <section className="mx-auto max-w-screen-2xl px-5 py-5">
      <div className="mb-5 flex items-center gap-2">
        <h2 className="font-poppins text-xl font-semibold text-black lg:text-[32px]">
          TOP Hotels Offers
        </h2>
        <TrendingIcon />
      </div>

      <div className="relative">
        {scrollLeft > 10 && (
          <button
            type="button"
            aria-label="Scroll hotel offers left"
            onClick={() => scroll("left")}
            className="absolute -left-3 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white p-2 shadow-lg transition hover:bg-gray-100"
          >
            <ChevronLeft className="h-5 w-5 text-gray-800" />
          </button>
        )}

        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex gap-4 overflow-x-auto py-1 scroll-smooth scrollbar-hide"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {hotels.map((hotel) => (
            <HotelOfferCard key={hotel.id} hotel={hotel} />
          ))}
        </div>

        {!isAtEnd && (
          <button
            type="button"
            aria-label="Scroll hotel offers right"
            onClick={() => scroll("right")}
            className="absolute -right-3 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white p-2 shadow-lg transition hover:bg-gray-100"
          >
            <ChevronRight className="h-5 w-5 text-gray-800" />
          </button>
        )}
      </div>
    </section>
  );
};

export default TopHotelOffers;
