import { notFound } from "next/navigation";
import PropertyDetailPage from "@/components/PropertyListing/PropertyDetailPage";
import { getPropertyListingMeta } from "@/lib/listings/repository";
import {
  getPropertyById,
  getRelatedProperties,
} from "@/lib/properties/repository";
import type { ListingVariant } from "@/lib/listings/types";

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
