"use client";

import React from "react";
import { useRouter } from "next/navigation";
import type { CommercialListing } from "@/lib/commercial/types";
import SearchFilterBar from "@/components/PropertyListing/SearchFilterBar";
import ListingMeta from "@/components/PropertyListing/ListingMeta";
import CommercialDetailView from "./CommercialDetailView";
import { CommercialPropertyCard } from "./Explorenewproperties";

interface CommercialDetailPageProps {
  listing: CommercialListing;
  relatedListings: CommercialListing[];
}

const CommercialDetailPage: React.FC<CommercialDetailPageProps> = ({
  listing,
  relatedListings,
}) => {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-50">
      <SearchFilterBar
        isMapView={false}
        onToggleView={() => {}}
        showViewToggle={false}
      />

      <div className="max-w-screen-2xl mx-auto px-3 lg:px-5 py-5">
        <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-6 items-start">
          <aside className="order-2 lg:order-1">
            <div className="lg:sticky lg:top-0 space-y-4">
              <div className="">
                <ListingMeta
                  location={listing.location}
                  suburb={listing.location}
                  count={relatedListings.length}
                  listingLabel="Commercial properties in"
                  variant="map"
                />
              </div>

              <div className="space-y-4 pr-1">
                {relatedListings.map((relatedListing, index) => (
                  <CommercialPropertyCard
                    key={relatedListing.id}
                    property={relatedListing}
                    index={index}
                  />
                ))}
              </div>
            </div>
          </aside>

          <section className="order-1 lg:order-2 min-w-0">
            <CommercialDetailView
              listing={listing}
              onBack={() => router.push("/commercial")}
            />
          </section>
        </div>
      </div>
    </div>
  );
};

export default CommercialDetailPage;
