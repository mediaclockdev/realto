"use client";

import React, { useState } from "react";
import Image, { StaticImageData } from "next/image";
import internationaltower from "../../public/international tower.jpg";
import port from "../../public/port melbourn.jpg";
import collins from "../../public/collins Street.jpg";

interface Property {
  id: string;
  title: string;
  image: string | StaticImageData;
  sqm: number;
  level: number;
  location: string;
  postcode: string;
  state: string;
}

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

const PROPERTIES: Property[] = [
  {
    id: "1",
    title: "International Towers , Sydney",
    image: internationaltower,
    sqm: 1200,
    level: 45,
    location: "Barangaroo",
    postcode: "NSW 2000",
    state: "NSW",
  },
  {
    id: "2",
    title: "Port Melbourne Logistics hub",
    image: port,
    sqm: 1200,
    level: 45,
    location: "Barangaroo",
    postcode: "NSW 2000",
    state: "NSW",
  },
  {
    id: "3",
    title: "Collins Street luxury Retail",
    image: collins,
    sqm: 1200,
    level: 45,
    location: "Barangaroo",
    postcode: "NSW 2000",
    state: "NSW",
  },
];

export default function PremiumFeaturedListing() {
  const [activeState, setActiveState] = useState("All States");

  return (
    <div className="max-w-screen-2xl mx-auto px-5 py-5">
      <div className="">
        {/* Header */}
        <div className="mb-4 lg:mb-8">
          <h2 className="text-2xl lg:text-[32px] font-semibold font-poppins text-[#4189DD] mb-2">
            Exclusives
          </h2>
        </div>
        <div className="flex flex-col lg:flex-row justify-between gap-5 mb-5">
          <h3 className="text-2xl lg:text-[32px] font-semibold text-black">
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
                    {property.sqm} sqm | Level {property.level}
                  </p>
                  <p className="text-sm text-black font-normal font-poppins">
                    {property.location},{property.postcode}
                  </p>
                </div>

                {/* CTA Section */}
                <div className="flex items-center justify-between pt-1 ">
                  <button className="font-semibold text-black text-lg lg:text-xl hover:text-blue-600 transition-colors cursor-pointer">
                    Contact For Pricing
                  </button>
                  <a
                    href="#"
                    className="text-[#4189DD] hover:text-blue-700 font-semibold transition-colors text-sm font-poppins cursor-pointer hover:underline decoration-blue-700"
                  >
                    View Details
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
