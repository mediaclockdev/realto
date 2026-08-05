import { notFound } from "next/navigation";
import CommercialDetailPage from "@/components/Commercial/CommercialDetailPage";
import {
  getCommercialListingById,
  getRelatedCommercialListings,
} from "@/lib/commercial/data";

type PageProps = {
  params: Promise<{ id: string }>;
};

const page = async ({ params }: PageProps) => {
  const { id } = await params;
  const listing = getCommercialListingById(id);

  if (!listing) {
    notFound();
  }

  const relatedListings = getRelatedCommercialListings(listing.id);

  return <CommercialDetailPage listing={listing} relatedListings={relatedListings} />;
};

export default page;
