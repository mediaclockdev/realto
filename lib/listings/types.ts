import type { ListingProperty } from "@/lib/properties/types";

export const LISTING_SORT_OPTIONS = [
  "Relevant listings",
  "Newest first",
  "Price (low to high)",
  "Price (high to low)",
] as const;

export type ListingVariant = "buy" | "rent" | "land";
export type ListingSortOption = (typeof LISTING_SORT_OPTIONS)[number];
export type PropertyListingViewMode = "grid" | "map";

export interface PropertyListingsQuery {
  listingVariant?: ListingVariant;
  page?: number;
  pageSize?: number;
  search?: string;
  sort?: ListingSortOption;
}

export interface PropertyListingPageData {
  properties: ListingProperty[];
  listingVariant: ListingVariant;
  location: string;
  suburb: string;
  totalProperties: number;
  propertiesPerPage: number;
  currentPage: number;
}

export type PropertyListingsResult = PropertyListingPageData;

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
