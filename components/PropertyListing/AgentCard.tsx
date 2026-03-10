import React from "react";
import Image from "next/image";


interface AgentCardProps {
  name: string;
  company: string;
  experience: number;
  sales: number;
  agentImage: string;
}

const AgentCard: React.FC<AgentCardProps> = ({
  name,
  company,
  experience,
  sales,
  agentImage,
}) => {
  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-100 p-4 w-full">
      {/* Stacked card effect */}
      <div className="relative">
        {/* Ghost cards behind */}
        <div className="absolute -bottom-2 left-2 right-2 h-full bg-gray-100 rounded-xl border border-gray-200 -z-10" />
        <div className="absolute -bottom-4 left-4 right-4 h-full bg-gray-50 rounded-xl border border-gray-200 -z-20" />

        <div className="bg-white rounded-xl border border-gray-200 p-4 relative z-10">
          {/* Agent avatar */}
          <div className="flex flex-col items-center text-center mb-3">
            <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-gray-200 mb-2">
              <Image
                src={agentImage}
                alt={name}
                width={64}
                height={64}
                className="object-cover w-full h-full"
              />
            </div>
            <h3 className="font-bold text-gray-900 text-sm">{name}</h3>
            <p className="text-xs text-gray-500 mt-0.5">{company}</p>
            <p className="text-xs text-gray-400 mt-0.5">
              {/* placeholder email */}
              <span className="text-blue-400 underline text-[11px]">
                fakeemail123@45678
              </span>
            </p>
          </div>

          {/* Stats */}
          <div className="flex items-center justify-around border-t border-gray-100 pt-3">
            <div className="text-center">
              <p className="text-base font-bold text-gray-900">{experience}</p>
              <p className="text-[10px] text-gray-500 leading-tight">Years<br />Experience</p>
            </div>
            <div className="w-px h-8 bg-gray-200" />
            <div className="text-center">
              <p className="text-base font-bold text-gray-900">{sales}</p>
              <p className="text-[10px] text-gray-500 leading-tight">Sales<br />Past 1 year</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentCard;
