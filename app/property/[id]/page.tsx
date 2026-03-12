import { notFound } from "next/navigation";
import PropertyDetailPage from "@/components/PropertyListing/PropertyDetailPage";
import {
  getPropertyById,
  getPropertyListingMeta,
  getRelatedProperties,
} from "@/lib/property-listing-data";

type PageProps = {
  params: Promise<{ id: string }>;
};

const page = async ({ params }: PageProps) => {
  const { id } = await params;
  const property = getPropertyById(id);

  if (!property) {
    notFound();
  }

  const relatedProperties = getRelatedProperties(id);
  const listingMeta = getPropertyListingMeta();

  return (
    <PropertyDetailPage
      property={property}
      relatedProperties={relatedProperties}
      listingMeta={listingMeta}
    />
  );
};

export default page;
