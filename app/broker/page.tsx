import Banks from "@/components/Broker/Banks";
import BrokerInYourArea from "@/components/Broker/BrokerInYourArea";
import FindYourBroker from "@/components/Broker/FindYourBroker";
import Guidestohelpyoubuysmarter from "@/components/Broker/Guidestohelpyoubuysmarter";
import HeroBroker from "@/components/Broker/HeroBroker";
import LatestHomeLoanNews from "@/components/Broker/LatestHomeLoanNews";
import PreApproval from "@/components/Broker/PreApproval";
import WhyuseaChoicebroker from "@/components/Broker/WhyuseaChoicebroker";
import React from "react";

const page = () => {
  return (
    <div>
      <HeroBroker />
      <FindYourBroker />
      <Banks />
      <LatestHomeLoanNews />
      <BrokerInYourArea />
      <WhyuseaChoicebroker />
      <Guidestohelpyoubuysmarter />
      <PreApproval />
    </div>
  );
};

export default page;
