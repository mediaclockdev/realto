import type { ListingProperty } from "@/lib/properties/types";

export type ListingVariant = "buy" | "rent" | "land";
export type ListingSortOption =
  | "Relevant listings"
  | "Newest first"
  | "Price (low to high)"
  | "Price (high to low)";
export type PropertyListingViewMode = "grid" | "map";

export interface PropertyListingPageData {
  properties: ListingProperty[];
  listingVariant: ListingVariant;
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
