import type { ImageSource } from "@/lib/shared/types";

export type AgentCardVariant = "angled" | "framed";
export type AgentCardAccent = "red" | "gold" | "blue";
export type AgentSortOption =
  | "Highest Rated"
  | "Most Experience"
  | "Most Properties Sold";
export type AgentSpecialization =
  | "Residential"
  | "Commercial"
  | "Luxury Properties"
  | "Rentals"
  | "Investment";

export interface AgentSummary {
  id: string;
  slug: string;
  name: string;
  title: string;
  agencyName: string;
  agencyLogo: ImageSource;
  phone: string;
  email: string;
  location: string;
  licenseNumber: string;
  rating: number;
  reviewCount: number;
  avatar: ImageSource;
  backgroundImage: ImageSource;
  cardVariant: AgentCardVariant;
  accent: AgentCardAccent;
  yearsExperience: number;
  propertiesSold: number;
  specializations: AgentSpecialization[];
}

export interface AgentLanguage {
  name: string;
  proficiency: string;
}

export interface AgentSocialLinks {
  whatsapp?: string;
  instagram?: string;
  facebook?: string;
  sms?: string;
}

export interface AgentPerformance {
  avgSalePrice: string;
  avgDaysOnMarket: string;
  listToSaleRatio: string;
  responseTime: string;
}

export interface AgentDetail extends AgentSummary {
  officeAddress: string;
  agencyPhone: string;
  bio: string;
  totalSalesValue: string;
  clientSatisfaction: string;
  serviceAreas: string[];
  languages: AgentLanguage[];
  performance: AgentPerformance;
  socialLinks: AgentSocialLinks;
  certifications: string[];
  careerHighlights: string[];
  currentListingIds: string[];
  soldListingIds: string[];
}

export interface AgentListQuery {
  search?: string;
  specialization?: AgentSpecialization | "";
  minRating?: number;
  location?: string;
  page?: number;
  pageSize?: number;
  sort?: AgentSortOption;
}

export interface AgentListResult {
  items: AgentSummary[];
  totalItems: number;
  totalPages: number;
  currentPage: number;
  pageSize: number;
}
