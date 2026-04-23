"use client";

import React, { useRef } from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";
import type { ImageSource } from "@/lib/shared/types";
import BuyPropertyCard from "@/components/PropertyListing/BuyPropertyCard";

export interface PropertyData {
  id: string;
  images: ImageSource[];
  location: string;
  size: string;
  date: string;
  dateicon: ImageSource;
  time: string;
  priceRange: string;
  propertyType: string;
  agentName: string;
  agentCompany: ImageSource;
  agentLocation: string;
  agentPhone: string;
  agentEmail: string;
  agentImage: ImageSource;
  iconImages?: ImageSource[];
  iconLabels?: string[];
}

interface PropertySliderProps {
  properties: PropertyData[];
  onPropertyClick?: (property: PropertyData) => void;
}

export const PropertySlider: React.FC<PropertySliderProps> = ({
  properties,
  onPropertyClick,
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 400;
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
    <div className="group relative overflow-visible">
      <button
        onClick={() => scroll("left")}
        className="absolute left-0 top-1/2 z-10 -ml-6 -translate-y-1/2 rounded-full bg-white p-3 shadow-lg opacity-0 transition-opacity duration-300 group-hover:opacity-100 hover:bg-gray-100"
        aria-label="Scroll left"
      >
        <ChevronLeft className="h-6 w-6 text-gray-800" />
      </button>

      <div
        ref={scrollContainerRef}
        className="scrollbar-hide flex gap-6 overflow-x-auto overflow-y-visible scroll-smooth px-0 py-7 lg:px-2"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {properties.map((property) => (
          <BuyPropertyCard
            key={property.id}
            sliderMode
            property={{
              id: property.id,
              images: property.images,
              location: property.location,
              size: property.size,
              date: property.date,
              dateIcon: property.dateicon,
              time: property.time,
              priceRange: property.priceRange,
              propertyType: property.propertyType,
              agentName: property.agentName,
              agentCompany: property.agentCompany,
              agentLocation: property.agentLocation,
              agentPhone: property.agentPhone,
              agentEmail: property.agentEmail,
              agentImage: property.agentImage,
              buyiconImages: property.iconImages,
              iconLabels: property.iconLabels,
            }}
            onClick={() => onPropertyClick?.(property)}
          />
        ))}
      </div>

      <button
        onClick={() => scroll("right")}
        className="absolute right-0 top-1/2 z-10 -mr-6 -translate-y-1/2 rounded-full bg-white p-3 shadow-lg opacity-0 transition-opacity duration-300 group-hover:opacity-100 hover:bg-gray-100"
        aria-label="Scroll right"
      >
        <ChevronRight className="h-6 w-6 text-gray-800" />
      </button>
    </div>
  );
};
