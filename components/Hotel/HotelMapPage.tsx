"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { HotelListing } from "@/lib/hotel/types";
import HotelMapCanvas from "./HotelMapCanvas";
import HotelResultCard from "./HotelResultCard";
import SearchFilterBar from "@/components/PropertyListing/SearchFilterBar";

interface HotelMapPageProps {
  title: string;
  listings: HotelListing[];
  selectedHotelId?: string;
}

export default function HotelMapPage({
  title,
  listings,
  selectedHotelId,
}: HotelMapPageProps) {
  const router = useRouter();
  const [activeListing, setActiveListing] = useState(
    listings.find(
      (listing) =>
        listing.id === selectedHotelId || listing.slug === selectedHotelId,
    ) ?? listings[0],
  );

  return (
    <main className="min-h-screen bg-[#f3f3f3]">
      <div className="">
        <SearchFilterBar
          isMapView
          onToggleView={() =>
            router.push(
              `/hotel/${activeListing?.slug ?? listings[0]?.slug ?? ""}`,
            )
          }
          listingVariant="buy"
        />
      </div>

      <div className="mx-auto max-w-screen-2xl px-4 py-6 sm:px-5">
        <div className="mt-4 space-y-4">
          <HotelMapCanvas listing={activeListing} title={title} />

          <div className="grid gap-4 md:grid-cols-2">
            {listings.map((listing) => (
              <button
                key={listing.id}
                type="button"
                onClick={() => setActiveListing(listing)}
                className={`text-left transition-transform hover:scale-[1.01] ${
                  activeListing.id === listing.id
                    ? "rounded-2xl ring-2 ring-[#5b8def]"
                    : ""
                }`}
              >
                <HotelResultCard
                  listing={listing}
                  detailHref={`/hotel/${listing.slug}`}
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
