import React from "react";
import newclockicon from "../../public/newclockicon.svg";
import magic from "../../public/magic.svg";
import Image from "next/image";
import { StaticImageData } from "next/image";

interface NewListingProps {
  title: string;
  icon?: "clock" | "magic" | null;
  className?: string;
}

const icons = {
  clock: newclockicon,
  magic: magic,
};

const NewListing = ({
  title,
  icon = null,
  className = "",
}: NewListingProps) => {
  return (
    <div>
      <div className={`flex items-center gap-2  font-amasis ${className}`}>
        <h2
          className=" text-[32px] font-extrabold  font-amasis reel-text-heading
         text-[#111827] px-4 py-2 rounded-full inline-block mb-1 [text-shadow:_0px_0px_4px_rgb(255_255_255_/_100%)]"
          style={{
            background:
              "linear-gradient(180deg, rgba(237,200,78,0.97) 0%, #ECC440 54%)",
          }}
        >
          {title}
        </h2>

        {icon && <Image src={icons[icon]} alt={icon} className="w-7 h-7" />}
      </div>
    </div>
  );
};

export default NewListing;
