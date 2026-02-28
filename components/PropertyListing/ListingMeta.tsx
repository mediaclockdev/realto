"use client";

import React, { useState } from "react";

interface ListingMetaProps {
  location: string;
  suburb: string;
  count: number;
}

const sortOptions = [
  "Relevant listings",
  "Newest first",
  "Price (low to high)",
  "Price (high to low)",
];

const ListingMeta: React.FC<ListingMetaProps> = ({ location, suburb, count }) => {
  const [sort, setSort] = useState("Relevant listings");
  const [open, setOpen] = useState(false);

  return (
    <div className="px-4 sm:px-6 lg:px-10 py-4 max-w-screen-2xl mx-auto">
      <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">
        Properties for sale in
      </p>
      <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">
        {suburb}
      </h1>

      <div className="flex items-center gap-3 text-sm text-gray-600 flex-wrap">
        <span className="font-medium">{count} Properties</span>
        <span>Sort by</span>
        <div className="relative">
          <button
            onClick={() => setOpen(!open)}
            className="flex items-center gap-1 font-semibold text-gray-800 underline underline-offset-2 hover:text-blue-600 transition-colors"
          >
            {sort}
            <svg className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
          {open && (
            <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-20 min-w-48">
              {sortOptions.map((opt) => (
                <button
                  key={opt}
                  onClick={() => { setSort(opt); setOpen(false); }}
                  className={`block w-full text-left px-4 py-2.5 text-sm hover:bg-gray-50 transition-colors ${
                    sort === opt ? "text-blue-600 font-semibold" : "text-gray-700"
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
  );
};

export default ListingMeta;
