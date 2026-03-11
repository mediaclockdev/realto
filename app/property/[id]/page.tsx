import { notFound } from "next/navigation";
import PropertyDetailPage from "@/components/PropertyListing/PropertyDetailPage";
import {
  getPropertyById,
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

  return (
    <PropertyDetailPage
      property={property}
      relatedProperties={relatedProperties}
    />
  );
};

export default page;
