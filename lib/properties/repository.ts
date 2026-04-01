import type { ListingVariant } from "@/lib/listings/types";
import type { ListingProperty } from "@/lib/properties/types";
import landthumbnail from "@/public/landthumbnail.svg";
import landthumbnail2 from "@/public/landthumbnail2.svg";
import landthumbnail3 from "@/public/landthumbnail3.svg";
import landthumbnail4 from "@/public/landthumbnail4.svg";
import landthumbnail5 from "@/public/landthumbnail5.svg";
import landthumbnail6 from "@/public/landthumbnail6.svg";
import landthumbnail7 from "@/public/landthumbnail7.svg";
import landthumbnail8 from "@/public/landthumbnail8.svg";
import landthumbnail9 from "@/public/landthumbnail9.svg";
import landmainimg from "@/public/landmainimg.svg";
import landbuyimg from "@/public/landbuyimg.svg";
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
    images: [landbuyimg],
    thumbnail: [
      landmainimg,
      landthumbnail,
      landthumbnail2,
      landthumbnail3,
      landthumbnail4,
      landthumbnail5,
      landthumbnail6,
      landthumbnail7,
      landthumbnail8,
      landthumbnail9,
    ],
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
