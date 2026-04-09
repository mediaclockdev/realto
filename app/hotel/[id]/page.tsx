import { notFound } from "next/navigation";
import HotelDetailPage from "@/components/Hotel/HotelDetailPage";
import { getHotelListingById } from "@/lib/hotel/repository";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  const hotel = getHotelListingById(id);

  if (!hotel) {
    notFound();
  }

  return <HotelDetailPage hotel={hotel} />;
}
