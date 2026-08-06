import { notFound } from "next/navigation";
import { getCategoryBySlug } from "@/lib/commercial/categories";
import { commercialListings } from "@/lib/commercial/data";
import PropertyTypeListingPage from "@/components/Commercial/PropertyTypeListingPage";

type PageProps = {
  params: Promise<{ slug: string }>;
};

const page = async ({ params }: PageProps) => {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  const listings = category.propertyType
    ? commercialListings.filter(
        (listing) => listing.propertyType === category.propertyType,
      )
    : [];

  return <PropertyTypeListingPage category={category} listings={listings} />;
};

export default page;
