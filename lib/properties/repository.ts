import type { ListingVariant } from "@/lib/listings/types";
import type { ListingProperty } from "@/lib/properties/types";
import land from "@/public/land.svg";
import land1 from "@/public/land1.svg";
import { propertyCatalog } from "./mock-data";

function mapPropertyForVariant(
  property: ListingProperty,
  listingVariant: ListingVariant = "buy",
): ListingProperty {
  if (listingVariant !== "land") {
    return property;
  }

  return {
    ...property,
    images: [land1, land],
    thumbnail: [land1, land, land1, land, land1, land, land1, land],
    location: "6 Vickery Place, Mittagong",
    size: "730msq",
    priceRange: "$6,50,000",
    propertyType: "Residential Land",
    agentName: "Anita Roelvink",
    agentLocation: "Austin,Australia",
    iconImages: undefined,
    iconLabels: undefined,
  };
}

export function getPropertyById(
  id: string,
  listingVariant: ListingVariant = "buy",
): ListingProperty | null {
  const property = propertyCatalog.find((item) => item.id === id) ?? null;

  if (!property) {
    return null;
  }

  return mapPropertyForVariant(property, listingVariant);
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
    mapPropertyForVariant(property, listingVariant),
  );
}
