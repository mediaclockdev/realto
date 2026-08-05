import Link from "next/link";
import ListingCard from "./ListingCard";
import { flatmateListings } from "@/lib/flatmate/data";

export default function ListingsGrid({ mode }: { mode: string }) {
  const filtered =
    mode === "all"
      ? flatmateListings
      : flatmateListings.filter((item) => item.type === mode);

  return (
    <div className="max-w-screen-2xl mx-auto px-5 py-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {filtered.map((listing) => (
        <Link key={listing.id} href={`/flatmate/${listing.id}`} className="block">
          <ListingCard listing={listing} />
        </Link>
      ))}
    </div>
  );
}
