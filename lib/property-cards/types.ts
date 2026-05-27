import type { ImageSource } from "@/lib/shared/types";

export interface BuyPropertyCardItem {
  renticonImages?: ImageSource[];
  id: string;
  images: ImageSource[];
  locationIcon?: ImageSource;
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
  clockIcon?: ImageSource;
  iconLabels?: string[];
  likeIcon?: ImageSource;
  likedIcon?: ImageSource;
  hoverBorderGradient?: string;

  detailHref?: string;
}
