import type { ImageSource } from "@/lib/shared/types";

export interface ListingProperty {
  id: string;
  images: ImageSource[];
  location: string;
  locationIcon?: ImageSource;
  size: string;
  date: string;
  dateicon?: ImageSource[];
  time: string;
  priceRange: string;
  propertyType: string;
  agentName: string;
  agentCompany: ImageSource;
  agentLocation: string;
  agentPhone: string;
  agentEmail: string;
  agentCompanyName: string;
  agentImage: ImageSource;
  agentImageCard: ImageSource;
  buyiconImages?: ImageSource[];
  renticonImages?: ImageSource[];
  clockIcon?: ImageSource;
  iconLabels?: string[];
  likeIcon?: ImageSource;
  likedIcon?: ImageSource;
  hoverBorderGradient?: string;

  thumbnail: ImageSource[];
  socials: ImageSource[];
  flags: ImageSource[];
}
