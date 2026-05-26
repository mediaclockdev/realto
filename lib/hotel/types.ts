import type { ImageSource } from "@/lib/shared/types";
import { StaticImport } from "next/dist/shared/lib/get-img-props";

export interface HotelAmenity {
  label: string;
  icon: ImageSource;
}

export interface HotelHost {
  name: string;
  company: string;
  avatar: StaticImport;
  socials: ImageSource[];
  flags: ImageSource[];
}

export interface HotelListing {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  location: string;
  priceLabel: string;
  totalLabel: string;
  badge: string;
  rating: number;
  heroImage: ImageSource;
  gallery: ImageSource[];
  amenities: HotelAmenity[];
  host: HotelHost;
  summary: string;
  meta: string[];
  mapLabel: string;
  iconImages: ImageSource[];
  iconLabels?: string[];
  phone?: string;
  email?: string;
  oldPrice?: string;
  roomNames?: string[];
}

