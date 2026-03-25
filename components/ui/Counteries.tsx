import Image from "next/image";
import React, { useState } from "react";
import sa from "../../public/sa.svg";
import qld from "../../public/qld.svg";
import act from "../../public/act.svg";
import vic from "../../public/vic.svg";
import nsw from "../../public/nsw.svg";
import wa from "../../public/wa.svg";
import tas from "../../public/tas.svg";
import nt from "../../public/nt.svg";

const Counteries = () => {
  const [selected, setSelected] = useState(2);

  const country = [sa, qld, act, vic, nsw, wa, tas, nt];

  return (
    <div className="flex gap-3 overflow-x-auto scrollbar-hide">
      {country.map((item, idx) => (
        <div
          key={idx}
          onClick={() => setSelected(idx)}
          className={` flex items-center rounded-lg cursor-pointer transition-all
            ${selected === idx}`}
        >
          <Image
            src={item}
            alt={`country-${idx}`}
            width={90}
            height={60}
            className="object-contain"
          />
        </div>
      ))}
    </div>
  );
};

export default Counteries;
