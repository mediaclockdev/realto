import type { ListingProperty } from "@/lib/properties/types";
import { mapPropertyForListingVariant } from "@/lib/properties/variant-mappers";
import { trendingRentPropertyCards } from "@/lib/property-cards/rent";

export const latestLandPropertyCards: ListingProperty[] =
  trendingRentPropertyCards
    .map((property) => ({
      ...property,
      priceRange: "$6,50,000",
      propertyType: "Residential Land",
    }))
    .map((property) => mapPropertyForListingVariant(property, "land"));
