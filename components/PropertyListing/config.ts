import type { ListingVariant } from "@/lib/listings/types";

export interface ListingVariantConfig {
  variant: ListingVariant;
  listingLabel: string;
  detailBasePath: string;
  accentColorClassName: string;
  filterBarClassName: string;
  listPanelBorderClassName: string;
  mapHeaderVariant: "default" | "map";
  showRentRibbon: boolean;
}

export const listingVariantConfig: Record<ListingVariant, ListingVariantConfig> = {
  buy: {
    variant: "buy",
    listingLabel: "Properties for sale in",
    detailBasePath: "/property",
    accentColorClassName: "bg-[#0284C7]",
    filterBarClassName: "bg-[#0284C7]",
    listPanelBorderClassName: "border-[#0284C7]",
    mapHeaderVariant: "map",
    showRentRibbon: false,
  },
  rent: {
    variant: "rent",
    listingLabel: "Properties for rent in",
    detailBasePath: "/property",
    accentColorClassName: "bg-[#0284C7]",
    filterBarClassName: "bg-[#0284C7]",
    listPanelBorderClassName: "border-[#d63d3d]",
    mapHeaderVariant: "map",
    showRentRibbon: true,
  },
};

export function getListingVariantConfig(variant: ListingVariant) {
  return listingVariantConfig[variant];
}
