import React, { useState } from "react";
import Image from "next/image";
import { ChevronRight, ChevronLeft } from "lucide-react";
import location from "@/public/location.svg";
import type { ListingProperty } from "./types";
import share from "../../public/share.svg";
import home from "../../public/home.svg";
import mobile from "../../public/mobileicon.svg";
import mail from "../../public/mailicon.svg";

interface PropertyListingCardProps {
  property: ListingProperty;
  isMapView?: boolean;
}

const PropertyListingCard: React.FC<PropertyListingCardProps> = ({
  property,
  isMapView = false,
}) => {
  const [imgIndex, setImgIndex] = useState(0);

  const next = (e: React.MouseEvent) => {
    e.stopPropagation();
    setImgIndex((p) => (p + 1) % property.images.length);
  };
  const prev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setImgIndex(
      (p) => (p - 1 + property.images.length) % property.images.length,
    );
  };

  return (
    <div
      className={`bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md border border-gray-100 transition-shadow duration-200 cursor-pointer ${
        isMapView ? "flex flex-row" : "flex flex-col"
      }`}
    >
      {/* Image */}
      <div
        className={`relative bg-gray-200 group/img shrink-0 ${
          isMapView ? "w-40 sm:w-48 h-auto" : " h-44  lg:w-full"
        }`}
      >
        <Image
          src={property.images[imgIndex]}
          alt={`Property in ${property.location}`}
          fill
          className="object-cover w-3/4 lg:w-full h-1/4 lg:h-full"
        />
        {property.images.length > 1 && (
          <>
            <button
              onClick={prev}
              className="absolute left-1.5 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-1 opacity-0 group-hover/img:opacity-100 transition-opacity"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={next}
              className="absolute right-1.5 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-1 opacity-0 group-hover/img:opacity-100 transition-opacity"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </>
        )}
      </div>

      {/* Content */}
      <div className="px-3 pt-2 pb-3 flex flex-col flex-1">
        {/* Icons row */}
        {property.iconImages && (
          <div className="flex items-center gap-2.5 mb-2">
            {property.iconImages.map((icon, i) => (
              <div key={i} className="flex items-center gap-1">
                <div className="w-8 h-8 rounded overflow-hidden border border-gray-200">
                  <Image
                    src={icon}
                    alt=""
                    width={32}
                    height={32}
                    className="object-cover w-full h-full"
                  />
                </div>
                <span className="text-xs font-semibold text-gray-700">
                  {property.iconLabels?.[i] ?? "1"}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Location + size */}
        <div className="flex items-center justify-between mb-1.5">
          <div className="flex items-center gap-1 min-w-0">
            <Image src={location} alt="" className="w-4 h-4 shrink-0" />
            <span className="text-xs lg:text-sm font-semibold text-gray-800 truncate">
              {property.location}
            </span>
          </div>
          <span className="text-xs font-semibold text-gray-700 shrink-0 ml-1">
            {property.size}
          </span>
        </div>

        {/* Date + time */}
        <div className="flex items-center gap-3 mb-1.5 text-gray-500">
          <div className="flex items-center gap-1">
            <span className="text-xs">📅</span>
            <span className="text-xs">{property.date}</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-xs">🕙</span>
            <span className="text-xs">{property.time}</span>
          </div>
        </div>

        {/* Price + type */}
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-bold text-green-600">
            {property.priceRange}
          </span>
          <span className="text-xs text-gray-600 font-medium">
            •{property.propertyType}
          </span>
        </div>

        {/* Agent */}
        <div className="flex items-center justify-between pt-3">
          {/* Agent Information */}
          <div>
            <div className="flex gap-1">
              <Image
                src={property.agentImage}
                alt={property.agentName}
                width={30}
                height={30}
                className="rounded-full shrink-0 border-2 border-red-100 object-cover"
              />
              <p className="font-bold text-red-500 text-base truncate">
                {property.agentName}
              </p>
            </div>
            <div className="flex items-center gap-1 text-xs text-gray-600 mt-1">
              <Image src={mobile} alt="" width={20} height={20} />
              <span>{property.agentPhone}</span>
            </div>
            <div className="flex items-center gap-1 text-xs text-blue-600 mt-1">
              <Image src={mail} alt="" width={20} height={20} />
              <span className="truncate">{property.agentEmail}</span>
            </div>
          </div>

          {/* Company Badge + Actions */}
          <div>
            <Image
              src={property.agentCompany}
              alt="Company logo"
              width={80}
              height={36}
              className="object-contain"
            />

            <div className="text-xs text-red-600 font-medium ">
              <p>{property.agentLocation}</p>
            </div>
            <div className="flex items-center gap-1">
              <button
                className="flex items-center gap-1 px-2 py-1.5 hover:bg-blue-50 rounded-lg transition-colors text-xs text-blue-600 font-medium"
                onClick={(e) => e.stopPropagation()}
              >
                <Image src={share} alt="Share" width={20} height={20} />
              </button>
              <button
                className="flex items-center gap-1 px-2 py-1.5 hover:bg-red-50 rounded-lg transition-colors text-xs text-red-500 font-medium"
                onClick={(e) => e.stopPropagation()}
              >
                <Image src={home} alt="Home" width={20} height={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyListingCard;
