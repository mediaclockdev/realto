import type { ListingVariant } from "@/lib/listings/types";
import type { ListingProperty } from "@/lib/properties/types";
import landbuyimg from "@/public/landbuyimg.svg";
import landmainimg from "@/public/landmainimg.svg";
import landthumbnail from "@/public/landthumbnail.svg";
import landthumbnail2 from "@/public/landthumbnail2.svg";
import landthumbnail3 from "@/public/landthumbnail3.svg";
import landthumbnail4 from "@/public/landthumbnail4.svg";
import landthumbnail5 from "@/public/landthumbnail5.svg";
import landthumbnail6 from "@/public/landthumbnail6.svg";
import landthumbnail7 from "@/public/landthumbnail7.svg";
import landthumbnail8 from "@/public/landthumbnail8.svg";
import landthumbnail9 from "@/public/landthumbnail9.svg";

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

export function mapPropertyForListingVariant(
  property: ListingProperty,
  listingVariant: ListingVariant = "buy",
): ListingProperty {
  if (listingVariant === "rent") {
    const idNum = parseInt(property.id);
    const rentMin = 400 + (idNum % 20) * 50;
    const rentMax = rentMin + 100;

    return {
      ...property,
      priceRange: `$${rentMin}-$${rentMax}`,
    };
  }

  if (listingVariant === "land") {
    const idNum = parseInt(property.id);

    return {
      ...property,
      images: [landbuyimg],
      thumbnail: [landmainimg, ...landThumbnails],
      location: property.location,
      size: `${200 + (idNum % 10) * 100}msq`,
      priceRange: `$${(200000 + (idNum % 30) * 20000).toLocaleString()}`,
      propertyType: "Residential Land",
      agentName: property.agentName,
      agentLocation: property.agentLocation,
      buyiconImages: undefined,
      renticonImages: undefined,
      iconLabels: undefined,
    };
  }

  return property;
}
