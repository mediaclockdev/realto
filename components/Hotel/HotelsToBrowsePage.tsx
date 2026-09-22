"use client";

import { useState } from "react";
import { getHotelListings } from "@/lib/hotel/repository";
import HotelSearchBar from "@/components/Hotel/HotelSearchBar";
import { HotelCard } from "@/components/Hotel/LastMinuteHotelsNearYou";
import HotelFilterBar from "@/components/Hotel/HotelFilterBar";

export default function HotelsToBrowsePage() {
  const hotels = getHotelListings();
  const [filtersOpen, setFiltersOpen] = useState(true);

  return (
    <div className="max-w-screen-2xl mx-auto min-h-screen bg-gray-50">
      <HotelSearchBar
        isOpen={filtersOpen}
        onToggle={() => setFiltersOpen(!filtersOpen)}
      />

      <div className="px-4 py-6 sm:px-6 lg:px-10">
        <h1 className="mb-4 text-2xl font-bold text-[#343434]">Hotels To Browse</h1>
        {filtersOpen && <HotelFilterBar className="mb-6" />}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {hotels.map((hotel) => (
            <HotelCard key={hotel.id} hotel={hotel} />
          ))}
        </div>
      </div>
    </div>
  );
}
