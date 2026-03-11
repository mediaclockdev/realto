"use client";

import React from "react";
import PropertyListingCard from "./PropertyListingCard";
import type { ListingProperty, PropertyMapMarker } from "./types";

interface PropertyListingMapPaneProps {
  properties: ListingProperty[];
  markers: PropertyMapMarker[];
  selectedPropertyId: string | null;
  onSelectProperty: (id: string) => void;
  onOpenProperty: (id: string) => void;
  isFullScreen?: boolean;
}

const PropertyListingMapPane: React.FC<PropertyListingMapPaneProps> = ({
  properties,
  markers,
  selectedPropertyId,
  onSelectProperty,
  onOpenProperty,
  isFullScreen = false,
}) => {
  const activeProperty =
    properties.find((property) => property.id === selectedPropertyId) ??
    properties[0] ??
    null;

  return (
    <div
      className={`relative w-full transition-all duration-300 bg-[#dedede] ${
        isFullScreen
          ? "h-[calc(100vh-180px)] rounded-2xl overflow-hidden shadow-md border border-gray-300"
          : "h-[500px] lg:h-[calc(100vh-140px)]"
      }`}
    >
      <div className="absolute inset-0">
        <iframe
          title="Properties map"
          width="100%"
          height="100%"
          loading="lazy"
          src="https://www.openstreetmap.org/export/embed.html?bbox=151.0%2C-34.0%2C151.2%2C-33.8&layer=mapnik&marker=-33.9%2C151.1"
          className="border-0 w-full h-full"
        />

        <div className="absolute inset-0 pointer-events-none">
          {properties.slice(0, markers.length).map((property, index) => {
            const marker = markers[index];
            const isSelected = property.id === activeProperty?.id;

            return (
              <div
                key={property.id}
                className="absolute pointer-events-auto"
                style={{ top: marker.top, left: marker.left }}
              >
                {isSelected && (
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 w-[330px] origin-bottom scale-[0.60] sm:scale-[0.70] z-30 transition-all pointer-events-auto filter drop-shadow-2xl">
                    <div className="bg-white rounded-xl relative overflow-hidden">
                      <PropertyListingCard
                        property={property}
                        onClick={() => onOpenProperty(property.id)}
                      />
                    </div>
                    <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-[14px] border-l-transparent border-r-[14px] border-r-transparent border-t-[14px] border-t-white -mt-[1px]" />
                  </div>
                )}

                <button
                  onClick={() => onSelectProperty(property.id)}
                  className={`absolute rounded-full shadow-md transition-all ${
                    isSelected
                      ? "bg-[#EF4444] border-[3px] border-white w-[22px] h-[22px] z-10 -ml-[11px] -mt-[11px]"
                      : "bg-[#EF4444] border-[2px] border-white w-4 h-4 hover:scale-125 -ml-2 -mt-2"
                  }`}
                  aria-label={`View property ${property.id}`}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PropertyListingMapPane;
