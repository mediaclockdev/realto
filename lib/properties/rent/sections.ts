import type { ListingProperty } from "@/lib/properties/types";
import type { BuyPropertyCardItem } from "@/lib/property-cards/types";
import {
  luxuryBuyProperties,
  newlyListedBuyProperties,
  trendingBuyProperties,
} from "@/lib/properties/buy/sections";
import {
  rentPropertyFeatureIcons,
} from "@/lib/properties/property-card-icons";


function toRentSectionProperties(
  properties: BuyPropertyCardItem[],
  options: { priceRange: string; propertyType: string },
): ListingProperty[] {
  return properties.map((property) => {
    return {
      id: property.id,
      images: property.images,
      location: property.location,
      size: property.size,
      date: property.date,
      time: property.time,
      priceRange: options.priceRange,
      propertyType: options.propertyType,
      agentName: property.agentName,
      agentCompany: property.agentCompany,
      agentCompanyName: "Parker Realestate",
      agentLocation: property.agentLocation,
      agentPhone: property.agentPhone,
      agentEmail: property.agentEmail,
      agentImage: property.agentImage,
      agentImageCard: property.agentImage,
      renticonImages: rentPropertyFeatureIcons,
      iconLabels: property.iconLabels ?? ["1", "1", "1"],
      likeIcon: property.likeIcon,
      likedIcon: property.likedIcon,
      hoverBorderGradient: property.hoverBorderGradient,
      thumbnail: property.images,
      socials: [],
      flags: [],
    };
  });
}



export const newlyListedRentProperties = toRentSectionProperties(
  newlyListedBuyProperties,
  {
    priceRange: "$700/week",
    propertyType: "Apartment",
  },
);

export const trendingRentProperties = toRentSectionProperties(
  trendingBuyProperties,
  {
    priceRange: "$500-$600",
    propertyType: "House",
  },
);

export const luxuryRentProperties = toRentSectionProperties(luxuryBuyProperties, {
  priceRange: "$500-$600",
  propertyType: "House",
});
