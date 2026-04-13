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
  if (listingVariant === "rent") {
    // Generate a reasonable weekly rent based on the property ID or index
    const idNum = parseInt(property.id);
    const rentMin = 400 + (idNum % 20) * 50;
    const rentMax = rentMin + 100;

    return {
      ...property,
      priceRange: `$${rentMin}-$${rentMax}`,
      // Rent specific labels or icons if needed
    };
  }

  if (listingVariant === "land") {
    const landThumbnails = [
      landthumbnail,
      landthumbnail2,
      landthumbnail3,
      landthumbnail4,
      landthumbnail5,
      landthumbnail6,
      landthumbnail7,
      landthumbnail8,
      landthumbnail9,
    ];
    const idNum = parseInt(property.id);
    const mainImg = landThumbnails[idNum % landThumbnails.length];

    return {
      ...property,
      images: [landbuyimg],
      thumbnail: [landmainimg, ...landThumbnails],
      location: property.location, // Keep the generated location
      size: `${200 + (idNum % 10) * 100}msq`,
      priceRange: `$${(200000 + (idNum % 30) * 20000).toLocaleString()}`,
      propertyType: "Residential Land",
      agentName: property.agentName,
      agentLocation: property.agentLocation,
      iconImages: undefined,
      iconLabels: undefined,
    };
  }

  return property;
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
