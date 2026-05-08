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
  rentPropertyCatalog,
  TOTAL_RENT_PROPERTIES,
} from "@/lib/properties/rent/mock-data";

export function getRentListings(
  query: PropertyListingsQuery = {},
): PropertyListingsResult {
  return buildPropertyListingsResult({
    properties: rentPropertyCatalog,
    query,
    listingVariant: "rent",
  });
}

export function getRentListingMeta() {
  return {
    listingVariant: "rent" as const,
    location: DEFAULT_LISTING_LOCATION,
    suburb: DEFAULT_LISTING_SUBURB,
    totalProperties: TOTAL_RENT_PROPERTIES,
  };
}
