import PropertyListingPage from "@/components/PropertyListing/PropertyListingPage";
import { getPropertyListingPageData } from "@/lib/property-listing-data";
import type {
  ListingSortOption,
  PropertyListingQueryState,
} from "@/components/PropertyListing/types";

const validSortOptions: ListingSortOption[] = [
  "Relevant listings",
  "Newest first",
  "Price (low to high)",
  "Price (high to low)",
];

type PageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

function readParam(
  params: Record<string, string | string[] | undefined>,
  key: string,
) {
  const value = params[key];

  return Array.isArray(value) ? value[0] : value;
}

const page = async ({ searchParams }: PageProps) => {
  const resolvedSearchParams = (await searchParams) ?? {};
  const pageParam = Number(readParam(resolvedSearchParams, "page") ?? "1");
  const sortParam = readParam(resolvedSearchParams, "sort");
  const search = readParam(resolvedSearchParams, "search") ?? "";
  const viewParam = readParam(resolvedSearchParams, "view");
  const query: PropertyListingQueryState = {
    page: Number.isFinite(pageParam) && pageParam > 0 ? pageParam : 1,
    search,
    sort: validSortOptions.includes(sortParam as ListingSortOption)
      ? (sortParam as ListingSortOption)
      : "Relevant listings",
    view: viewParam === "map" ? "map" : "grid",
  };
  const listingPageData = getPropertyListingPageData(query);

  return (
    <div>
      <PropertyListingPage data={listingPageData} query={query} />
    </div>
  );
};

export default page;
