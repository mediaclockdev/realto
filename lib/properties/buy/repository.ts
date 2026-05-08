import { buyPropertyCatalog } from "@/lib/properties/buy/mock-data";
import type { ListingProperty } from "@/lib/properties/types";

export function getAllBuyProperties(): ListingProperty[] {
  return buyPropertyCatalog;
}

export function getBuyPropertyById(id: string): ListingProperty | null {
  return buyPropertyCatalog.find((property) => property.id === id) ?? null;
}
