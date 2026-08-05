import { hotelListings } from "@/lib/hotel/mock-data";
import type { HotelListing, HotelRoom } from "@/lib/hotel/types";

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

const ROOM_TEMPLATES: Array<{
  name: string;
  sizeLabel: string;
  bedLabel: string;
  bathroomsLabel: string;
  extraLabel: string;
  amenities: string[];
  priceMultiplier: number;
}> = [
  {
    name: "Deluxe King Room",
    sizeLabel: "2390 sq.ft (222 sq.mt)",
    bedLabel: "1 King Bed",
    bathroomsLabel: "Bathrooms - 1",
    extraLabel: "Tea & Coffee Facilities",
    amenities: ["Air Conditioning", "Free Wifi", "Swimming Pool", "Housekeeping", "Flat-Screen TV"],
    priceMultiplier: 1,
  },
  {
    name: "Superior Room, 2 Double Beds",
    sizeLabel: "2390 sq.ft (222 sq.mt)",
    bedLabel: "Bedroom 1-2 Full Bed(s)",
    bathroomsLabel: "Bathrooms - 1",
    extraLabel: "Kitchen",
    amenities: ["Air Conditioning", "Free Wifi", "Swimming Pool", "Housekeeping", "Private Kitchen"],
    priceMultiplier: 1.09,
  },
  {
    name: "Executive King Room",
    sizeLabel: "2000 sq.ft (186 sq.mt)",
    bedLabel: "1 King Bed",
    bathroomsLabel: "Bathrooms - 1",
    extraLabel: "Tea & Coffee Facilities",
    amenities: ["Heater", "Free Wifi", "Swimming Pool", "Housekeeping", "On Site Parking"],
    priceMultiplier: 0.93,
  },
  {
    name: "Luxury King Room",
    sizeLabel: "1500 sq.ft (139 sq.mt)",
    bedLabel: "1 King Bed",
    bathroomsLabel: "Bathrooms - 1",
    extraLabel: "Tea & Coffee Facilities",
    amenities: ["Air Conditioning", "Free Wifi", "Private Balcony", "Housekeeping", "Flat-Screen TV"],
    priceMultiplier: 1.04,
  },
];

function slugify(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export function getHotelRooms(hotel: HotelListing): HotelRoom[] {
  const basePrice = Number(hotel.priceLabel.replace(/[^0-9.]/g, "")) || 100;

  return ROOM_TEMPLATES.map((template, idx) => {
    const price = Math.round((basePrice * template.priceMultiplier) / 10) * 10;

    return {
      id: slugify(template.name),
      name: template.name,
      image: hotel.gallery[idx % hotel.gallery.length],
      sizeLabel: template.sizeLabel,
      bedLabel: template.bedLabel,
      bathroomsLabel: template.bathroomsLabel,
      extraLabel: template.extraLabel,
      amenities: template.amenities,
      price: `$${price}`,
      taxesLabel: `$${Math.round(price * 0.03)} Taxes & Fees Per Night`,
      loginPrice: `$${Math.round(price * 0.97)}`,
    };
  });
}

export function getHotelRoomById(hotelId: string, roomId: string): { hotel: HotelListing; room: HotelRoom } | null {
  const hotel = getHotelListingById(hotelId);
  if (!hotel) return null;

  const room = getHotelRooms(hotel).find((r) => r.id === roomId);
  if (!room) return null;

  return { hotel, room };
}
