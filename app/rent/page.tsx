import PropertyListingPage from "@/components/PropertyListing/PropertyListingPage";
import { getPropertyListingPageData } from "@/lib/listings/repository";
import { parsePropertyListingQuery } from "@/lib/listings/query";

type PageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

const page = async ({ searchParams }: PageProps) => {
  const resolvedSearchParams = (await searchParams) ?? {};
  const query = parsePropertyListingQuery(resolvedSearchParams);
  const listingPageData = getPropertyListingPageData({
    ...query,
    listingVariant: "rent",
  });

  return (
    <div>
      <PropertyListingPage data={listingPageData} query={query} />
    </div>
  );
};

export default page;
