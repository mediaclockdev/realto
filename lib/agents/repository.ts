import type {
  AgentDetail,
  AgentListQuery,
  AgentListResult,
  AgentSortOption,
  AgentSummary,
} from "@/lib/agents/types";
import type { ListingProperty } from "@/lib/properties/types";
import { getAllProperties } from "@/lib/properties/repository";
import { agentsCatalog } from "./mock-data";

const DEFAULT_PAGE_SIZE = 9;
const AGENTS_API_BASE_URL = process.env.AGENTS_API_BASE_URL;
const USE_MOCK_AGENT_DATA =
  process.env.USE_MOCK_AGENT_DATA !== "false" || !AGENTS_API_BASE_URL;

function toAgentSummary(agent: AgentDetail): AgentSummary {
  return {
    id: agent.id,
    slug: agent.slug,
    name: agent.name,
    title: agent.title,
    agencyName: agent.agencyName,
    agencyLogo: agent.agencyLogo,
    phone: agent.phone,
    email: agent.email,
    location: agent.location,
    licenseNumber: agent.licenseNumber,
    rating: agent.rating,
    reviewCount: agent.reviewCount,
    avatar: agent.avatar,
    backgroundImage: agent.backgroundImage,
    cardVariant: agent.cardVariant,
    accent: agent.accent,
    yearsExperience: agent.yearsExperience,
    propertiesSold: agent.propertiesSold,
    specializations: agent.specializations,
  };
}

async function fetchJson<T>(path: string, params?: Record<string, string>) {
  if (!AGENTS_API_BASE_URL) {
    throw new Error("AGENTS_API_BASE_URL is not configured.");
  }

  const search = params ? new URLSearchParams(params).toString() : "";
  const url = `${AGENTS_API_BASE_URL}${path}${search ? `?${search}` : ""}`;
  const response = await fetch(url, {
    method: "GET",
    headers: { Accept: "application/json" },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch agent data from ${url}`);
  }

  return (await response.json()) as T;
}

function sortAgents(items: AgentSummary[], sort: AgentSortOption) {
  const nextItems = [...items];

  switch (sort) {
    case "Most Experience":
      return nextItems.sort(
        (left, right) => right.yearsExperience - left.yearsExperience,
      );
    case "Most Properties Sold":
      return nextItems.sort(
        (left, right) => right.propertiesSold - left.propertiesSold,
      );
    case "Highest Rated":
    default:
      return nextItems.sort((left, right) => right.rating - left.rating);
  }
}

function filterAgents(items: AgentSummary[], query: AgentListQuery) {
  return items.filter((agent) => {
    const matchesSearch = query.search
      ? `${agent.name} ${agent.title} ${agent.agencyName}`
          .toLowerCase()
          .includes(query.search.toLowerCase())
      : true;
    const matchesSpecialization = query.specialization
      ? agent.specializations.includes(query.specialization)
      : true;
    const matchesRating = query.minRating
      ? agent.rating >= query.minRating
      : true;
    const matchesLocation = query.location
      ? agent.location.toLowerCase().includes(query.location.toLowerCase())
      : true;

    return (
      matchesSearch &&
      matchesSpecialization &&
      matchesRating &&
      matchesLocation
    );
  });
}

export async function getRecommendedAgents(limit = 4): Promise<AgentSummary[]> {
  if (!USE_MOCK_AGENT_DATA) {
    return fetchJson<AgentSummary[]>("/agents/recommended", {
      limit: String(limit),
    });
  }

  return agentsCatalog.slice(0, limit).map(toAgentSummary);
}

export async function getAgents(
  query: AgentListQuery = {},
): Promise<AgentListResult> {
  if (!USE_MOCK_AGENT_DATA) {
    return fetchJson<AgentListResult>("/agents", {
      search: query.search ?? "",
      specialization: query.specialization ?? "",
      minRating: query.minRating ? String(query.minRating) : "",
      location: query.location ?? "",
      sort: query.sort ?? "Highest Rated",
      page: String(query.page ?? 1),
      pageSize: String(query.pageSize ?? DEFAULT_PAGE_SIZE),
    });
  }

  const pageSize = query.pageSize ?? DEFAULT_PAGE_SIZE;
  const currentPage = Math.max(1, query.page ?? 1);
  const filtered = sortAgents(
    filterAgents(agentsCatalog.map(toAgentSummary), query),
    query.sort ?? "Highest Rated",
  );
  const totalItems = filtered.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  const safePage = Math.min(currentPage, totalPages);
  const start = (safePage - 1) * pageSize;

  return {
    items: filtered.slice(start, start + pageSize),
    totalItems,
    totalPages,
    currentPage: safePage,
    pageSize,
  };
}

export async function getAgentByIdOrSlug(
  idOrSlug: string,
): Promise<AgentDetail | null> {
  if (!USE_MOCK_AGENT_DATA) {
    return fetchJson<AgentDetail>(`/agents/${idOrSlug}`);
  }

  return (
    agentsCatalog.find(
      (agent) => agent.id === idOrSlug || agent.slug === idOrSlug,
    ) ?? null
  );
}

export async function getAgentCurrentListings(
  idOrSlug: string,
): Promise<ListingProperty[]> {
  if (!USE_MOCK_AGENT_DATA) {
    return fetchJson<ListingProperty[]>(`/agents/${idOrSlug}/listings/current`);
  }

  const agent = await getAgentByIdOrSlug(idOrSlug);

  if (!agent) {
    return [];
  }

  const properties = getAllProperties();
  return properties.filter((property) =>
    agent.currentListingIds.includes(property.id),
  );
}

export async function getAgentSoldListings(
  idOrSlug: string,
): Promise<ListingProperty[]> {
  if (!USE_MOCK_AGENT_DATA) {
    return fetchJson<ListingProperty[]>(`/agents/${idOrSlug}/listings/sold`);
  }

  const agent = await getAgentByIdOrSlug(idOrSlug);

  if (!agent) {
    return [];
  }

  const properties = getAllProperties();
  return properties.filter((property) => agent.soldListingIds.includes(property.id));
}
