"use client";

import React, { useState } from "react";
import type { ListingSortOption } from "./types";

interface ListingMetaProps {
  location: string;
  suburb: string;
  count: number;
  sort?: ListingSortOption;
  onSortChange?: (sort: ListingSortOption) => void;
  variant?: "default" | "map";
}

const sortOptions: ListingSortOption[] = [
  "Relevant listings",
  "Newest first",
  "Price (low to high)",
  "Price (high to low)",
];

const ListingMeta: React.FC<ListingMetaProps> = ({
  location,
  suburb,
  count,
  sort,
  onSortChange,
  variant = "default",
}) => {
  const [internalSort, setInternalSort] = useState<ListingSortOption>("Relevant listings");
  const [open, setOpen] = useState(false);
  const activeSort = sort ?? internalSort;

  const handleSortChange = (nextSort: ListingSortOption) => {
    if (onSortChange) {
      onSortChange(nextSort);
    } else {
      setInternalSort(nextSort);
    }
    setOpen(false);
  };

  const isMapVariant = variant === "map";

  return (
    <div className={`max-w-screen-2xl mx-auto ${isMapVariant ? "px-6 sm:px-8 py-8 sm:py-10" : "px-4 sm:px-6 lg:px-10 py-4"}`}>
      
      {/* Left border accent + content */}
      <div className="">
        
        {/* Label */}
        <p className="uppercase text-xs text-[#909090]  font-medium mb-1">
          {isMapVariant ? "Properties for sale in" : `Properties for sale in ${location}`}
        </p>

        {/* Suburb */}
        <p className="text-black text-xl sm:text-2xl font-semibold mb-3">
          {suburb}
        </p>

        {/* Count + Sort row */}
        <div className="flex items-center gap-2 text-sm text-gray-600 flex-nowrap whitespace-nowrap">
          <span className="font-medium text-gray-800">{count} Properties</span>
          <span className="text-gray-400">|</span>
          <span>Sort by</span>

          <div className="relative">
            <button
              onClick={() => setOpen(!open)}
              className="flex items-center gap-1 font-bold text-gray-900 hover:text-blue-600 transition-colors"
            >
              {activeSort}
              <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>

            {open && (
              <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-20 min-w-48">
                {sortOptions.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => handleSortChange(opt)}
                    className={`block w-full text-left px-4 py-2.5 text-sm hover:bg-gray-50 transition-colors ${
                      activeSort === opt ? "text-blue-600 font-semibold" : "text-gray-700"
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default ListingMeta;
