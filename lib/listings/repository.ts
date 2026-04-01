import type {
  ListingSortOption,
  ListingVariant,
  PropertyListingPageData,
} from "@/lib/listings/types";
import type { ListingProperty } from "@/lib/properties/types";
import { getAllProperties } from "@/lib/properties/repository";
import { TOTAL_PROPERTIES } from "@/lib/properties/mock-data";

const PROPERTIES_PER_PAGE = 12;
const LAND_TOTAL_PROPERTIES = 445;
const DEFAULT_LOCATION = "NSW";
const DEFAULT_SUBURB = "Sans Souci, NSW 2219";

export interface PropertyListingsQuery {
  listingVariant?: ListingVariant;
  page?: number;
  pageSize?: number;
  search?: string;
  sort?: ListingSortOption;
}

export interface PropertyListingsResult extends PropertyListingPageData {
  currentPage: number;
}

function normalizePrice(priceRange: string) {
  const [min] = priceRange.split("-");
  return Number(min.replace(/[^0-9]/g, ""));
}

function sortProperties(
  items: ListingProperty[],
  sort: ListingSortOption = "Relevant listings",
) {
  const nextItems = [...items];

  switch (sort) {
    case "Price (low to high)":
      return nextItems.sort(
        (left, right) =>
          normalizePrice(left.priceRange) - normalizePrice(right.priceRange),
      );
    case "Price (high to low)":
      return nextItems.sort(
        (left, right) =>
          normalizePrice(right.priceRange) - normalizePrice(left.priceRange),
      );
    case "Newest first":
      return nextItems.sort((left, right) =>
        right.date.localeCompare(left.date),
      );
    default:
      return nextItems;
  }
}

function filterProperties(items: ListingProperty[], search = "") {
  const term = search.trim().toLowerCase();

  if (!term) {
    return items;
  }

  return items.filter((property) =>
    [
      property.location,
      property.propertyType,
      property.agentName,
      property.agentLocation,
    ]
      .join(" ")
      .toLowerCase()
      .includes(term),
  );
}

export function getListings(
  query: PropertyListingsQuery = {},
): PropertyListingsResult {
  const listingVariant = query.listingVariant ?? "buy";
  const pageSize = query.pageSize ?? PROPERTIES_PER_PAGE;
  const sourceProperties =
    listingVariant === "land"
      ? getAllProperties(listingVariant).slice(0, LAND_TOTAL_PROPERTIES)
      : getAllProperties(listingVariant);
  const filteredAndSorted = sortProperties(
    filterProperties(sourceProperties, query.search),
    query.sort,
  );
  const totalProperties = filteredAndSorted.length;
  const totalPages = Math.max(1, Math.ceil(totalProperties / pageSize));
  const currentPage = Math.min(Math.max(query.page ?? 1, 1), totalPages);
  const start = (currentPage - 1) * pageSize;

  return {
    properties: filteredAndSorted.slice(start, start + pageSize),
    listingVariant,
    location: DEFAULT_LOCATION,
    suburb: DEFAULT_SUBURB,
    totalProperties,
    propertiesPerPage: pageSize,
    currentPage,
  };
}

export function getPropertyListingPageData(
  query: PropertyListingsQuery = {},
): PropertyListingsResult {
  return getListings(query);
}

export function getPropertyListingMeta(listingVariant: ListingVariant = "buy") {
  return {
    listingVariant,
    location: DEFAULT_LOCATION,
    suburb: DEFAULT_SUBURB,
    totalProperties:
      listingVariant === "land" ? LAND_TOTAL_PROPERTIES : TOTAL_PROPERTIES,
  };
}
