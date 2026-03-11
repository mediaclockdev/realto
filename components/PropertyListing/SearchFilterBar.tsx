"use client";

import React, { useState } from "react";
import listicon from "../../public/listToggleicon.svg";
import mapicon from "../../public/mapToggleicon.svg";
import Image from "next/image";

const filters = ["Property type", "Price", "Rooms", "More"];

interface SearchFilterBarProps {
  isMapView: boolean;
  onToggleView: () => void;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  showViewToggle?: boolean;
}

const SearchFilterBar: React.FC<SearchFilterBarProps> = ({
  isMapView,
  onToggleView,
  searchValue,
  onSearchChange,
  showViewToggle = true,
}) => {
  const [internalSearch, setInternalSearch] = useState("");
  const search = searchValue ?? internalSearch;

  const handleSearchChange = (value: string) => {
    if (onSearchChange) {
      onSearchChange(value);
      return;
    }

    setInternalSearch(value);
  };

  return (
    <div className="w-full bg-[#0284C7] border-b border-gray-200 px-4 sm:px-6 lg:px-10 py-3">
      <div className="max-w-screen-2xl mx-auto flex items-center gap-3 flex-wrap sm:flex-nowrap">
        {/* Search input */}
        <div className="flex items-center bg-white border border-gray-300 rounded-full px-3 py-2 gap-2 w-full sm:w-56 shrink-0">
          <input
            type="text"
            value={search}
            onChange={(e) => handleSearchChange(e.target.value)}
            placeholder="Lorem ipsum viverra gravida"
            className="flex-1 text-sm outline-none text-gray-700 placeholder-gray-400 min-w-0"
          />
          <button className="bg-gray-700 hover:bg-gray-900 p-1.5 rounded-full transition-colors shrink-0">
            <svg
              className="w-3.5 h-3.5 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"
              />
            </svg>
          </button>
        </div>

        {/* Filter dropdowns */}
        <div className="flex items-center gap-2 flex-wrap">
          {filters.map((f) => (
            <button
              key={f}
              className="flex items-center gap-1 text-sm font-medium text-gray-700 bg-white border border-gray-300 hover:border-gray-400 px-3 py-2 rounded-full transition-colors whitespace-nowrap"
            >
              {f}
              <svg
                className="w-3.5 h-3.5 text-gray-500"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          ))}
        </div>


        <div className="flex-1" />

        
        {showViewToggle ? (
          <div className="flex items-center shrink-0">
            <button
              onClick={onToggleView}
              className="relative flex items-center w-20 h-10 rounded-full bg-white p-1 shadow-inner border border-gray-200 transition-all"
              aria-label="Toggle view"
            >
              <span
                className={`absolute transition-all duration-300 w-8 h-8 rounded-full bg-[#1e1e1e] flex items-center justify-center shadow-md ${
                  isMapView ? "left-[calc(100%-2.25rem)]" : "left-1"
                }`}
              >
                {isMapView ? (
                  <Image src={mapicon} alt="Map" width={20} height={20} />
                ) : (
                  <Image src={listicon} alt="List" width={20} height={20} />
                )}
              </span>
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default SearchFilterBar;
