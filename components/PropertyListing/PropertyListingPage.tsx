/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useMemo, useState } from "react";
import SearchFilterBar from "./SearchFilterBar";
import ListingMeta from "./ListingMeta";
import AgentCard from "./AgentCard";
import MapWidget from "./MapWidget";
import PropertyListingCard from "./PropertyListingCard";
import Pagination from "./Pagination";
import type { PropertyListingPageData } from "./types";
import eddy from "../../public/eddyjones.svg";

interface PropertyListingPageProps {
  data: PropertyListingPageData;
}

/* ───────────────────────────────────────────────
Reusable Map Section
Used for:
- Desktop map view
- Mobile stacked map
─────────────────────────────────────────────── */
const MapSection = ({ mapPreviewProperty }: { mapPreviewProperty: any }) => (
  <div className="relative w-full h-[420px] border border-gray-300 overflow-hidden rounded-lg bg-[#dedede]">
    <iframe
      title="Properties map"
      width="100%"
      height="100%"
      loading="lazy"
      src="https://www.openstreetmap.org/export/embed.html?bbox=151.0%2C-34.0%2C151.2%2C-33.8&layer=mapnik&marker=-33.9%2C151.1"
      className="border-0 w-full h-full"
    />

    {mapPreviewProperty && (
      <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[200px] lg:w-[300px] bg-white rounded-md shadow-xl border border-gray-200">
        <PropertyListingCard property={mapPreviewProperty} />
      </div>
    )}

    {/* Fake map markers */}
    <div className="absolute inset-0 pointer-events-none">
      <span className="absolute top-[52%] left-[58%] w-8 h-8 bg-red-500 rounded-full border-4 border-white shadow" />
      <span className="absolute top-[60%] left-[66%] w-7 h-7 bg-red-500 rounded-full border-4 border-white shadow" />
      <span className="absolute top-[68%] left-[62%] w-7 h-7 bg-red-500 rounded-full border-4 border-white shadow" />
      <span className="absolute top-[64%] left-[71%] w-7 h-7 bg-red-500 rounded-full border-4 border-white shadow" />
      <span className="absolute top-[56%] left-[73%] w-7 h-7 bg-red-500 rounded-full border-4 border-white shadow" />
    </div>
  </div>
);

const PropertyListingPage: React.FC<PropertyListingPageProps> = ({ data }) => {
  const [isMapView, setIsMapView] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(data.totalProperties / data.propertiesPerPage);

  const visibleProperties = useMemo(() => {
    const start = (currentPage - 1) * data.propertiesPerPage;
    const end = start + data.propertiesPerPage;
    return data.properties.slice(start, end);
  }, [currentPage, data.properties, data.propertiesPerPage]);

  const mapPreviewProperty = visibleProperties[0];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* ── Search / Filter bar ── */}
      <SearchFilterBar
        isMapView={isMapView}
        onToggleView={() => setIsMapView((v) => !v)}
      />

      {/* ── Main container ── */}
      <div className="flex-1 max-w-screen-2xl mx-auto w-full px-4 sm:px-6 lg:px-10">
        {/* DESKTOP MAP VIEW */}
        {isMapView && (
          <div className="hidden lg:flex items-start gap-0">
            {/* Left listing sidebar */}
            <aside className="w-full max-w-[360px] shrink-0 bg-[#efefef]">
              <div className="bg-[#efefef] border-r border-gray-300">
                <ListingMeta
                  location={data.location}
                  suburb={data.suburb}
                  count={data.totalProperties}
                />
              </div>

              <div className="space-y-3 px-2 pb-4">
                {visibleProperties.map((p) => (
                  <PropertyListingCard key={p.id} property={p} />
                ))}
              </div>
            </aside>

            {/* Map */}
            <section className="flex-1 min-w-0">
              <MapSection mapPreviewProperty={mapPreviewProperty} />

              <div className="bg-white px-4 py-3 border-x border-b border-gray-300">
                <p className="text-2xl font-semibold text-gray-900">
                  {data.suburb}
                </p>
              </div>
            </section>
          </div>
        )}

        {/* ============================================================
LIST / GRID VIEW (Default + Mobile Map)
        ============================================================ */}
        {!isMapView || <div className="lg:hidden" />}

        {!isMapView && (
          <>
            <ListingMeta
              location={data.location}
              suburb={data.suburb}
              count={data.totalProperties}
            />

            <div className="flex gap-6">
              {/* Properties grid */}
              <div className="flex-1 min-w-0">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {visibleProperties.map((p) => (
                    <PropertyListingCard key={p.id} property={p} />
                  ))}
                </div>

                {/* Pagination */}
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />

                {/* 📱 MOBILE MAP (stacked at bottom) */}
                {isMapView && (
                  <div className="block lg:hidden mt-6">
                    <h3 className="text-lg font-semibold mb-2">
                      View properties on map
                    </h3>
                    <MapSection mapPreviewProperty={mapPreviewProperty} />
                  </div>
                )}
              </div>

              {/* Right sidebar */}
              <aside className="hidden lg:block w-64 xl:w-72 shrink-0">
                <div className="sticky top-6 space-y-4">
                  <AgentCard
                    name="Eddie Jones"
                    company="Parker Realestate"
                    experience={9}
                    sales={18}
                    agentImage={eddy}
                  />
                  <MapWidget suburb={data.suburb} />
                </div>
              </aside>
            </div>
          </>
        )}

        {/* ============================================================
MOBILE MAP VIEW WHEN TOGGLE IS ON
        ============================================================ */}
        {isMapView && (
          <div className="lg:hidden ">
            <ListingMeta
              location={data.location}
              suburb={data.suburb}
              count={data.totalProperties}
            />

            {/* Property list */}
            <div className="space-y-3">
              {visibleProperties.map((p) => (
                <PropertyListingCard key={p.id} property={p} />
              ))}
            </div>

            {/* Pagination */}
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />

            {/* Map at bottom */}
            <div className="my-4">
              <MapSection mapPreviewProperty={mapPreviewProperty} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PropertyListingPage;
