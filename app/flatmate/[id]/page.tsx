import { notFound } from "next/navigation";
import FlatmateDetailPage from "@/components/Flatmate/FlatmateDetailPage";
import FlatDetailPage from "@/components/Flatmate/FlatDetailPage";
import { getFlatmateListingById, getRelatedFlatmateListings } from "@/lib/flatmate/data";

type PageProps = {
  params: Promise<{ id: string }>;
};

const page = async ({ params }: PageProps) => {
  const { id } = await params;
  const listing = getFlatmateListingById(Number(id));

  if (!listing) {
    notFound();
  }

  const relatedListings = getRelatedFlatmateListings(listing.id);

  return listing.type === "flatmate" ? (
    <FlatmateDetailPage listing={listing} relatedListings={relatedListings} />
  ) : (
    <FlatDetailPage listing={listing} relatedListings={relatedListings} />
  );
};

export default page;
