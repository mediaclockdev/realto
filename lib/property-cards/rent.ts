import type { ListingProperty } from "@/lib/properties/types";
import type { BuyPropertyCardItem } from "@/lib/property-cards/types";
import {
  luxuryBuyPropertyCards,
  newlyListedBuyPropertyCards,
  trendingBuyPropertyCards,
} from "@/lib/property-cards/buy";

function toRentPropertyCards(
  properties: BuyPropertyCardItem[],
  options: { priceRange: string; propertyType: string },
): ListingProperty[] {
  return properties.map((property) => ({
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
    renticonImages: property.iconImages,
    iconLabels: property.iconLabels ?? ["1", "1", "1"],
    thumbnail: property.images,
    socials: [],
    flags: [],
  }));
}

export const newlyListedRentPropertyCards = toRentPropertyCards(
  newlyListedBuyPropertyCards,
  {
    priceRange: "$700 rent/week",
    propertyType: "Apartment",
  },
);

export const trendingRentPropertyCards = toRentPropertyCards(
  trendingBuyPropertyCards,
  {
    priceRange: "$500-$600",
    propertyType: "House",
  },
);

export const luxuryRentPropertyCards = toRentPropertyCards(
  luxuryBuyPropertyCards,
  {
    priceRange: "$500-$600",
    propertyType: "House",
  },
);
