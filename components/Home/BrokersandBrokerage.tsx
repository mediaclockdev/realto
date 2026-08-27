import React from "react";
import Banks from "../Broker/Banks";
import heading from "@/public/homepageheadingicons/homeloanbroker.svg";

const BrokersandBrokerage = () => {
  return (
    <div className="max-w-screen-2xl mx-auto">
      <Banks headingImage={heading} />
    </div>
  );
};

export default BrokersandBrokerage;
