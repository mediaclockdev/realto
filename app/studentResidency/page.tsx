import Info from "@/components/StudentResidency/Info";
import PopularCities from "@/components/StudentResidency/PopularCities";
import StudentHero from "@/components/StudentResidency/StudentHero";
import React from "react";
import OffersAndReferrals from "@/components/StudentResidency/OffersAndReferrals";
import OurPartners from "@/components/StudentResidency/OurPartners";
import BookingSteps from "@/components/StudentResidency/BookingSteps";

const page = () => {
  return (
    <div>
      <StudentHero />
      <Info />
      <PopularCities />
      <OffersAndReferrals />
      <OurPartners />
      <BookingSteps />
    </div>
  );
};

export default page;
