import HotelMapPage from "@/components/Hotel/HotelMapPage";
import { getHotelListings } from "@/lib/hotel/repository";

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

export default async function Page({ searchParams }: PageProps) {
  const resolvedSearchParams = (await searchParams) ?? {};
  const selectedHotelId = readParam(resolvedSearchParams, "id");

  return (
    <HotelMapPage
      title="Hotel booking map"
      listings={getHotelListings()}
      selectedHotelId={selectedHotelId}
    />
  );
}
