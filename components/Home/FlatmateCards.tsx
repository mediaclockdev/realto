"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ListingCard from "@/components/Flatmate/ListingCard";
import { flatmateListings } from "@/lib/flatmate/data";
import backgroundimg from "@/public/homepageheadingbackground1.svg";
import Image from "next/image";

const VISIBLE_COUNT = 8;

const FlatmateCards = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [isAtEnd, setIsAtEnd] = useState(false);

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const {
      scrollLeft: nextScrollLeft,
      scrollWidth,
      clientWidth,
    } = scrollRef.current;
    setScrollLeft(nextScrollLeft);
    setIsAtEnd(nextScrollLeft + clientWidth >= scrollWidth - 10);
  };

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollTo({
      left: scrollRef.current.scrollLeft + (direction === "left" ? -712 : 712),
      behavior: "smooth",
    });
  };

  return (
    <section className="mx-auto max-w-screen-2xl px-5 py-5">
      <div className="flex justify-center">
        <div className="relative inline-flex items-center justify-center gap-2 px-6 py-4">
          <Image
            src={backgroundimg}
            alt="heading background"
            className="absolute inset-0 w-full h-full"
          />

          <h2 className="relative z-10 text-center font-extrabold font-amasis text-base lg:text-[32px] reel-text-heading">
            Shared Accomodation
          </h2>
        </div>
      </div>

      <div className="relative">
        {scrollLeft > 10 && (
          <button
            type="button"
            aria-label="Scroll flatmate cards left"
            onClick={() => scroll("left")}
            className="absolute -left-3 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white p-2 shadow-lg transition hover:bg-gray-100"
          >
            <ChevronLeft className="h-5 w-5 text-gray-800" />
          </button>
        )}

        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="-mx-2 flex gap-4 overflow-x-auto px-2 py-3 scroll-smooth scrollbar-hide"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {flatmateListings.slice(0, VISIBLE_COUNT).map((listing) => (
            <Link
              key={listing.id}
              href={`/flatmate/${listing.id}`}
              className="w-[280px] shrink-0 sm:w-[340px]"
            >
              <ListingCard listing={listing} />
            </Link>
          ))}
        </div>

        {!isAtEnd && (
          <button
            type="button"
            aria-label="Scroll flatmate cards right"
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

export default FlatmateCards;
