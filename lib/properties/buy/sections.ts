import house from "@/public/propertyhouse.svg";
import house2 from "@/public/house2.svg";
import house3 from "@/public/house3.svg";
import house4 from "@/public/house4.svg";
import luxury from "@/public/Luxury Modern Villa.jpg";
import modern from "@/public/Luxury Modern Villa1.jpg";
import villa from "@/public/Luxury Modern Villa2.jpg";
import elder from "@/public/elderrealestate.svg";
import ana from "@/public/anajonesagent.svg";
import calender from "@/public/buycalender.svg";
import hammer from "@/public/hammer.svg";
import type { BuyPropertyCardItem } from "@/lib/property-cards/types";
import {
  buyPropertyFeatureIcons,
  luxuryLocationIcon,
  luxuryPropertyFeatureIcons,
  luxuryClockIcon,
  luxuryClockIcon2,
  luxurylikeicon,
  luxurylikedicon,
} from "@/lib/properties/property-card-icons";

const LUXURY_HOVER_BORDER_GRADIENT =
  "linear-gradient(90deg, #CB9E33, #EDD06A, #FCEA94, #FADE7B, #FDEE9D, #C29225)";

const baseBuySectionCards: BuyPropertyCardItem[] = [
  {
    id: "1",
    images: [house, house2],
    location: "Austin, Australia",
    size: "8,235",
    date: "12-02-2026",
    dateicon: calender,
    time: "10:00",
    priceRange: "$100,000-$200,000",
    propertyType: "Apartment",
    agentName: "Anna Johns",
    agentCompany: elder,
    agentLocation: "Austin, Australia",
    agentPhone: "+9999999999",
    agentEmail: "example@example.com",
    agentImage: ana,
    iconImages: buyPropertyFeatureIcons,
  },
  {
    id: "2",
    images: [house4, house3],
    location: "Austin, Australia",
    size: "8,235",
    date: "12-02-2026",
    dateicon: hammer,
    time: "10:00",
    priceRange: "$100,000-$200,000",
    propertyType: "Apartment",
    agentName: "Anna Johns",
    agentCompany: elder,
    agentLocation: "Austin, Australia",
    agentPhone: "+9999999999",
    agentEmail: "example@example.com",
    agentImage: ana,
    iconImages: buyPropertyFeatureIcons,
  },
  {
    id: "3",
    images: [house4, house],
    location: "Austin, Australia",
    size: "8,235",
    date: "12-02-2026",
    dateicon: calender,
    time: "10:00",
    priceRange: "$100,000-$200,000",
    propertyType: "Apartment",
    agentName: "Anna Johns",
    agentCompany: elder,
    agentLocation: "Austin, Australia",
    agentPhone: "+9999999999",
    agentEmail: "example@example.com",
    agentImage: ana,
    iconImages: buyPropertyFeatureIcons,
  },
  {
    id: "4",
    images: [house3, house2],
    location: "Austin, Australia",
    size: "8,235",
    date: "12-02-2026",
    dateicon: hammer,
    time: "10:00",
    priceRange: "$100,000-$200,000",
    propertyType: "Apartment",
    agentName: "Anna Johns",
    agentCompany: elder,
    agentLocation: "Austin, Australia",
    agentPhone: "+9999999999",
    agentEmail: "example@example.com",
    agentImage: ana,
    iconImages: buyPropertyFeatureIcons,
  },
  {
    id: "5",
    images: [house2, house3],
    location: "Austin, Australia",
    size: "8,235",
    date: "12-02-2026",
    dateicon: calender,
    time: "10:00",
    priceRange: "$100,000-$200,000",
    propertyType: "Apartment",
    agentName: "Anna Johns",
    agentCompany: elder,
    agentLocation: "Austin, Australia",
    agentPhone: "+9999999999",
    agentEmail: "example@example.com",
    agentImage: ana,
    iconImages: buyPropertyFeatureIcons,
  },
];

export const newlyListedBuyProperties: BuyPropertyCardItem[] =
  baseBuySectionCards.map((property) => ({
    ...property,
    iconImages: buyPropertyFeatureIcons,
    detailHref: `/property/${property.id}?listingVariant=buy`,
  }));

export const trendingBuyProperties: BuyPropertyCardItem[] =
  baseBuySectionCards.map((property, index) => ({
    ...property,
    id: String(index + 11),
    images: index % 2 === 0 ? [house4, house] : [house, house3],
    iconImages: buyPropertyFeatureIcons,
    detailHref: `/property/${index + 11}?listingVariant=buy`,
  }));

export const luxuryBuyProperties: BuyPropertyCardItem[] = [
  {
    ...baseBuySectionCards[0],
    images: [luxury, modern],
    dateicon: hammer,
    iconImages: luxuryPropertyFeatureIcons,
    locationIcon: luxuryLocationIcon,
    clockIcon: luxuryClockIcon2,
    likeIcon: luxurylikeicon,
    likedIcon: luxurylikedicon,
    hoverBorderGradient: LUXURY_HOVER_BORDER_GRADIENT,
    detailHref: "/property/21?listingVariant=buy",
  },
  {
    ...baseBuySectionCards[1],
    images: [luxury, villa],
    dateicon: calender,
    iconImages: luxuryPropertyFeatureIcons,
    locationIcon: luxuryLocationIcon,
    clockIcon: luxuryClockIcon,
    likeIcon: luxurylikeicon,
    likedIcon: luxurylikedicon,
    hoverBorderGradient: LUXURY_HOVER_BORDER_GRADIENT,
    detailHref: "/property/22?listingVariant=buy",
  },
  {
    ...baseBuySectionCards[2],
    images: [luxury, modern],
    dateicon: hammer,
    iconImages: luxuryPropertyFeatureIcons,
    locationIcon: luxuryLocationIcon,
    clockIcon: luxuryClockIcon2,
    likeIcon: luxurylikeicon,
    likedIcon: luxurylikedicon,
    hoverBorderGradient: LUXURY_HOVER_BORDER_GRADIENT,
    detailHref: "/property/23?listingVariant=buy",
  },
  {
    ...baseBuySectionCards[3],
    images: [luxury, villa],
    dateicon: calender,
    iconImages: luxuryPropertyFeatureIcons,
    locationIcon: luxuryLocationIcon,
    clockIcon: luxuryClockIcon,
    likeIcon: luxurylikeicon,
    likedIcon: luxurylikedicon,
    hoverBorderGradient: LUXURY_HOVER_BORDER_GRADIENT,
    detailHref: "/property/24?listingVariant=buy",
  },
];
