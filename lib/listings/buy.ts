import type {
  PropertyListingsQuery,
  PropertyListingsResult,
} from "@/lib/listings/types";
import {
  buildPropertyListingsResult,
  DEFAULT_LISTING_LOCATION,
  DEFAULT_LISTING_SUBURB,
} from "@/lib/listings/assembly";
import {
  buyPropertyCatalog,
  TOTAL_BUY_PROPERTIES,
} from "@/lib/properties/buy/mock-data";

export function getBuyListings(
  query: PropertyListingsQuery = {},
): PropertyListingsResult {
  return buildPropertyListingsResult({
    properties: buyPropertyCatalog,
    query,
    listingVariant: "buy",
  });
}

export function getBuyListingMeta() {
  return {
    listingVariant: "buy" as const,
    location: DEFAULT_LISTING_LOCATION,
    suburb: DEFAULT_LISTING_SUBURB,
    totalProperties: TOTAL_BUY_PROPERTIES,
  };
}
