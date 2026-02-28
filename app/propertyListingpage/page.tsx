import PropertyListingPage from "@/components/PropertyListing/PropertyListingPage";
import { getPropertyListingPageData } from "@/lib/property-listing-data";

const page = () => {
  const listingPageData = getPropertyListingPageData();

  return (
    <div>
      <PropertyListingPage data={listingPageData} />
    </div>
  );
};

export default page;
