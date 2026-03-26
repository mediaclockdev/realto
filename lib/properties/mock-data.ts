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
import eddy1 from "@/public/eddy1.png";
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

export const TOTAL_PROPERTIES = 876;

const BASE_PROPERTY: Omit<ListingProperty, "id"> = {
  images: [house, house4],
  location: "Austin, Australia",
  size: "8,235sqft",
  date: "12-02-2026",
  time: "10:00AM",
  priceRange: "$1,00,000-$2,00,000",
  propertyType: "Apartment",
  agentName: "Anna Johns",
  agentCompany: elder,
  agentCompanyName: "Parker Realestate",
  agentLocation: "Austin, Australia",
  agentPhone: "+9999999999",
  agentEmail: "exampleemail.com",
  socials: [whatsapp, instagram, facebook, message, phone, mail],
  flags: [french, china, spanish],
  agentImage: ana,
  agentImageCard: eddy,
  iconImages: ["/bedroom.jpg", "/bath.png", "/car.jpg"],
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

export const propertyCatalog: ListingProperty[] = Array.from(
  { length: TOTAL_PROPERTIES },
  (_, index) => ({
    ...BASE_PROPERTY,
    id: String(index + 1),
  }),
);
