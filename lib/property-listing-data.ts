import house from "@/public/propertyhouse.svg";
import elder from "@/public/elderrealestate.svg";
import type {
  ListingProperty,
  PropertyListingPageData,
} from "@/components/PropertyListing/types";

import ana from "@/public/anajonesagent.svg";

const PROPERTIES_PER_PAGE = 12;
const TOTAL_PROPERTIES = 876;

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
  agentImage: ana,
  iconImages: ["/bath.png", "/car.jpg", "/bedroom.jpg"],
};

const properties: ListingProperty[] = Array.from(
  { length: TOTAL_PROPERTIES },
  (_, index) => ({
    ...BASE_PROPERTY,
    id: String(index + 1),
  }),
);

export function getPropertyListingPageData(): PropertyListingPageData {
  return {
    properties,
    location: "NSW",
    suburb: "Sans Souci, NSW 2219",
    totalProperties: TOTAL_PROPERTIES,
    propertiesPerPage: PROPERTIES_PER_PAGE,
  };
}
