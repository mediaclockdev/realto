import type { ListingVariant } from "@/lib/listings/types";
import type { ListingProperty } from "@/lib/properties/types";
import {
  getAllBuyProperties,
  getBuyPropertyById,
} from "@/lib/properties/buy/repository";
import {
  getAllLandProperties,
  getLandPropertyById,
} from "@/lib/properties/land/repository";
import {
  getAllRentProperties,
  getRentPropertyById,
} from "@/lib/properties/rent/repository";

function getRepositoryForVariant(listingVariant: ListingVariant) {
  switch (listingVariant) {
    case "rent":
      return {
        getAll: getAllRentProperties,
        getById: getRentPropertyById,
      };
    case "land":
      return {
        getAll: getAllLandProperties,
        getById: getLandPropertyById,
      };
    case "buy":
    default:
      return {
        getAll: getAllBuyProperties,
        getById: getBuyPropertyById,
      };
  }
}

export function getPropertyById(
  id: string,
  listingVariant: ListingVariant = "buy",
): ListingProperty | null {
  return getRepositoryForVariant(listingVariant).getById(id);
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
  return getRepositoryForVariant(listingVariant).getAll();
}
