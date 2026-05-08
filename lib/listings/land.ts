import {
  buildPropertyListingsResult,
  DEFAULT_LISTING_LOCATION,
  DEFAULT_LISTING_SUBURB,
} from "@/lib/listings/assembly";
import type {
  PropertyListingsQuery,
  PropertyListingsResult,
} from "@/lib/listings/types";
import {
  landPropertyCatalog,
  TOTAL_LAND_PROPERTIES,
} from "@/lib/properties/land/mock-data";

export function getLandListings(
  query: PropertyListingsQuery = {},
): PropertyListingsResult {
  return buildPropertyListingsResult({
    properties: landPropertyCatalog,
    query,
    listingVariant: "land",
  });
}

export function getLandListingMeta() {
  return {
    listingVariant: "land" as const,
    location: DEFAULT_LISTING_LOCATION,
    suburb: DEFAULT_LISTING_SUBURB,
    totalProperties: TOTAL_LAND_PROPERTIES,
  };
}
