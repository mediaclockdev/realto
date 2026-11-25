// Homepage content an admin curates. `extras` = extra text fields on each item; `image` = label of its image (default "Image");
// `multiImage` = items can hold several images.
// Listings, agents and bookings are managed in their own admin screens, not here.
export const categoryGroups = [
  { label: "Homepage Categories", slug: "homepage", multiImage: true, extras: ["Description"] },
  { label: "Language", slug: "language", image: "Flag", extras: ["Country"] },
  { label: "Real Estate Agency", slug: "agency", image: "Logo", extras: [] },
  { label: "Home Loan Broker", slug: "broker", image: "Logo", extras: ["Interest rate"] },
  { label: "Hotel", slug: "hotel", image: "Logo", extras: [] },
  { label: "Student Residency", slug: "studentResidency", image: "Logo", extras: [] },
  { label: "Popular Cities", slug: "cities", extras: ["Starting price"] },
  { label: "Commercial Properties", slug: "commercial", image: "Logo", extras: [] },
] as const;
