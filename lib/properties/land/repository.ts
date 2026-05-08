import { landPropertyCatalog } from "@/lib/properties/land/mock-data";
import type { ListingProperty } from "@/lib/properties/types";

export function getAllLandProperties(): ListingProperty[] {
  return landPropertyCatalog;
}

export function getLandPropertyById(id: string): ListingProperty | null {
  return landPropertyCatalog.find((property) => property.id === id) ?? null;
}
