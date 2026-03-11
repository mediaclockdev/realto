import type { StaticImageData } from "next/image";

export type ListingImageSource = string | StaticImageData;
export type ListingSortOption =
  | "Relevant listings"
  | "Newest first"
  | "Price (low to high)"
  | "Price (high to low)";
export type PropertyListingViewMode = "grid" | "map";

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
  thumbnail: ListingImageSource[];
  socials :  ListingImageSource[];
}

export interface PropertyListingPageData {
  properties: ListingProperty[];
  location: string;
  suburb: string;
  totalProperties: number;
  propertiesPerPage: number;
  currentPage: number;
}

export interface PropertyListingQueryState {
  page: number;
  search: string;
  sort: ListingSortOption;
  view: PropertyListingViewMode;
}

export interface PropertyMapMarker {
  top: string;
  left: string;
}
