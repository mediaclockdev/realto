import AgentsDirectoryPage from "@/components/Agent/AgentsDirectoryPage";
import { getAgents } from "@/lib/agents/repository";
import type {
  AgentListQuery,
  AgentSortOption,
  AgentSpecialization,
} from "@/lib/agents/types";

type PageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

const sortOptions: AgentSortOption[] = [
  "Highest Rated",
  "Most Experience",
  "Most Properties Sold",
];

function readParam(
  params: Record<string, string | string[] | undefined>,
  key: string,
) {
  const value = params[key];
  return Array.isArray(value) ? value[0] : value;
}

export default async function Page({ searchParams }: PageProps) {
  const resolvedSearchParams = (await searchParams) ?? {};
  const pageParam = Number(readParam(resolvedSearchParams, "page") ?? "1");
  const sortParam = readParam(resolvedSearchParams, "sort");
  const specialization =
    (readParam(
      resolvedSearchParams,
      "specialization",
    ) as AgentSpecialization | "") ?? "";
  const minRating = Number(readParam(resolvedSearchParams, "minRating") ?? "0");
  const query: AgentListQuery = {
    search: readParam(resolvedSearchParams, "search") ?? "",
    location: readParam(resolvedSearchParams, "location") ?? "",
    specialization,
    minRating: Number.isFinite(minRating) ? minRating : 0,
    page: Number.isFinite(pageParam) && pageParam > 0 ? pageParam : 1,
    sort: sortOptions.includes(sortParam as AgentSortOption)
      ? (sortParam as AgentSortOption)
      : "Highest Rated",
  };

  const result = await getAgents(query);

  return (
    <AgentsDirectoryPage
      result={result}
      query={{
        search: query.search ?? "",
        location: query.location ?? "",
        specialization: query.specialization ?? "",
        minRating: query.minRating ?? 0,
        sort: query.sort ?? "Highest Rated",
      }}
    />
  );
}
