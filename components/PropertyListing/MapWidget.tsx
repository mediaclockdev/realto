import React from "react";

interface MapWidgetProps {
  suburb: string;
}

const MapWidget: React.FC<MapWidgetProps> = ({ suburb }) => {
  // Using OpenStreetMap embed (no API key needed)
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-md border border-gray-100 w-full mt-4 mb-4">
      <div className="relative w-full h-40 sm:h-48">
        <iframe
          title="Property map"
          width="100%"
          height="100%"
          loading="lazy"
          src="https://www.openstreetmap.org/export/embed.html?bbox=151.0%2C-34.0%2C151.2%2C-33.8&layer=mapnik"
          className="border-0 w-full h-full"
        />
      </div>
      <div className="px-3 py-2 bg-white">
        <p className="text-sm font-semibold text-gray-800">{suburb}</p>
      </div>
    </div>
  );
};

export default MapWidget;
