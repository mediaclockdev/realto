import house from "@/public/propertyhouse.svg";
import elder from "@/public/elderrealestate.svg";
import thumbnail1 from "@/public/thumbnail1.svg";
import thumbnail2 from "@/public/thumbnail2.svg";
import thumbnail3 from "@/public/thumbnail3.svg";
import thumbnail4 from "@/public/thumbnail4.svg";
import thumbnail5 from "@/public/thumbnail5.svg";
import thumbnail6 from "@/public/thumbnail6.svg";
import thumbnail7 from "@/public/thumbnail7.svg";
import thumbnail8 from "@/public/thumbnail8.svg";
import thumbnail9 from "@/public/thumbnail9.svg";
import type {
  ListingProperty,
  ListingSortOption,
  PropertyListingPageData,
} from "@/components/PropertyListing/types";
import eddy from "../public/eddyjones.svg";
import facebook from "../public/logos_facebook.svg";
import instagram from "../public/logos_instagram.svg";
import whatsapp from "../public/whatsapp.svg"
import message from "../public/smslogo.svg"


const PROPERTIES_PER_PAGE = 12;
const TOTAL_PROPERTIES = 876;
const DEFAULT_LOCATION = "NSW";
const DEFAULT_SUBURB = "Sans Souci, NSW 2219";

const BASE_PROPERTY: Omit<ListingProperty, "id"> = {
  images: [house, "/property1-alt.jpg"],
  location: "Austin, Australia",
  size: "8,235sqft",
  date: "12-02-2026",
  time: "10:00AM",
  priceRange: "$1,00,000-$2,00,000",
  propertyType: "Apartment",
  agentName: "Anna Johns",
  agentCompany: elder,
  agentLocation: "Austin, Australia",
  agentPhone: "+9999999999",
  agentEmail: "exampleemail.com",
  socials:[whatsapp,instagram,facebook,message],
  agentImage: eddy,
  iconImages: ["/bath.png", "/car.jpg", "/bedroom.jpg"],
  thumbnail: [thumbnail1, thumbnail2, thumbnail3, thumbnail4, thumbnail5, thumbnail6, thumbnail7, thumbnail8, thumbnail9],
};

const properties: ListingProperty[] = Array.from(
  { length: TOTAL_PROPERTIES },
  (_, index) => ({
    ...BASE_PROPERTY,
    id: String(index + 1),
  }),
);

export interface PropertyListingsQuery {
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
  const pageSize = query.pageSize ?? PROPERTIES_PER_PAGE;
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

export function getAllProperties() {
  return properties;
}

export function getPropertyById(id: string) {
  return properties.find((property) => property.id === id) ?? null;
}

export function getRelatedProperties(id: string, limit = 4) {
  const property = getPropertyById(id);

  if (!property) {
    return [];
  }

  return properties
    .filter((item) => item.id !== id)
    .filter(
      (item) =>
        item.location === property.location ||
        item.propertyType === property.propertyType,
    )
    .slice(0, limit);
}

export function getPropertyListingMeta() {
  return {
    location: DEFAULT_LOCATION,
    suburb: DEFAULT_SUBURB,
    totalProperties: TOTAL_PROPERTIES,
  };
}
