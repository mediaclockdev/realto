import type { ListingProperty } from "@/lib/properties/types";
import { landPropertyCatalog } from "@/lib/properties/land/mock-data";

export const latestLandProperties: ListingProperty[] = landPropertyCatalog.slice(
  10,
  15,
);
