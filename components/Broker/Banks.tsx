import React from "react";
import Image from "next/image";
import anzbank from "../../public/anzbank.svg";
import aussiebank from "../../public/aussieBank.svg";
import nabbank from "../../public/nabbank.svg";
import macquirebank from "../../public/macquirebank.svg";
import mortgagechoicebank from "../../public/mortagagechoicebank.svg";
import stgeorgebank from "../../public/stgeorgebank.svg";
import ramsbank from "../../public/ramsbank.svg";
import athenabank from "../../public/athenabank.svg";
import commonwealthbank from "../../public/commonwealthbank.svg";
import westpacbank from "../../public/westpacbank.svg";
import amobank from "../../public/amobank.svg";
import austraibank from "../../public/austrailabank.svg";
import afghomeloans from "../../public/afghomeloans.svg";
import finspobank from "../../public/finspobank.svg";
import loanmarket from "../../public/loanmarket.svg";
import mortgagebroker from "../../public/mortgagebrokermelbourne.svg";
import adelaidehills from "../../public/adelaidehills.svg";
import brighten from "../../public/brightenbank.svg";
import darwinmortgage from "../../public/darwinmortgage.svg";
import tassie from "../../public/tassiehomeloans.svg";

interface BanksProps {
  heading?: string;
  pillHeading?: boolean;
}

const Banks = ({ heading = "Banks", pillHeading = false }: BanksProps) => {
  const bank = [
    { name: "Aussie", icon: aussiebank, interest: "6.94% p.a.%" },
    { name: "Nab bank", icon: nabbank, interest: "6.94% p.a.%" },
    {
      name: "Mortgage Choice",
      icon: mortgagechoicebank,
      interest: "6.94% p.a.%",
    },
    {
      name: "Australian Mortgage Options",
      icon: amobank,
      interest: "6.94% p.a.%",
    },
    { name: "ANZ bank", icon: anzbank, interest: "6.94% p.a.%" },
    { name: "St George bank", icon: stgeorgebank, interest: "6.94% p.a.%" },
    { name: "RAMS", icon: ramsbank, interest: "6.94% p.a.%" },
    { name: "ATHENA", icon: athenabank, interest: "6.94% p.a.%" },
    {
      name: "Commonwealth bank",
      icon: commonwealthbank,
      interest: "6.94% p.a.%",
    },
    { name: "Westpac bank", icon: westpacbank, interest: "6.94% p.a.%" },
    { name: "Macquire bank", icon: macquirebank, interest: "6.94% p.a.%" },
    { name: "Australia Bank", icon: austraibank, interest: "6.94% p.a.%" },
    { name: "Afghome Loans", icon: afghomeloans, interest: "6.94% p.a.%" },
    { name: "Finspon", icon: finspobank, interest: "6.94% p.a.%" },
    { name: "Loan Market", icon: loanmarket, interest: "6.94% p.a.%" },
    {
      name: "Mortgage Broker Melbourne",
      icon: mortgagebroker,
      interest: "6.94% p.a.%",
    },
    { name: "Adelaide Hills", icon: adelaidehills, interest: "6.94% p.a.%" },
    { name: "Brighten Bank", icon: brighten, interest: "6.94% p.a.%" },
    {
      name: "Darwin Mortgage Broker",
      icon: darwinmortgage,
      interest: "6.94% p.a.%",
    },
    { name: "Tassie Home Loans", icon: tassie, interest: "6.94% p.a.%" },
  ];

  return (
    <div className="max-w-screen-2xl mx-auto px-5 py-5 overflow-hidden">
      <h2
        className={`font-poppins font-semibold text-xl mb-1 text-black ${pillHeading ? "w-fit rounded-full px-4 py-2" : ""}`}
        style={
          pillHeading
            ? {
                background:
                  "linear-gradient(180deg, rgba(237,200,78,0.97) 0%, #ECC440 54%)",
              }
            : undefined
        }
      >
        {heading}
      </h2>
      <div className="marquee-wrapper">
        <div
          className="marquee-track"
          style={{ animationDuration: `${bank.length * 3}s` }}
        >
          {[...bank, ...bank, ...bank].map((logo, i) => (
            <div
              key={i}
              className="logo-item flex flex-col items-center justify-between gap-3 px-6"
            >
              <div className="flex items-center justify-center w-[160px] h-[80px] relative">
                <Image src={logo.icon} alt={logo.name} fill className="" />
              </div>

              <p className="text-sm text-black font-poppins font-normal whitespace-nowrap text-center">
                {logo.name}&nbsp;
                <span className="font-bold text-black">{logo.interest}</span>
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Banks;
