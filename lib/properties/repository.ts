import type { ListingProperty } from "@/lib/properties/types";
import { propertyCatalog } from "./mock-data";

export function getPropertyById(id: string): ListingProperty | null {
  return propertyCatalog.find((property) => property.id === id) ?? null;
}

export function getRelatedProperties(
  id: string,
  limit = 4,
): ListingProperty[] {
  const property = getPropertyById(id);

  if (!property) {
    return [];
  }

  return propertyCatalog
    .filter((item) => item.id !== id)
    .filter(
      (item) =>
        item.location === property.location ||
        item.propertyType === property.propertyType,
    )
    .slice(0, limit);
}

export function getAllProperties(): ListingProperty[] {
  return propertyCatalog;
}
