import React from "react";
import { Clock } from "lucide-react";

interface NewListingProps {
  title: string;
  showIcon?: boolean;
  className?: string;
}

const NewListing = ({
  title,
  showIcon = true,
  className = "",
}: NewListingProps) => {
  return (
    <div>
      <div className={`flex items-center gap-2 mb-6 ${className}`}>
        <h2 className="text-3xl font-bold text-gray-900">{title}</h2>
        {showIcon && <Clock className="w-7 h-7 text-gray-700" />}
      </div>
    </div>
  );
};

export default NewListing;
