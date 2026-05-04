"use client";

import React, { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import type { ListingVariant } from "@/lib/listings/types";
import type { ListingProperty } from "@/lib/properties/types";
import PropertyListingCard from "@/components/PropertyListing/PropertyListingCard";

interface PropertyListingCardSliderProps {
  properties: ListingProperty[];
  listingVariant: ListingVariant;
  scrollLabel: string;
}

const PropertyListingCardSlider = ({
  properties,
  listingVariant,
  scrollLabel,
}: PropertyListingCardSliderProps) => {
  const router = useRouter();
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (!scrollContainerRef.current) return;

    scrollContainerRef.current.scrollTo({
      left:
        direction === "left"
          ? scrollContainerRef.current.scrollLeft - 400
          : scrollContainerRef.current.scrollLeft + 400,
      behavior: "smooth",
    });
  };

  return (
    <div className="group relative overflow-visible">
      <button
        onClick={() => scroll("left")}
        className="absolute left-0 top-1/2 z-10 -ml-4 -translate-y-1/2 rounded-full bg-white p-3 shadow-lg opacity-0 transition-opacity duration-300 group-hover:opacity-100 hover:bg-gray-100"
        aria-label={`Scroll ${scrollLabel} left`}
      >
        <ChevronLeft className="h-6 w-6 text-gray-800" />
      </button>

      <div
        ref={scrollContainerRef}
        className="scrollbar-hide flex gap-6 overflow-x-auto overflow-y-visible scroll-smooth px-0 py-2 lg:px-2"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {properties.map((property, index) => (
          <div key={property.id} className="w-[340px] shrink-0">
            <PropertyListingCard
              property={property}
              listingVariant={listingVariant}
              onClick={() =>
                router.push(
                  `/property/${property.id}?listingVariant=${listingVariant}`,
                )
              }
              isLastItem={index === properties.length - 1}
              onSeeMore={() =>
                router.push(`/properties?listingVariant=${listingVariant}`)
              }
            />
          </div>
        ))}
      </div>

      <button
        onClick={() => scroll("right")}
        className="absolute right-0 top-1/2 z-10 -mr-4 -translate-y-1/2 rounded-full bg-white p-3 shadow-lg opacity-0 transition-opacity duration-300 group-hover:opacity-100 hover:bg-gray-100"
        aria-label={`Scroll ${scrollLabel} right`}
      >
        <ChevronRight className="h-6 w-6 text-gray-800" />
      </button>
    </div>
  );
};
export default PropertyListingCardSlider;
