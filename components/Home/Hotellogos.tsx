import React from "react";
import MarqueeCards from "../ui/MarqueeCards";
import sheraton from "../../public/sheraton.svg"
import movenpick from "../../public/movenpick.svg"
import marriott from "../../public/marriott.svg"
import holidayinn from "../../public/holidayinn.svg"
import crownplaza from "../../public/crowneplaza.svg"
import ibis from "../../public/ibishotels.svg"
import sofitel from "../../public/sofitel.svg"
import sebel from "../../public/thesebel.svg"
import meriton from "../../public/meriton.svg"
import novotel from "../../public/novotel.svg"
import fourseasons from "../../public/fourseasons.svg"
import intercontinental from "../../public/intercontinental.svg"
import rydges from "../../public/rydges.svg"
import grandhyatt from "../../public/grandhyatt.svg"
import langham from "../../public/langham.svg"
import atlantis from "../../public/atlantis.svg"
import hilton from "../../public/hilton.svg"
import mantra from "../../public/mantra.svg"
import oaks from "../../public/oaks.svg"
import lemeridien from "../../public/lemeridien.svg"
import pullman from "../../public/pullman.svg"
import mercure from "../../public/mercure.svg"
import yehs from "../../public/yehs.svg"
import theritzcarlton from "../../public/theritzcarlton.svg"



const HotelLogos = () => {
  const franchise = [
    // commercialRealEstate,
    // knightfrank,
    // x,
    // goodman,
    // cbre,
    // jll,
    // colliers,
    // raywhite,
    // cushman,
    // belle,
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
      <h2 className="font-poppins font-semibold text-xl  text-black mb-1">
        Hotel Logos
      </h2>

      <MarqueeCards items={franchise} speed="fast" />
    </div>
  );
};

export default HotelLogos;
