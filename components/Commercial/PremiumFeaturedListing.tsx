"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { commercialListings } from "@/lib/commercial/data";

const STATES = [
  "All States",
  "Popular Areas",
  "VIC",
  "NSW",
  "WA",
  "QLD",
  "SA",
  "TAS",
  "ACT",
  "NT",
];

const PROPERTIES = commercialListings.slice(0, 3).map((listing) => ({
  id: listing.id,
  title: listing.title,
  image: listing.thumbnail,
  sqm: listing.size,
  level: listing.carSpaces,
  location: listing.location,
}));

export default function PremiumFeaturedListing() {
  const [activeState, setActiveState] = useState("All States");

  return (
    <div className="max-w-screen-2xl mx-auto px-5 py-5">
      <div className="">
        {/* Header */}

        <div className="flex flex-col lg:flex-row justify-between gap-5 mb-5">
          <h3 className="text-2xl lg:text-[32px] font-semibold text-[#0287C7]">
            Premium Featured Listing
          </h3>
          {/* State Tabs */}
          <div className=" flex flex-wrap gap-2 rounded-xl p-2 shadow-sm">
            {STATES.map((state) => (
              <button
                key={state}
                onClick={() => setActiveState(state)}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-all whitespace-nowrap ${
                  activeState === state
                    ? "text-[#4189DD] underline decoration-[#4189DD] font-poppins font-normal text-sm lg:text-base "
                    : "text-black font-poppins font-normal text-sm lg:text-base hover:cursor-pointer"
                }`}
              >
                {state}
              </button>
            ))}
          </div>
        </div>
        {/* Property Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PROPERTIES.map((property) => (
            <div
              key={property.id}
              className="group overflow-hidden rounded-2xl  hover:shadow-xl transition-shadow"
            >
              {/* Image Container */}
              <div className="relative h-64 w-full overflow-hidden ">
                <Image
                  src={property.image}
                  alt={property.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Content Container */}
              <div className="p-3 lg:p-6">
                {/* Title */}
                <h4 className="text-lg lg:text-xl font-poppins font-semibold text-black mb-3 ">
                  {property.title}
                </h4>

                {/* Property Details */}
                <div className="space-y-2 mb-1">
                  <p className="text-sm text-black font-normal font-poppins">
                    {property.sqm} sqm | {property.level} car spaces
                  </p>
                  <p className="text-sm text-black font-normal font-poppins">
                    {property.location}
                  </p>
                </div>

                {/* CTA Section */}
                <div className="flex items-center justify-between pt-1 ">
                  <button className="font-semibold text-black text-lg lg:text-xl hover:text-blue-600 transition-colors cursor-pointer">
                    Contact For Pricing
                  </button>
                  <Link
                    href={`/commercial/${property.id}`}
                    className="text-[#4189DD] hover:text-blue-700 font-semibold transition-colors text-sm font-poppins cursor-pointer hover:underline decoration-blue-700"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
