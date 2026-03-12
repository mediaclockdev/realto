"use client";

import React from "react";
import ListingMeta from "./ListingMeta";
import PropertyListingCard from "./PropertyListingCard";
import type { ListingProperty, ListingSortOption } from "./types";

interface PropertyListingResultsPaneProps {
  properties: ListingProperty[];
  count: number;
  location: string;
  suburb: string;
  sort: ListingSortOption;
  onSortChange: (sort: ListingSortOption) => void;
  selectedPropertyId?: string | null;
  onPropertySelect: (id: string) => void;
  className?: string;
  headerClassName?: string;
  listClassName?: string;
  showCollapseButton?: boolean;
  onToggleCollapse?: () => void;
}

const PropertyListingResultsPane: React.FC<PropertyListingResultsPaneProps> = ({
  properties,
  count,
  location,
  suburb,
  sort,
  onSortChange,
  selectedPropertyId,
  onPropertySelect,
  className,
  headerClassName,
  listClassName,
  showCollapseButton = false,
  onToggleCollapse,
}) => {
  return (
    <div className={className}>
      <div className={headerClassName}>
        <ListingMeta
          location={location}
          suburb={suburb}
          count={count}
          sort={sort}
          onSortChange={onSortChange}
          variant="map"
        />
      </div>

      <div className={listClassName}>
        {properties.map((property) => (
          <div
            key={property.id}
            className={
              selectedPropertyId === property.id
                ? "ring-2 ring-red-500 rounded-xl m-1"
                : "m-1"
            }
          >
            <PropertyListingCard
              property={property}
              onClick={() => onPropertySelect(property.id)}
            />
          </div>
        ))}
      </div>

      {showCollapseButton && onToggleCollapse ? (
        <button
          onClick={onToggleCollapse}
          className="absolute z-30 top-16 right-0 translate-x-full bg-white shadow-sm border border-gray-200 border-l-0 w-9 h-14 flex items-center justify-center rounded-r-xl hover:bg-gray-50 transition-colors"
          aria-label="Hide list"
        >
          <svg
            className="w-5 h-5 text-gray-800"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
      ) : null}
    </div>
  );
};

export default PropertyListingResultsPane;
