"use client";

import React from "react";
import { useRouter } from "next/navigation";
import type { ListingSortOption, ListingProperty } from "./types";
import ListingMeta from "./ListingMeta";
import PropertyDetailView from "./PropertyDetailView";
import PropertyListingCard from "./PropertyListingCard";
import SearchFilterBar from "./SearchFilterBar";

interface PropertyDetailPageProps {
  property: ListingProperty;
  relatedProperties: ListingProperty[];
  listingMeta: {
    location: string;
    suburb: string;
    totalProperties: number;
  };
}

const PropertyDetailPage: React.FC<PropertyDetailPageProps> = ({
  property,
  relatedProperties,
  listingMeta,
}) => {
  const router = useRouter();

  const navigateToListings = (search = "") => {
    const params = new URLSearchParams();

    if (search.trim()) {
      params.set("search", search.trim());
    }

    const query = params.toString();
    router.push(query ? `/propertyListingpage?${query}` : "/propertyListingpage");
  };

  const handleSortChange = (sort: ListingSortOption) => {
    const params = new URLSearchParams();
    params.set("sort", sort);
    router.push(`/propertyListingpage?${params.toString()}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <SearchFilterBar
        isMapView={false}
        onToggleView={() => {}}
        showViewToggle={false}
        onSearchChange={navigateToListings}
      />

      <div className="max-w-screen-2xl mx-auto px-5 py-5">
        <div className="grid grid-cols-1 lg:grid-cols-[340px_1fr] gap-6 items-start">
          <aside className="order-2 lg:order-1">
            <div className="lg:sticky lg:top-0 space-y-4">
              <div className="">
                <ListingMeta
                  location={listingMeta.location}
                  suburb={listingMeta.suburb}
                  count={listingMeta.totalProperties}
                  sort="Relevant listings"
                  onSortChange={handleSortChange}
                  variant="map"
                />
              </div>

              <div className="space-y-4 pr-1">
                {relatedProperties.map((relatedProperty) => (
                  <PropertyListingCard
                    key={relatedProperty.id}
                    property={relatedProperty}
                    onClick={() => router.push(`/property/${relatedProperty.id}`)}
                  />
                ))}
              </div>
            </div>
          </aside>

          <section className="order-1 lg:order-2 min-w-0">
            <PropertyDetailView
              property={property}
              onBack={() => router.push("/propertyListingpage")}
            />
          </section>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetailPage;
