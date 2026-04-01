import React from "react";
import Image from "next/image";
import anzbank from "../../public/anzbank.svg";
import aussiebank from "../../public/aussieBank.svg";
import nabbank from "../../public/nabbank.svg";
import mortgagechoicebank from "../../public/mortagagechoicebank.svg";
import stgeorgebank from "../../public/stgeorgebank.svg";
import ramsbank from "../../public/ramsbank.svg";
import athenabank from "../../public/athenabank.svg";
import commonwealthbank from "../../public/commonwealthbank.svg";
import westpacbank from "../../public/westpacbank.svg";

const Banks = () => {
  const bank = [
    anzbank,
    aussiebank,
    nabbank,
    mortgagechoicebank,
    stgeorgebank,
    ramsbank,
    athenabank,
    commonwealthbank,
    westpacbank,
  ];

  return (
    <div className="max-w-screen-2xl mx-auto py-5">
      <div className="marquee-wrapper">
        <div className="marquee-track">
          {[...bank, ...bank, ...bank].map((logo, i) => (
            <div key={i} className="logo-item flex items-center justify-center">
              <Image
                src={logo}
                alt="partner logo"
                width={130}
                height={70}
                className="object-cover opacity-100 transition duration-300"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Banks;
