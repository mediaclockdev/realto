import type {
  PropertyListingsQuery,
  PropertyListingsResult,
} from "@/lib/listings/types";
import {
  buildPropertyListingsResult,
  DEFAULT_LISTING_LOCATION,
  DEFAULT_LISTING_SUBURB,
} from "@/lib/listings/assembly";
import { TOTAL_PROPERTIES, propertyCatalog } from "@/lib/properties/mock-data";

export function getBuyListings(
  query: PropertyListingsQuery = {},
): PropertyListingsResult {
  return buildPropertyListingsResult({
    properties: propertyCatalog,
    query,
    listingVariant: "buy",
  });
}

export function getBuyListingMeta() {
  return {
    listingVariant: "buy" as const,
    location: DEFAULT_LISTING_LOCATION,
    suburb: DEFAULT_LISTING_SUBURB,
    totalProperties: TOTAL_PROPERTIES,
  };
}
