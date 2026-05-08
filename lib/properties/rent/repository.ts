import { rentPropertyCatalog } from "@/lib/properties/rent/mock-data";
import type { ListingProperty } from "@/lib/properties/types";

export function getAllRentProperties(): ListingProperty[] {
  return rentPropertyCatalog;
}

export function getRentPropertyById(id: string): ListingProperty | null {
  return rentPropertyCatalog.find((property) => property.id === id) ?? null;
}
