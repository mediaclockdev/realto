import type { ImageSource } from "@/lib/shared/types";

export interface BuyPropertyCardItem {
  id: string;
  images: ImageSource[];
  location: string;
  size: string;
  date: string;
  dateicon: ImageSource;
  time: string;
  priceRange: string;
  propertyType: string;
  agentName: string;
  agentCompany: ImageSource;
  agentLocation: string;
  agentPhone: string;
  agentEmail: string;
  agentImage: ImageSource;
  iconImages?: ImageSource[];
  iconLabels?: string[];
  detailHref?: string;
}
