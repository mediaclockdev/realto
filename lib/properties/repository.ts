import type { ListingVariant } from "@/lib/listings/types";
import type { ListingProperty } from "@/lib/properties/types";
import { mapPropertyForListingVariant } from "@/lib/properties/variant-mappers";
import { propertyCatalog } from "./mock-data";

export function getPropertyById(
  id: string,
  listingVariant: ListingVariant = "buy",
): ListingProperty | null {
  const property = propertyCatalog.find((item) => item.id === id) ?? null;

  if (!property) {
    return null;
  }

  return mapPropertyForListingVariant(property, listingVariant);
}

export function getRelatedProperties(
  id: string,
  limit = 4,
  listingVariant: ListingVariant = "buy",
): ListingProperty[] {
  const property = getPropertyById(id, listingVariant);

  if (!property) {
    return [];
  }

  return getAllProperties(listingVariant)
    .filter((item) => item.id !== id)
    .filter(
      (item) =>
        item.location === property.location ||
        item.propertyType === property.propertyType,
    )
    .slice(0, limit);
}

export function getAllProperties(
  listingVariant: ListingVariant = "buy",
): ListingProperty[] {
  return propertyCatalog.map((property) =>
    mapPropertyForListingVariant(property, listingVariant),
  );
}
