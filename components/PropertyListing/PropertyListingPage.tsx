"use client";

import React, { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import AgentCard from "./AgentCard";
import ListingMeta from "./ListingMeta";
import MapWidget from "./MapWidget";
import Pagination from "./Pagination";
import PropertyListingCard from "./PropertyListingCard";
import PropertyListingMapPane from "./PropertyListingMapPane";
import PropertyListingResultsPane from "./PropertyListingResultsPane";
import SearchFilterBar from "./SearchFilterBar";
import type {
  ListingSortOption,
  PropertyListingPageData,
  PropertyListingQueryState,
} from "./types";
import eddy from "../../public/eddyjones.svg";

interface PropertyListingPageProps {
  data: PropertyListingPageData;
  query: PropertyListingQueryState;
}

const markerPositions = [
  { top: "62%", left: "58%" },
  { top: "70%", left: "66%" },
  { top: "78%", left: "62%" },
  { top: "64%", left: "71%" },
  { top: "66%", left: "73%" },
  { top: "58%", left: "60%" },
  { top: "52%", left: "55%" },
  { top: "75%", left: "65%" },
  { top: "60%", left: "45%" },
];

const PropertyListingPage: React.FC<PropertyListingPageProps> = ({
  data,
  query,
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const [isListCollapsed, setIsListCollapsed] = useState(false);
  const [selectedMapPropId, setSelectedMapPropId] = useState<string | null>(
    null,
  );

  const totalPages = Math.max(
    1,
    Math.ceil(data.totalProperties / data.propertiesPerPage),
  );
  const activeMapPropertyId =
    selectedMapPropId &&
    data.properties.some((property) => property.id === selectedMapPropId)
      ? selectedMapPropId
      : data.properties[0]?.id ?? null;
  const isMapView = query.view === "map";

  const navigateWithQuery = (partial: Partial<PropertyListingQueryState>) => {
    const nextQuery = {
      ...query,
      ...partial,
    };
    const params = new URLSearchParams();

    if (nextQuery.page > 1) {
      params.set("page", String(nextQuery.page));
    }

    if (nextQuery.search.trim()) {
      params.set("search", nextQuery.search.trim());
    }

    if (nextQuery.sort !== "Relevant listings") {
      params.set("sort", nextQuery.sort);
    }

    if (nextQuery.view === "map") {
      params.set("view", "map");
    }

    const search = params.toString();
    router.push(search ? `${pathname}?${search}` : pathname);
  };

  const handleSortChange = (sort: ListingSortOption) => {
    navigateWithQuery({ sort, page: 1 });
  };

  const handleSearchChange = (search: string) => {
    navigateWithQuery({ search, page: 1 });
  };

  const handleToggleView = () => {
    setSelectedMapPropId(null);
    navigateWithQuery({
      view: isMapView ? "grid" : "map",
      page: 1,
    });
  };

  const openPropertyDetail = (propertyId: string) => {
    router.push(`/property/${propertyId}`);
  };

  const desktopContainerClassName =
    isMapView && !isListCollapsed
      ? "flex-1 mx-auto w-full max-w-none px-0 transition-all"
      : "flex-1 mx-auto w-full max-w-screen-2xl px-5 py-5 transition-all";

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <SearchFilterBar
        isMapView={isMapView}
        onToggleView={handleToggleView}
        searchValue={query.search}
        onSearchChange={handleSearchChange}
      />

      <div className={desktopContainerClassName}>
        {isMapView ? (
          <div className="hidden lg:flex items-start gap-0 relative">
            <PropertyListingResultsPane
              properties={data.properties}
              count={data.totalProperties}
              location={data.location}
              suburb={data.suburb}
              sort={query.sort}
              onSortChange={handleSortChange}
              onPropertySelect={openPropertyDetail}
              className={`relative transition-all duration-300 flex-shrink-0 bg-white border-r border-[#0284C7] z-20 ${
                isListCollapsed
                  ? "w-0 overflow-hidden border-r-0"
                  : "w-full max-w-[390px]"
              }`}
              headerClassName="bg-white pb-2 pt-4 px-4 sticky top-0 z-10"
              listClassName="space-y-4 px-4 pb-8 min-h-[calc(100vh-200px)] h-[calc(100vh-140px)] overflow-y-auto"
              showCollapseButton={!isListCollapsed}
              onToggleCollapse={() => setIsListCollapsed(true)}
            />

            <section className="flex-1 min-w-0 sticky top-0 h-[calc(100vh-140px)] flex flex-col">
              {isListCollapsed ? (
                <button
                  onClick={() => setIsListCollapsed(false)}
                  className="absolute z-30 top-16 left-0 bg-white shadow-sm border border-gray-200 border-l-0 w-9 h-14 flex items-center justify-center rounded-r-xl hover:bg-gray-50 transition-colors"
                  aria-label="Show list"
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
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              ) : null}

              <PropertyListingMapPane
                properties={data.properties}
                markers={markerPositions}
                selectedPropertyId={activeMapPropertyId}
                onSelectProperty={setSelectedMapPropId}
                onOpenProperty={openPropertyDetail}
                isFullScreen={isListCollapsed}
              />
            </section>
          </div>
        ) : (
          <>
            <ListingMeta
              location={data.location}
              suburb={data.suburb}
              count={data.totalProperties}
              sort={query.sort}
              onSortChange={handleSortChange}
            />

            <div className="flex gap-6">
              <div className="flex-1 min-w-0">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {data.properties.map((property) => (
                    <PropertyListingCard
                      key={property.id}
                      property={property}
                      onClick={() => openPropertyDetail(property.id)}
                    />
                  ))}
                </div>

                <Pagination
                  currentPage={data.currentPage}
                  totalPages={totalPages}
                  onPageChange={(page) => navigateWithQuery({ page })}
                />
              </div>

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

        {isMapView ? (
          <div className="lg:hidden flex flex-col mt-0 w-screen">
            <PropertyListingMapPane
              properties={data.properties}
              markers={markerPositions}
              selectedPropertyId={activeMapPropertyId}
              onSelectProperty={setSelectedMapPropId}
              onOpenProperty={openPropertyDetail}
              isFullScreen
            />

            <div className="px-4 sm:px-6 pt-6 bg-white w-screen">
              <PropertyListingResultsPane
                properties={data.properties}
                count={data.totalProperties}
                location={data.location}
                suburb={data.suburb}
                sort={query.sort}
                onSortChange={handleSortChange}
                onPropertySelect={openPropertyDetail}
                headerClassName=""
                listClassName="space-y-4"
              />

              <Pagination
                currentPage={data.currentPage}
                totalPages={totalPages}
                onPageChange={(page) => navigateWithQuery({ page })}
              />
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default PropertyListingPage;
