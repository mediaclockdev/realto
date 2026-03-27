import Link from "next/link";
import HeroAgentSection from "./HeroAgentSection";
import Notsure from "./Notsure";
import AgentSummaryCard from "./AgentSummaryCard";
import type {
  AgentListQuery,
  AgentListResult,
  AgentSpecialization,
} from "@/lib/agents/types";

interface AgentsDirectoryPageProps {
  result: AgentListResult;
  query: Required<Pick<AgentListQuery, "search" | "location" | "sort">> & {
    specialization: AgentSpecialization | "";
    minRating: number;
  };
}

const specializations: AgentSpecialization[] = [
  "Residential",
  "Commercial",
  "Luxury Properties",
  "Rentals",
  "Investment",
];

function buildQueryString(
  query: AgentsDirectoryPageProps["query"],
  page: number,
) {
  const params = new URLSearchParams();

  if (query.search.trim()) params.set("search", query.search.trim());
  if (query.specialization) params.set("specialization", query.specialization);
  if (query.minRating > 0) params.set("minRating", String(query.minRating));
  if (query.location.trim()) params.set("location", query.location.trim());
  if (query.sort !== "Highest Rated") params.set("sort", query.sort);
  if (page > 1) params.set("page", String(page));

  return params.toString();
}

export default function AgentsDirectoryPage({
  result,
  query,
}: AgentsDirectoryPageProps) {
  return (
    <div className="min-h-screen bg-white">
      <HeroAgentSection />

      <div className="max-w-screen-2xl mx-auto px-5 py-6">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[260px_1fr]">
          <form
            action="/agents"
            className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm h-fit lg:sticky lg:top-6"
          >
            <h2 className="font-poppins text-[28px] font-semibold text-[#1f2937]">
              Filter Agents
            </h2>

            <div className="mt-6 space-y-6">
              <div>
                <label className="mb-2 block text-sm font-semibold text-[#374151]">
                  Search by Name
                </label>
                <input
                  name="search"
                  defaultValue={query.search}
                  placeholder="Agent name..."
                  className="w-full rounded-lg border border-gray-200 bg-[#f8fafc] px-4 py-3 text-sm text-gray-700 outline-none"
                />
              </div>

              <div>
                <p className="mb-3 text-sm font-semibold text-[#374151]">
                  Specialization
                </p>
                <div className="space-y-2.5 text-sm text-[#4b5563]">
                  {specializations.map((item) => (
                    <label key={item} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        name="specialization"
                        value={item}
                        defaultChecked={query.specialization === item}
                      />
                      <span>{item}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-[#374151]">
                  Minimum Rating
                </label>
                <div className="space-y-2 text-sm text-[#4b5563]">
                  {[5, 4, 3].map((rating) => (
                    <label key={rating} className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="minRating"
                        value={rating}
                        defaultChecked={query.minRating === rating}
                      />
                      <span>{rating}+ Stars</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-[#374151]">
                  Location
                </label>
                <input
                  name="location"
                  defaultValue={query.location}
                  placeholder="City or Post code"
                  className="w-full rounded-lg border border-gray-200 bg-[#f8fafc] px-4 py-3 text-sm text-gray-700 outline-none"
                />
              </div>

              <input type="hidden" name="sort" value={query.sort} />

              <button
                type="submit"
                className="w-full rounded-xl bg-[#0284C7] px-4 py-3 text-sm font-semibold text-white"
              >
                Apply Filters
              </button>
              <Link href="/agents" className="block w-full text-center text-sm font-medium text-[#4b5563]">
                Clear All Filters
              </Link>
            </div>
          </form>

          <section>
            <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-end">
              <div>
                <h1 className="font-poppins text-[34px] font-semibold text-[#1f2937]">
                  {result.totalItems} Agents Found
                </h1>
                <p className="mt-1 text-lg text-[#6b7280]">
                  Showing results based on your criteria
                </p>
              </div>

              <div className="flex items-center gap-3 self-start md:self-auto">
                <span className="text-sm font-medium text-[#374151]">Sort by:</span>
                <form action="/agents">
                  <input type="hidden" name="search" value={query.search} />
                  <input type="hidden" name="location" value={query.location} />
                  <input
                    type="hidden"
                    name="specialization"
                    value={query.specialization}
                  />
                  <input
                    type="hidden"
                    name="minRating"
                    value={query.minRating > 0 ? String(query.minRating) : ""}
                  />
                  <select
                    name="sort"
                    defaultValue={query.sort}
                    className="rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm text-[#374151] shadow-sm outline-none"
                  >
                    <option value="Highest Rated">Highest Rated</option>
                    <option value="Most Experience">Most Experience</option>
                    <option value="Most Properties Sold">
                      Most Properties Sold
                    </option>
                  </select>
                  <button type="submit" className="sr-only">
                    Apply sort
                  </button>
                </form>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
              {result.items.map((agent) => (
                <AgentSummaryCard key={agent.id} agent={agent} />
              ))}
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
              {Array.from({ length: result.totalPages }, (_, index) => index + 1)
                .slice(0, 6)
                .map((pageNumber) => {
                  const href = buildQueryString(query, pageNumber);
                  const isActive = pageNumber === result.currentPage;

                  return (
                    <Link
                      key={pageNumber}
                      href={href ? `/agents?${href}` : "/agents"}
                      className={`flex h-10 w-10 items-center justify-center rounded-lg border text-sm font-medium ${
                        isActive
                          ? "border-[#0284C7] bg-[#0284C7] text-white"
                          : "border-gray-200 bg-white text-[#4b5563]"
                      }`}
                    >
                      {pageNumber}
                    </Link>
                  );
                })}
              {result.totalPages > 6 ? (
                <span className="px-2 text-[#6b7280]">...</span>
              ) : null}
            </div>
          </section>
        </div>
      </div>

      <Notsure />
    </div>
  );
}
