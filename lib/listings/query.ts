import {
  LISTING_SORT_OPTIONS,
  type ListingSortOption,
  type PropertyListingQueryState,
} from "@/lib/listings/types";

type ListingSearchParams = Record<string, string | string[] | undefined>;

function readParam(params: ListingSearchParams, key: string) {
  const value = params[key];

  return Array.isArray(value) ? value[0] : value;
}

function isListingSortOption(value: string): value is ListingSortOption {
  return LISTING_SORT_OPTIONS.includes(value as ListingSortOption);
}

export function parsePropertyListingQuery(
  searchParams: ListingSearchParams = {},
): PropertyListingQueryState {
  const pageParam = Number(readParam(searchParams, "page") ?? "1");
  const sortParam = readParam(searchParams, "sort") ?? "";
  const search = readParam(searchParams, "search") ?? "";
  const viewParam = readParam(searchParams, "view");

  return {
    page: Number.isFinite(pageParam) && pageParam > 0 ? pageParam : 1,
    search,
    sort: isListingSortOption(sortParam)
      ? sortParam
      : LISTING_SORT_OPTIONS[0],
    view: viewParam === "map" ? "map" : "grid",
  };
}
