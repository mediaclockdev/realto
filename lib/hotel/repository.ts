import { hotelListings } from "@/lib/hotel/mock-data";
import type { HotelListing } from "@/lib/hotel/types";

export function getHotelListings(): HotelListing[] {
  return hotelListings;
}

export function getHotelListingById(idOrSlug: string): HotelListing | null {
  return (
    hotelListings.find(
      (listing) => listing.id === idOrSlug || listing.slug === idOrSlug,
    ) ?? null
  );
}
