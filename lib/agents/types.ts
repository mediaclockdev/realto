import type { ImageSource } from "@/lib/shared/types";

export interface RecommendedAgent {
  id: string;
  name: string;
  phone: string;
  email: string;
  location: string;
  licenseNumber: string;
  rating: number;
  reviewCount: number;
  avatar: ImageSource;
  bgimg: ImageSource;
  cardVariant?: "angled" | "framed";
}
