import React from "react";
import HeroSection from "../ui/HeroSection";
import bg from "../../public/heroagentbg.jpg";

const HeroBroker = () => {
  return (
    <div>
      <HeroSection
        image={bg}
        title="Find Your Perfect Loan Broker For You "
        description="Connect with experienced real estate professionals who will guide you through
every step of your property journey."
      />
    </div>
  );
};

export default HeroBroker;
