import {
  buildPropertyListingsResult,
  DEFAULT_LISTING_LOCATION,
  DEFAULT_LISTING_SUBURB,
} from "@/lib/listings/assembly";
import type {
  PropertyListingsQuery,
  PropertyListingsResult,
} from "@/lib/listings/types";
import { propertyCatalog, TOTAL_PROPERTIES } from "@/lib/properties/mock-data";
import { mapPropertyForListingVariant } from "@/lib/properties/variant-mappers";

export function getRentListings(
  query: PropertyListingsQuery = {},
): PropertyListingsResult {
  return buildPropertyListingsResult({
    properties: propertyCatalog.map((property) =>
      mapPropertyForListingVariant(property, "rent"),
    ),
    query,
    listingVariant: "rent",
  });
}

export function getRentListingMeta() {
  return {
    listingVariant: "rent" as const,
    location: DEFAULT_LISTING_LOCATION,
    suburb: DEFAULT_LISTING_SUBURB,
    totalProperties: TOTAL_PROPERTIES,
  };
}
