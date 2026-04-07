import React from "react";
import HeroSection from "../ui/HeroSection";
import bg from "../../public/heroagentbg.jpg";

const HeroAgentSection = () => {
  return (
    <div>
      <HeroSection
        image={bg}
        title="Find Your Perfect Agent"
        description="Connect with experienced real estate professionals who will guide you through
every step of your property journey."
        showSearch={false}
      />
    </div>
  );
};

export default HeroAgentSection;
