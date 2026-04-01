import Banks from "@/components/Broker/Banks";
import HeroBroker from "@/components/Broker/HeroBroker";
import LatestHomeLoanNews from "@/components/Broker/LatestHomeLoanNews";
import WhyuseaChoicebroker from "@/components/Broker/WhyuseaChoicebroker";
import React from "react";

const page = () => {
  return (
    <div>
      <HeroBroker />
      <Banks />
      <LatestHomeLoanNews />
      <WhyuseaChoicebroker />
    </div>
  );
};

export default page;
