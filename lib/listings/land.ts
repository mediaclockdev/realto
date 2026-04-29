import {
  buildPropertyListingsResult,
  DEFAULT_LISTING_LOCATION,
  DEFAULT_LISTING_SUBURB,
} from "@/lib/listings/assembly";
import type {
  PropertyListingsQuery,
  PropertyListingsResult,
} from "@/lib/listings/types";
import { propertyCatalog } from "@/lib/properties/mock-data";
import { mapPropertyForListingVariant } from "@/lib/properties/variant-mappers";

const LAND_TOTAL_PROPERTIES = 445;

export function getLandListings(
  query: PropertyListingsQuery = {},
): PropertyListingsResult {
  return buildPropertyListingsResult({
    properties: propertyCatalog
      .map((property) => mapPropertyForListingVariant(property, "land"))
      .slice(0, LAND_TOTAL_PROPERTIES),
    query,
    listingVariant: "land",
  });
}

export function getLandListingMeta() {
  return {
    listingVariant: "land" as const,
    location: DEFAULT_LISTING_LOCATION,
    suburb: DEFAULT_LISTING_SUBURB,
    totalProperties: LAND_TOTAL_PROPERTIES,
  };
}
