import type {
  ListingVariant,
  PropertyListingsQuery,
  PropertyListingsResult,
} from "@/lib/listings/types";
import { getBuyListingMeta, getBuyListings } from "@/lib/listings/buy";
import { getLandListingMeta, getLandListings } from "@/lib/listings/land";
import { getRentListingMeta, getRentListings } from "@/lib/listings/rent";

export function getListings(
  query: PropertyListingsQuery = {},
): PropertyListingsResult {
  const listingVariant = query.listingVariant ?? "buy";

  if (listingVariant === "buy") {
    return getBuyListings(query);
  }

  if (listingVariant === "rent") {
    return getRentListings(query);
  }

  return getLandListings(query);
}

export function getPropertyListingPageData(
  query: PropertyListingsQuery = {},
): PropertyListingsResult {
  return getListings(query);
}

export function getPropertyListingMeta(listingVariant: ListingVariant = "buy") {
  if (listingVariant === "buy") {
    return getBuyListingMeta();
  }

  if (listingVariant === "rent") {
    return getRentListingMeta();
  }

  return getLandListingMeta();
}
