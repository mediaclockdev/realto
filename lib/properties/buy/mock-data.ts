import house from "@/public/propertyhouse.svg";
import elder from "@/public/elderrealestate.svg";
import thumbnail1 from "@/public/thumbnail1.svg";
import thumbnail2 from "@/public/thumbnail2.svg";
import thumbnail3 from "@/public/thumbnail3.svg";
import thumbnail4 from "@/public/thumbnail4.svg";
import thumbnail5 from "@/public/thumbnail5.svg";
import thumbnail6 from "@/public/thumbnail6.svg";
import thumbnail7 from "@/public/thumbnail7.svg";
import thumbnail8 from "@/public/thumbnail8.svg";
import thumbnail9 from "@/public/thumbnail9.svg";
import type { ListingProperty } from "@/lib/properties/types";
import eddy from "@/public/eddyjones.svg";
import facebook from "@/public/logos_facebook.svg";
import instagram from "@/public/logos_instagram.svg";
import whatsapp from "@/public/whatsapp.svg";
import message from "@/public/smslogo.svg";
import phone from "@/public/phone.svg";
import mail from "@/public/mail.svg";
import house4 from "@/public/house4.svg";
import ana from "@/public/anajonesagent.svg";
import french from "@/public/Franceflag.svg";
import china from "@/public/chinaflag.svg";
import spanish from "@/public/spain.svg";
import {
  buyPropertyFeatureIcons,
  rentPropertyFeatureIcons,
} from "@/lib/properties/property-card-icons";

export const TOTAL_BUY_PROPERTIES = 876;

const BUY_BASE_PROPERTY: Omit<ListingProperty, "id"> = {
  images: [house, house4],
  location: "Austin, Australia",
  size: "8,235",
  date: "12-02-2026",
  time: "10:00",
  priceRange: "$100,000-$200,000",
  propertyType: "Apartment",
  agentName: "Anna Johns",
  agentCompany: elder,
  agentCompanyName: "Parker Realestate",
  agentLocation: "Austin, Australia",
  agentPhone: "+9999999999",
  agentEmail: "example@example.com",
  socials: [whatsapp, instagram, facebook, message, phone, mail],
  flags: [french, china, spanish],
  agentImage: ana,
  agentImageCard: eddy,
  buyiconImages: buyPropertyFeatureIcons,
  renticonImages: rentPropertyFeatureIcons,
  thumbnail: [
    thumbnail1,
    thumbnail2,
    thumbnail3,
    thumbnail4,
    thumbnail5,
    thumbnail6,
    thumbnail7,
    thumbnail8,
    thumbnail9,
  ],
};

const buyLocations = [
  "Sans Souci, NSW 2219",
  "Cronulla, NSW 2230",
  "Bondi Beach, NSW 2026",
  "Mittagong, NSW 2575",
  "Austin, Australia",
  "Sydney, Australia",
  "Melbourne, Australia",
  "Brisbane, Australia",
];

const buyPropertyTypes = ["Apartment", "House", "Townhouse", "Villa", "Studio"];
const buyAgentNames = [
  "Anna Johns",
  "Eddie Jones",
  "Anita Roelvink",
  "Brook Jones",
];

export const buyPropertyCatalog: ListingProperty[] = Array.from(
  { length: TOTAL_BUY_PROPERTIES },
  (_, index) => {
    const location = buyLocations[index % buyLocations.length];
    const propertyType = buyPropertyTypes[index % buyPropertyTypes.length];
    const agentName = buyAgentNames[index % buyAgentNames.length];
    const priceMin = 500000 + (index % 50) * 100000;
    const priceMax = priceMin + 200000;

    return {
      ...BUY_BASE_PROPERTY,
      id: String(index + 1),
      location,
      propertyType,
      agentName,
      priceRange: `$${priceMin.toLocaleString()}-$${priceMax.toLocaleString()}`,
    };
  },
);
