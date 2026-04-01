import Banks from "@/components/Broker/Banks";
import FindYourBroker from "@/components/Broker/FindYourBroker";
import Guidestohelpyoubuysmarter from "@/components/Broker/Guidestohelpyoubuysmarter";
import HeroBroker from "@/components/Broker/HeroBroker";
import LatestHomeLoanNews from "@/components/Broker/LatestHomeLoanNews";
import WhyuseaChoicebroker from "@/components/Broker/WhyuseaChoicebroker";
import React from "react";

const page = () => {
  return (
    <div>
      <HeroBroker />
      <FindYourBroker />
      <Banks />
      <LatestHomeLoanNews />
      <WhyuseaChoicebroker />
      <Guidestohelpyoubuysmarter />
    </div>
  );
};

export default page;
