import type { ImageSource } from "@/lib/shared/types";

export interface CommercialListing {
  id: string;
  title: string;
  propertyType: string;
  listingType: "Buy" | "Lease";
  address: string;
  location: string;
  price: string;
  size: string;
  carSpaces: string;
  day: string;
  date: string;
  time: string;
  thumbnail: ImageSource;
  gallery: ImageSource[];
  description: string;
  agent: {
    name: string;
    phone: string;
    email: string;
    image: ImageSource;
    agencyLogoText: string;
  };
}
