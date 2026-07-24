import React from "react";
import MarqueeCards from "../ui/MarqueeCards";
import sheraton from "../../public/sheraton.svg";
import movenpick from "../../public/movenpick.svg";
import marriott from "../../public/marriott.svg";
import holidayinn from "../../public/holidayinn.svg";
import crownplaza from "../../public/crowneplaza.svg";
import ibis from "../../public/ibishotels.svg";
import sofitel from "../../public/sofitel.svg";
import sebel from "../../public/thesebel.svg";
import meriton from "../../public/meriton.svg";
import novotel from "../../public/novotel.svg";
import fourseasons from "../../public/fourseasons.svg";
import intercontinental from "../../public/intercontinental.svg";
import rydges from "../../public/rydges.svg";
import grandhyatt from "../../public/grandhyatt.svg";
import langham from "../../public/langham.svg";
import atlantis from "../../public/atlantis.svg";
import hilton from "../../public/hilton.svg";
import mantra from "../../public/mantra.svg";
import oaks from "../../public/oaks.svg";
import lemeridien from "../../public/lemeridien.svg";
import pullman from "../../public/pullman.svg";
import mercure from "../../public/mercure.svg";
import yehs from "../../public/yehs.svg";
import theritzcarlton from "../../public/theritzcarlton.svg";

interface HotelLogosProps {
  headingColor?: string;
  pillHeading?: boolean;
}
const HotelLogos = ({
  headingColor = "text-black",
  pillHeading = false,
}: HotelLogosProps) => {
  const franchise = [
    sheraton,
    movenpick,
    marriott,
    holidayinn,
    crownplaza,
    ibis,
    sofitel,
    sebel,
    meriton,
    novotel,
    fourseasons,
    intercontinental,
    rydges,
    grandhyatt,
    langham,
    atlantis,
    hilton,
    mantra,
    oaks,
    lemeridien,
    pullman,
    mercure,
    yehs,
    theritzcarlton,
  ];
  return (
    <div className="max-w-screen-2xl mx-auto px-5 py-5 ">
      {/* <h2 className={`font-poppins font-semibold text-xl mb-1 ${headingColor}`}>
        Hotel Logos
      </h2> */}
      <h2
        className={
          pillHeading
            ? "font-amasis font-extrabold text-[32px] reel-text-heading px-4 py-2 rounded-full inline-block mb-1 [text-shadow:_0px_0px_4px_rgb(255_255_255_/_100%)]"
            : `font-amasis font-semibold text-[32px] mb-1 ${headingColor}
       px-4 py-2 rounded-full inline-block  mb-2 [text-shadow:_0px_0px_4px_rgb(255_255_255_/_100%)]`
        }
        style={
          pillHeading
            ? {
                background:
                  "linear-gradient(180deg, rgba(237,200,78,0.97) 0%, #ECC440 54%)",
              }
            : {
                WebkitTextFillColor: "white",
                WebkitTextStroke: "1.5px #000000",
                background:
                  "linear-gradient(180deg, rgba(237,200,78,0.97) 0%, #ECC440 54%)",
              }
        }
      >
        {" "}
        Hotel Logos
      </h2>
      <MarqueeCards items={franchise} speed="fast" />
    </div>
  );
};

export default HotelLogos;
