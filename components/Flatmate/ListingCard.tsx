"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { Heart } from "lucide-react";
import like from "@/public/sharedaccomodationlikeicon.svg";
import likked from "@/public/sharedaccomodationlikedicon.svg";
import type { FlatmateListing } from "@/lib/flatmate/types";

const GOLD_GRADIENT =
  "linear-gradient(90deg, #CB9E33, #EDD06A, #FCEA94, #FADE7B, #FDEE9D, #C29225)";

export default function ListingCard({ listing }: { listing: FlatmateListing }) {
  const isFlatmate = listing.type === "flatmate";
  const [liked, setLiked] = useState(false);
  const outerRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={outerRef}
      className="rounded-2xl cursor-pointer transition-all duration-300 hover:scale-[1.02] p-[2px]"
      style={{ background: "transparent" }}
      onMouseEnter={() => {
        if (outerRef.current) outerRef.current.style.background = GOLD_GRADIENT;
      }}
      onMouseLeave={() => {
        if (outerRef.current) outerRef.current.style.background = "transparent";
      }}
    >
      <div className="rounded-2xl overflow-hidden w-full bg-white">
        {/* Image Section */}
        <div className="relative h-[220px] w-full">
          <Image
            src={listing.thumbnail}
            alt={listing.title}
            fill
            unoptimized
            className="object-cover"
          />

          {/* Heart / Favourite Button */}
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setLiked(!liked);
            }}
            className="absolute top-4 right-4 cursor-pointer hover:scale-105 transition-all"
          >
            <Image
              src={liked ? likked : like}
              alt="like"
              width={24}
              height={24}
            />
          </button>
        </div>

        {/* Content Section */}
        <div className="px-4 py-3 space-y-0.5 h-[130px]">
          {/* Icon badges for place type - below image */}
          {!isFlatmate && (
            <div className="flex items-center gap-2">
              {listing.roomIcons.map((item, idx) => (
                <div key={idx} className="flex items-center gap-1">
                  <div className="relative size-10">
                    <Image
                      src={item.icon}
                      alt="amenity"
                      fill
                      unoptimized
                      className="object-contain rounded-sm"
                    />
                  </div>
                  <span className="text-[11px] font-bold text-gray-800">
                    {item.count}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* Title + Price Row */}
          <div className="flex justify-between items-center">
            <h3 className="text-[16px] font-semibold text-black">
              {listing.title}
            </h3>
            <p className="text-gray-700 text-[15px] font-medium">
              {listing.price}
            </p>
          </div>

          {/* Subtitle */}
          <p className="text-gray-500 text-[14px]">{listing.subtitle}</p>

          {/* Availability */}
          {listing.Available && (
            <p className="text-[#2EC86A] text-[13px] font-medium">
              {listing.Available}
            </p>
          )}

          {/* Months / Availability date */}
          <p
            className={`text-[13px] font-medium ${isFlatmate ? "text-gray-500" : "text-[#2EC86A]"}`}
          >
            {listing.months}
          </p>
        </div>
      </div>
    </div>
  );
}
