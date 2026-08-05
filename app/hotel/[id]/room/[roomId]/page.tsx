import { notFound } from "next/navigation";
import HotelRoomDetailPage from "@/components/Hotel/HotelRoomDetailPage";
import { getHotelRoomById } from "@/lib/hotel/repository";

type PageProps = {
  params: Promise<{ id: string; roomId: string }>;
};

export default async function Page({ params }: PageProps) {
  const { id, roomId } = await params;
  const result = getHotelRoomById(id, roomId);

  if (!result) {
    notFound();
  }

  return <HotelRoomDetailPage hotel={result.hotel} room={result.room} />;
}
