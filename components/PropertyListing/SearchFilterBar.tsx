"use client";

import React, { useState } from "react";

const filters = ["Property type", "Price", "Rooms", "More"];

interface SearchFilterBarProps {
  isMapView: boolean;
  onToggleView: () => void;
}

const SearchFilterBar: React.FC<SearchFilterBarProps> = ({
  isMapView,
  onToggleView,
}) => {
  const [search, setSearch] = useState("");

  return (
    <div className="w-full bg-[#BCD3DB] border-b border-gray-200 px-4 sm:px-6 lg:px-10 py-3">
      <div className="max-w-screen-2xl mx-auto flex items-center gap-3 flex-wrap sm:flex-nowrap">
        {/* Search input */}
        <div className="flex items-center bg-white border border-gray-300 rounded-full px-3 py-2 gap-2 w-full sm:w-56 shrink-0">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
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

        {/* Spacer */}
        <div className="flex-1" />

        {/* View toggle */}
        <div className="flex items-center shrink-0">
          <button
            onClick={onToggleView}
            className="relative flex items-center w-36 h-14 rounded-full bg-gray-200 p-1 shadow-inner transition-all"
            aria-label="Toggle view"
          >
            {/* Sliding Background */}
            <span
              className={`absolute top-1 bottom-1 w-1/2 rounded-full bg-gray-900 shadow-md transition-all duration-300 ${
                isMapView ? "left-1/2" : "left-1"
              }`}
            />

            {/* List Icon */}
            <span
              className={`relative z-10 flex items-center justify-center w-1/2 transition-colors duration-300 ${
                !isMapView ? "text-white" : "text-gray-500"
              }`}
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <circle cx="5" cy="6" r="2" />
                <circle cx="5" cy="12" r="2" />
                <circle cx="5" cy="18" r="2" />
                <rect x="10" y="5" width="10" height="2" rx="1" />
                <rect x="10" y="11" width="10" height="2" rx="1" />
                <rect x="10" y="17" width="10" height="2" rx="1" />
              </svg>
            </span>

            {/* Map Icon */}
            <span
              className={`relative z-10 flex items-center justify-center w-1/2 transition-colors duration-300 ${
                isMapView ? "text-white" : "text-gray-500"
              }`}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6-3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                />
              </svg>
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchFilterBar;
