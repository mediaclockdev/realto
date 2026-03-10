import Image from "next/image";
import { Heart } from "lucide-react";

export default function ListingCard({ listing }: any) {
  return (
    <div className=" rounded-2xl  overflow-hidden w-full">


      <div className="relative h-[220px] w-full">
        <Image
          src={listing.img}
          alt={listing.title}
          fill
          className="object-cover "
        />


        <div className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-md cursor-pointer">
          <Heart size={18} className="text-gray-500" />
        </div>
      </div>


      <div className="p-5 space-y-2 bg-white">


        <div className="flex justify-between items-center">
          <h3 className="text-xl font-semibold text-black">
            {listing.title}
          </h3>

          <p className="text-gray-700 text-[18px] font-medium">
            {listing.price}
          </p>
        </div>


        <p className="text-gray-600 text-[16px]">
          {listing.subtitle}
        </p>


        <p className="text-green-500 text-[15px] font-medium">
          Available now
        </p>


        <p className="text-gray-500 text-[14px]">
          6 months stay
        </p>

      </div>
    </div>
  );
}