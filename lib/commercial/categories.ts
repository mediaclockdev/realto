import type { StaticImageData } from "next/image";
import warehouse from "@/public/warehouse.jpg";
import shops from "@/public/shops.jpg";
import offices from "@/public/offices.jpg";
import workspace from "@/public/workspace.jpg";
import store from "@/public/store.jpg";
import storage from "@/public/storage.jpg";

export type PropertyCategory = {
  slug: string;
  name: string;
  icon: StaticImageData;
  propertyType: string | null;
};

export const PROPERTY_CATEGORIES: PropertyCategory[] = [
  {
    slug: "warehouse",
    name: "Warehouse, Factory & Industrial",
    icon: warehouse,
    propertyType: "Warehouse",
  },
  { slug: "retail", name: "Shops & Retail", icon: shops, propertyType: "Retail" },
  { slug: "offices", name: "Offices", icon: offices, propertyType: "Office" },
  { slug: "workspace", name: "Workspace", icon: workspace, propertyType: "Workspace" },
  { slug: "store", name: "Store", icon: store, propertyType: "Showroom" },
  { slug: "storage", name: "Storage", icon: storage, propertyType: "Storage" },
];

export function getCategoryBySlug(slug: string) {
  return PROPERTY_CATEGORIES.find((category) => category.slug === slug);
}
