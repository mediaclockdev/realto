"use client";
import Image from "next/image";
import React, { useRef } from "react";
import broker from "../../public/brokerchoiceimg.svg";
import FindYourBroker from "./FindYourBroker";

const WhyuseaChoicebroker = () => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  return (
    <div className="max-w-screen-2xl mx-auto px-5 py-5 space-y-4">
      <div>
        <h2 className="text-2xl font-semibold text-black font-poppins">
          Why use a Choice broker?
        </h2>
      </div>
      <div className="flex flex-col lg:flex-row items-center gap-6 lg:gap-12 justify-between ">
        <div>
          <Image src={broker} alt="Broker Choice" className="" />
        </div>
        <div className="space-y-7 max-w-[667px]">
          <div className="space-y-5">
            <p className="font-poppins font-semibold text-lg lg:text-2xl text-black text-center">
              The experts for over 30 years
            </p>
            <p className="font-poppins font-medium text-base lg:text-xl text-black">
              Our brokers has been around for over 30 years. Our brokers are by
              your side to help maximise your chances, your money and your loan
              — before and after you settle.
            </p>
          </div>
          <div className="space-y-5">
            <p className="font-poppins font-semibold text-lg lg:text-2xl text-black text-center">
              Maximise your home loan choices
            </p>
            <p className="font-poppins font-medium text-base lg:text-xl text-black">
              Our brokers work to your budget, your goals and in your best
              interests. They take a big load off your shoulders and set you up
              for success.
            </p>
          </div>
          <div className="space-y-5">
            <p className="font-poppins font-semibold text-lg lg:text-2xl text-black text-center">
              We don’t charge to find the right loan
            </p>
            <p className="font-poppins font-medium text-base lg:text-xl text-black">
              Your broker is paid by the lender once the loan settles. In
              some limited circumstances your broker may charge a fee, which
              they discuss with you before proceeding.
            </p>
          </div>
          <div className="bg-[#CB9E33] border border-[#E2E8F0] w-full lg:w-1/2 mx-auto text-center">
            <button
              onClick={() => dialogRef.current?.showModal()}
              className="text-white font-poppins font-semibold text-xl px-10 py-2 cursor-pointer"
            >
              Find Your Broker
            </button>
          </div>
        </div>
      </div>

      <dialog
        ref={dialogRef}
        onClick={(e) =>
          e.target === dialogRef.current && dialogRef.current?.close()
        }
        className="m-auto w-[92vw] max-w-3xl max-h-[90dvh] overflow-y-auto rounded-2xl bg-transparent backdrop:bg-black/60 backdrop:backdrop-blur-sm"
      >
        <FindYourBroker />
      </dialog>
    </div>
  );
};

export default WhyuseaChoicebroker;
