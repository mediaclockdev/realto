export interface Property {
  id: number;
  name: string;
  location: string;
  price: number;
  rating: number;
  reviews: number;
  img: string;
}

export interface CityTabsProps {
  cities: string[];
  activeCity: string;
  onCityChange: (city: string) => void;
}

export interface PropertyGridProps {
  properties: Property[];
}

export interface PropertyCardProps {
  property: Property;
}
