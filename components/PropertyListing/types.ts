import type { StaticImageData } from "next/image";

export type ListingImageSource = string | StaticImageData;

export interface ListingProperty {
  id: string;
  images: ListingImageSource[];
  location: string;
  size: string;
  date: string;
  time: string;
  priceRange: string;
  propertyType: string;
  agentName: string;
  agentCompany: ListingImageSource;
  agentLocation: string;
  agentPhone: string;
  agentEmail: string;
  agentImage: ListingImageSource;
  iconImages?: ListingImageSource[];
  iconLabels?: string[];
}

export interface PropertyListingPageData {
  properties: ListingProperty[];
  location: string;
  suburb: string;
  totalProperties: number;
  propertiesPerPage: number;
}
