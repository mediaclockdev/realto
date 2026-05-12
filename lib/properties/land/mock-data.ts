import elder from "@/public/elderrealestate.svg";
import type { ListingProperty } from "@/lib/properties/types";
import eddy from "@/public/eddyjones.svg";
import facebook from "@/public/logos_facebook.svg";
import instagram from "@/public/logos_instagram.svg";
import whatsapp from "@/public/whatsapp.svg";
import message from "@/public/smslogo.svg";
import phone from "@/public/phone.svg";
import mail from "@/public/mail.svg";
import ana from "@/public/anajonesagent.svg";
import french from "@/public/Franceflag.svg";
import china from "@/public/chinaflag.svg";
import spanish from "@/public/spain.svg";
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

export const TOTAL_LAND_PROPERTIES = 445;

const landThumbnails = [
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
];

const LAND_BASE_PROPERTY: Omit<ListingProperty, "id"> = {
  images: [landbuyimg],
  location: "Austin, Australia",
  size: "730msq",
  date: "12-02-2026",
  time: "10:00",
  priceRange: "$6,50,000",
  propertyType: "Residential Land",
  agentName: "Anita Roelvink",
  agentCompany: elder,
  agentCompanyName: "Parker Realestate",
  agentLocation: "Austin, Australia",
  agentPhone: "+9999999999",
  agentEmail: "example@example.com",
  socials: [whatsapp, instagram, facebook, message, phone, mail],
  flags: [french, china, spanish],
  agentImage: ana,
  agentImageCard: eddy,
  thumbnail: landThumbnails,
};

const landLocations = [
  "Sans Souci, NSW 2219",
  "Cronulla, NSW 2230",
  "Bondi Beach, NSW 2026",
  "Mittagong, NSW 2575",
  "Austin, Australia",
  "Sydney, Australia",
  "Melbourne, Australia",
  "Brisbane, Australia",
];

const landAgentNames = [
  "Anita Roelvink",
  "Anna Johns",
  "Eddie Jones",
  "Brook Jones",
];

export const landPropertyCatalog: ListingProperty[] = Array.from(
  { length: TOTAL_LAND_PROPERTIES },
  (_, index) => {
    const idNum = index + 1;

    return {
      ...LAND_BASE_PROPERTY,
      id: String(idNum),
      location: landLocations[index % landLocations.length],
      size: `${200 + (idNum % 10) * 100}msq`,
      priceRange: `$${(200000 + (idNum % 30) * 20000).toLocaleString()}`,
      agentName: landAgentNames[index % landAgentNames.length],
    };
  },
);
