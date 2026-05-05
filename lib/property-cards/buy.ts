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
} from "@/lib/properties/property-card-icons";

const baseBuyCards: BuyPropertyCardItem[] = [
  {
    id: "1",
    images: [house, house2],
    location: "Austin, Australia",
    size: "8,235",
    date: "12-02-2026",
    dateicon: calender,
    time: "10:00",
    priceRange: "$1,00,000-$2,00,000",
    propertyType: "Apartment",
    agentName: "Anna Johns",
    agentCompany: elder,
    agentLocation: "Austin, Australia",
    agentPhone: "+9999999999",
    agentEmail: "exampleemail.com",
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
    priceRange: "$1,00,000-$2,00,000",
    propertyType: "Apartment",
    agentName: "Anna Johns",
    agentCompany: elder,
    agentLocation: "Austin, Australia",
    agentPhone: "+9999999999",
    agentEmail: "exampleemail.com",
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
    priceRange: "$1,00,000-$2,00,000",
    propertyType: "Apartment",
    agentName: "Anna Johns",
    agentCompany: elder,
    agentLocation: "Austin, Australia",
    agentPhone: "+9999999999",
    agentEmail: "exampleemail.com",
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
    priceRange: "$1,00,000-$2,00,000",
    propertyType: "Apartment",
    agentName: "Anna Johns",
    agentCompany: elder,
    agentLocation: "Austin, Australia",
    agentPhone: "+9999999999",
    agentEmail: "exampleemail.com",
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
    priceRange: "$1,00,000-$2,00,000",
    propertyType: "Apartment",
    agentName: "Anna Johns",
    agentCompany: elder,
    agentLocation: "Austin, Australia",
    agentPhone: "+9999999999",
    agentEmail: "exampleemail.com",
    agentImage: ana,
    iconImages: buyPropertyFeatureIcons,
  },
];

export const newlyListedBuyPropertyCards: BuyPropertyCardItem[] =
  baseBuyCards.map((property) => ({
    ...property,
    detailHref: `/property/${property.id}?listingVariant=buy`,
  }));

export const trendingBuyPropertyCards: BuyPropertyCardItem[] = baseBuyCards.map(
  (property, index) => ({
    ...property,
    id: String(index + 11),
    images: index % 2 === 0 ? [house4, house] : [house, house3],
    detailHref: `/property/${index + 11}?listingVariant=buy`,
  }),
);

export const luxuryBuyPropertyCards: BuyPropertyCardItem[] = [
  {
    ...baseBuyCards[0],
    images: [luxury, modern],
    dateicon: hammer,
    locationIcon: luxuryLocationIcon,
    detailHref: "/property/1?listingVariant=buy",
  },
  {
    ...baseBuyCards[1],
    images: [luxury, villa],
    dateicon: calender,
    locationIcon: luxuryLocationIcon,
    detailHref: "/property/2?listingVariant=buy",
  },
  {
    ...baseBuyCards[2],
    images: [luxury, modern],
    dateicon: hammer,
    locationIcon: luxuryLocationIcon,
    detailHref: "/property/3?listingVariant=buy",
  },
  {
    ...baseBuyCards[3],
    images: [luxury, villa],
    dateicon: calender,
    locationIcon: luxuryLocationIcon,
    detailHref: "/property/4?listingVariant=buy",
  },
];
