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
      <div className={`flex items-center gap-2 mb-6 ${className}`}>
        <h2 className="text-3xl font-semibold text-black">{title}</h2>
        {icon && (
          <Image src={icons[icon]} alt={icon} className="w-7 h-7" />
        )}
      </div>
    </div>
  );
};

export default NewListing;