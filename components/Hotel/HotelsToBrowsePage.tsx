"use client";

import { getHotelListings } from "@/lib/hotel/repository";
import SearchFilterBar from "@/components/PropertyListing/SearchFilterBar";
import { HotelCard } from "@/components/Hotel/LastMinuteHotelsNearYou";

export default function HotelsToBrowsePage() {
  const hotels = getHotelListings();

  return (
    <div className="max-w-screen-2xl mx-auto min-h-screen bg-gray-50">
      <SearchFilterBar isMapView={false} onToggleView={() => {}} showViewToggle={false} />

      <div className="px-4 py-6 sm:px-6 lg:px-10">
        <h1 className="mb-4 text-2xl font-bold text-[#343434]">Hotels To Browse</h1>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {hotels.map((hotel) => (
            <HotelCard key={hotel.id} hotel={hotel} />
          ))}
        </div>
      </div>
    </div>
  );
}
