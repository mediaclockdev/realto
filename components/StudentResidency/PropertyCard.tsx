"use client";

import { useState } from "react";
import Image from "next/image";
import { PropertyCardProps } from "../../types/types";

export default function PropertyCard({ property }: PropertyCardProps) {
  const [liked, setLiked] = useState<boolean>(false);

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-200 cursor-pointer">
      {/* Image */}
      <div className="relative w-full h-44">
        <Image
          src={property.img}
          alt={property.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 25vw"
        />
        <button
          onClick={() => setLiked((prev) => !prev)}
          className="absolute top-2.5 right-2.5 bg-white rounded-full w-8 h-8 flex items-center justify-center shadow-md hover:scale-110 transition-transform duration-150"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill={liked ? "#ef4444" : "none"}
            stroke={liked ? "#ef4444" : "#9ca3af"}
            strokeWidth="2"
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </button>
      </div>

      {/* Info */}
      <div className="p-3.5">
        <p className="font-bold text-sm text-gray-900 mb-0.5">
          {property.name}
        </p>
        <p className="text-xs text-gray-500 mb-3">{property.location}</p>

        <div className="flex justify-between items-end">
          {/* Price */}
          <div>
            <span className="text-[11px] text-gray-500 block">From</span>
            <div className="flex items-baseline gap-0.5">
              <span className="font-extrabold text-lg text-gray-900">
                ${property.price}
              </span>
              <span className="text-xs text-gray-500">/ Week</span>
            </div>
          </div>

          {/* Rating */}
          <div className="text-right">
            <div className="flex items-center justify-end gap-1">
              <span className="font-bold text-sm text-green-500">
                {property.rating}
              </span>
              <svg width="13" height="13" viewBox="0 0 20 20" fill="#22c55e">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </div>
            <span className="text-[11px] text-gray-500">
              ({property.reviews.toLocaleString()} reviews)
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
