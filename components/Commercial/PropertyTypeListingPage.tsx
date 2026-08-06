"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { CommercialPropertyCard } from "./Explorenewproperties";
import type { CommercialListing } from "@/lib/commercial/types";
import type { PropertyCategory } from "@/lib/commercial/categories";

const LISTING_FILTERS = ["All", "Buy", "Lease"] as const;

export default function PropertyTypeListingPage({
  category,
  listings,
}: {
  category: PropertyCategory;
  listings: CommercialListing[];
}) {
  const [filter, setFilter] = useState<(typeof LISTING_FILTERS)[number]>("All");
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const filtered = listings.filter(
    (listing) => filter === "All" || listing.listingType === filter,
  );
  const categoryWord = category.name.split(",")[0];

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
    <div className="max-w-screen-2xl mx-auto px-5 py-5">
      <Link
        href="/commercial"
        className="text-[#4189DD] text-sm font-poppins hover:underline"
      >
        ← Back to Commercial
      </Link>

      <div className="flex flex-col lg:flex-row justify-between gap-5 mt-4 mb-8">
        <h1 className="text-2xl lg:text-[32px] font-semibold text-[#0287C7]">
          {category.name}
        </h1>
        <div className="flex flex-wrap gap-2 rounded-xl p-2 shadow-sm w-fit">
          {LISTING_FILTERS.map((item) => (
            <button
              key={item}
              onClick={() => setFilter(item)}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                filter === item
                  ? "text-[#4189DD] underline decoration-[#4189DD]"
                  : "text-black hover:text-[#4189DD]"
              }`}
            >
              {item === "All" ? "All" : `${item} ${categoryWord}`}
            </button>
          ))}
        </div>
      </div>

      {filtered.length > 0 ? (
        <div className="relative group">
          <button
            onClick={() => scroll("left")}
            className="hidden md:flex absolute -left-4 top-1/2 -translate-y-1/2 z-10 bg-white hover:bg-slate-100 rounded-full p-2.5 shadow-lg border border-slate-100 text-slate-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300 items-center justify-center cursor-pointer"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <div
            className="flex gap-6 overflow-x-auto scroll-smooth py-2 px-1"
            ref={scrollContainerRef}
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {filtered.map((listing, index) => (
              <CommercialPropertyCard
                key={listing.id}
                property={listing}
                index={index}
              />
            ))}
          </div>

          <button
            onClick={() => scroll("right")}
            className="hidden md:flex absolute -right-4 top-1/2 -translate-y-1/2 z-10 bg-white hover:bg-slate-100 rounded-full p-2.5 shadow-lg border border-slate-100 text-slate-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300 items-center justify-center cursor-pointer"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      ) : (
        <p className="text-gray-500 py-10">
          No {filter !== "All" ? `${filter.toLowerCase()} ` : ""}listings
          available for this property type yet.
        </p>
      )}
    </div>
  );
}
