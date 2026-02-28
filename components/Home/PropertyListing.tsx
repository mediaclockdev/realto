"use client";
import React from "react";
import NewListing from "./NewListing";
import { PropertySlider, PropertyData } from "./PropertySlider";
import house from "../../public/propertyhouse.svg";
import elder from "../../public/elderrealestate.svg";
import ana from "../../public/anajonesagent.svg";

export default function PropertyListing() {
  const newlyListedProperties: PropertyData[] = [
    {
      id: "1",
      images: [house, "/property1-alt.jpg"],
      location: "Austin, Australia",
      size: "8,235sqft",
      date: "12-02-2026",
      time: "10:00AM",
      priceRange: "$1,00,000-$2,00,000",
      propertyType: "Apartment",
      agentName: "Anna Johns",
      agentCompany: elder,
      agentLocation: "Austin, Australia",
      agentPhone: "+9999999999",
      agentEmail: "exampleemail.com",
      agentImage: ana,
      iconImages: ["/bath.png", "/car.jpg", "/bedroom.jpg"],
    },
    {
      id: "2",
      images: [house, "/property1-alt.jpg"],
      location: "Austin, Australia",
      size: "8,235sqft",
      date: "12-02-2026",
      time: "10:00AM",
      priceRange: "$1,00,000-$2,00,000",
      propertyType: "Apartment",
      agentName: "Anna Johns",
      agentCompany: elder,
      agentLocation: "Austin, Australia",
      agentPhone: "+9999999999",
      agentEmail: "exampleemail.com",
      agentImage: ana,
      iconImages: ["/bath.png", "/car.jpg", "/bedroom.jpg"],
    },
    {
      id: "3",
      images: [house, "/property1-alt.jpg"],
      location: "Austin, Australia",
      size: "8,235sqft",
      date: "12-02-2026",
      time: "10:00AM",
      priceRange: "$1,00,000-$2,00,000",
      propertyType: "Apartment",
      agentName: "Anna Johns",
      agentCompany: elder,
      agentLocation: "Austin, Australia",
      agentPhone: "+9999999999",
      agentEmail: "exampleemail.com",
      agentImage: ana,
      iconImages: ["/bath.png", "/car.jpg", "/bedroom.jpg"],
    },
    {
      id: "4",
      images: [house, "/property1-alt.jpg"],
      location: "Austin, Australia",
      size: "8,235sqft",
      date: "12-02-2026",
      time: "10:00AM",
      priceRange: "$1,00,000-$2,00,000",
      propertyType: "Apartment",
      agentName: "Anna Johns",
      agentCompany: elder,
      agentLocation: "Austin, Australia",
      agentPhone: "+9999999999",
      agentEmail: "exampleemail.com",
      agentImage: ana,
      iconImages: ["/bath.png", "/car.jpg", "/bedroom.jpg"],
    },
    {
      id: "5",
      images: [house, "/property1-alt.jpg"],
      location: "Austin, Australia",
      size: "8,235sqft",
      date: "12-02-2026",
      time: "10:00AM",
      priceRange: "$1,00,000-$2,00,000",
      propertyType: "Apartment",
      agentName: "Anna Johns",
      agentCompany: elder,
      agentLocation: "Austin, Australia",
      agentPhone: "+9999999999",
      agentEmail: "exampleemail.com",
      agentImage: ana,
      iconImages: ["/bath.png", "/car.jpg", "/bedroom.jpg"],
    },
  ];

  const handlePropertyClick = (property: PropertyData) => {
    console.log("Property clicked:", property);
    // Handle navigation or modal opening
  };

  return (
    <div className="max-w-screen-2xl mx-auto  py-6">
      <div className="px-5">
        {/* Newly Listed Section */}
        <NewListing title="Newly Listed" />
        <PropertySlider
          properties={newlyListedProperties}
          onPropertyClick={handlePropertyClick}
        />

        {/* You can reuse the same components for other sections */}
        <div className="mt-16">
          <NewListing title="Trending" showIcon={false} />
          <PropertySlider
            properties={newlyListedProperties}
            onPropertyClick={handlePropertyClick}
          />
        </div>
      </div>
    </div>
  );
}
