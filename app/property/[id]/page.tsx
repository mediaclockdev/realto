import { notFound } from "next/navigation";
import PropertyDetailPage from "@/components/PropertyListing/PropertyDetailPage";
import {
  getPropertyById,
  getPropertyListingMeta,
  getRelatedProperties,
} from "@/lib/property-listing-data";
import type { ListingVariant } from "@/components/PropertyListing/types";

type PageProps = {
  params: Promise<{ id: string }>;
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

const page = async ({ params, searchParams }: PageProps) => {
  const { id } = await params;
  const resolvedSearchParams = (await searchParams) ?? {};
  const listingVariant =
    resolvedSearchParams.listingVariant === "rent" ? "rent" : "buy";
  const property = getPropertyById(id);

  if (!property) {
    notFound();
  }

  const relatedProperties = getRelatedProperties(id);
  const listingMeta = getPropertyListingMeta(listingVariant as ListingVariant);

  return (
    <PropertyDetailPage
      property={property}
      relatedProperties={relatedProperties}
      listingMeta={listingMeta}
    />
  );
};

export default page;
