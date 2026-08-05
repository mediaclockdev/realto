"use client";

import Image from "next/image";
import type { CommercialListing } from "@/lib/commercial/types";

export default function CommercialListingCard({
  listing,
}: {
  listing: CommercialListing;
}) {
  return (
    <div className="rounded-2xl overflow-hidden w-full bg-white shadow-sm hover:shadow-md transition-shadow cursor-pointer">
      <div className="relative h-[160px] w-full">
        <Image
          src={listing.thumbnail}
          alt={listing.title}
          fill
          className="object-cover"
        />
      </div>
      <div className="px-4 py-3 space-y-0.5">
        <div className="flex justify-between items-center gap-2">
          <h3 className="text-[15px] font-semibold text-black truncate">
            {listing.title}
          </h3>
          <span className="text-xs font-bold text-[#007CBE] shrink-0">
            {listing.listingType}
          </span>
        </div>
        <p className="text-gray-500 text-[13px] truncate">{listing.address}</p>
        <p className="text-[#343434] text-[14px] font-medium">
          {listing.price}
        </p>
      </div>
    </div>
  );
}
