import type {
  ListingSortOption,
  ListingVariant,
  PropertyListingsQuery,
  PropertyListingsResult,
} from "@/lib/listings/types";
import type { ListingProperty } from "@/lib/properties/types";

export const DEFAULT_PROPERTIES_PER_PAGE = 12;
export const DEFAULT_LISTING_LOCATION = "NSW";
export const DEFAULT_LISTING_SUBURB = "Sans Souci, NSW 2219";

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

export function buildPropertyListingsResult({
  properties,
  query = {},
  listingVariant,
  location = DEFAULT_LISTING_LOCATION,
  suburb = DEFAULT_LISTING_SUBURB,
}: {
  properties: ListingProperty[];
  query?: PropertyListingsQuery;
  listingVariant: ListingVariant;
  location?: string;
  suburb?: string;
}): PropertyListingsResult {
  const pageSize = query.pageSize ?? DEFAULT_PROPERTIES_PER_PAGE;
  const filteredAndSorted = sortProperties(
    filterProperties(properties, query.search),
    query.sort,
  );
  const totalProperties = filteredAndSorted.length;
  const totalPages = Math.max(1, Math.ceil(totalProperties / pageSize));
  const currentPage = Math.min(Math.max(query.page ?? 1, 1), totalPages);
  const start = (currentPage - 1) * pageSize;

  return {
    properties: filteredAndSorted.slice(start, start + pageSize),
    listingVariant,
    location,
    suburb,
    totalProperties,
    propertiesPerPage: pageSize,
    currentPage,
  };
}
