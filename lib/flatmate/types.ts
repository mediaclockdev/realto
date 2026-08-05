import type { StaticImageData } from "next/image";

export interface FlatmateListing {
  id: number;
  type: "flatmate" | "place";
  title: string;
  subtitle: string;
  location: string;
  price: string;
  Available?: string;
  months: string;
  thumbnail: string | StaticImageData;
  gallery: (string | StaticImageData)[];
  rooms: { amount: string; billsLabel: string }[];
  roomIcons: { icon: string; count: number }[];
  features: { icon: string; label: string }[];
  aboutFlatmates: string;
  propertyDescription: string;
  host: {
    name: string;
    avatar: string | StaticImageData;
    status: string;
  };
}
