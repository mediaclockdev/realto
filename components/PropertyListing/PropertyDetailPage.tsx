"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { getListingVariantConfig } from "./config";
import type { ListingSortOption, ListingProperty } from "./types";
import ListingMeta from "./ListingMeta";
import PropertyDetailView from "./PropertyDetailView";
import PropertyListingCard from "./PropertyListingCard";
import SearchFilterBar from "./SearchFilterBar";

interface PropertyDetailPageProps {
  property: ListingProperty;
  relatedProperties: ListingProperty[];
  listingMeta: {
    listingVariant: "buy" | "rent";
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
  const variantConfig = getListingVariantConfig(listingMeta.listingVariant);

  const navigateToListings = (search = "") => {
    const params = new URLSearchParams();

    if (search.trim()) {
      params.set("search", search.trim());
    }

    const query = params.toString();
    router.push(
      query
        ? `/${listingMeta.listingVariant === "rent" ? "rent" : "propertyListingpage"}?${query}`
        : `/${listingMeta.listingVariant === "rent" ? "rent" : "propertyListingpage"}`,
    );
  };

  const handleSortChange = (sort: ListingSortOption) => {
    const params = new URLSearchParams();
    params.set("sort", sort);
    router.push(
      `/${listingMeta.listingVariant === "rent" ? "rent" : "propertyListingpage"}?${params.toString()}`,
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <SearchFilterBar
        isMapView={false}
        onToggleView={() => {}}
        showViewToggle={false}
        onSearchChange={navigateToListings}
        listingVariant={listingMeta.listingVariant}
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
                  listingLabel={variantConfig.listingLabel}
                />
              </div>

              <div className="space-y-4 pr-1">
                {relatedProperties.map((relatedProperty) => (
                  <PropertyListingCard
                    key={relatedProperty.id}
                    property={relatedProperty}
                    listingVariant={listingMeta.listingVariant}
                    onClick={() =>
                      router.push(
                        `/property/${relatedProperty.id}?listingVariant=${listingMeta.listingVariant}`,
                      )
                    }
                  />
                ))}
              </div>
            </div>
          </aside>

          <section className="order-1 lg:order-2 min-w-0">
            <PropertyDetailView
              property={property}
              onBack={() =>
                router.push(
                  listingMeta.listingVariant === "rent"
                    ? "/rent"
                    : "/propertyListingpage",
                )
              }
            />
          </section>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetailPage;
