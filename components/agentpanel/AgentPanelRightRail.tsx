import Image from "next/image";
import { MapPin } from "lucide-react";

import AgentSummaryCard from "@/components/Agent/AgentSummaryCard";
import glassBackground from "@/public/agentpanelicons/dashboardglasseffect.svg";
import blueglassbackground from "@/public/agentpanelicons/dashboardblueglasseffect.svg";

const shortlisted = [
  { label: "Total Properties", value: 24 },
  { label: "For Sale", value: 14 },
  { label: "For Rent", value: 6 },
  { label: "For Investment", value: 4 },
];

export default function AgentPanelRightRail() {
  return (
    <aside className="space-y-5">
      <AgentSummaryCard className="w-full" />

      <div className="rounded-2xl bg-white p-3 shadow-sm">
        <p className="mb-2 flex items-center gap-1.5 font-bold text-gray-700">
          <MapPin className="size-4 text-red-500" /> Google Maps
        </p>
        <div className="h-52 w-full overflow-hidden rounded-xl">
          <iframe
            title="Property location map"
            src="https://maps.google.com/maps?q=Austin%2C%20Australia&z=13&output=embed"
            className="h-full w-full border-0"
            loading="lazy"
          />
        </div>
      </div>

      <div className="relative overflow-hidden rounded-[28px] p-3 shadow-[0_10px_30px_rgba(0,0,0,0.25)]">
        {/* glass background — same treatment as the agent card */}
        <Image
          src={glassBackground}
          alt="glasseffect"
          fill
          className="object-fill"
        />

        <div className="relative rounded-[20px] bg-white p-4">
          <p className="font-bold text-[#0496FF] text-[22px]">
            Shortlisted Summary
          </p>
          <div className="mt-3 space-y-2 text-sm">
            {shortlisted.map(({ label, value }) => (
              <div key={label} className="flex items-center justify-between">
                <span className="text-[#00A3EE] font-medium text-lg">
                  {label}
                </span>
                <span className="font-bold text-[#2495FF] font-lg">
                  {value}
                </span>
              </div>
            ))}
          </div>
          <button className="relative mt-4 block w-full overflow-hidden rounded-full py-3">
            <Image
              src={blueglassbackground}
              alt=""
              fill
              className="object-fill"
            />
            <span className="relative text-lg font-bold text-white">
              View all Shortlisted
            </span>
          </button>
        </div>
      </div>
    </aside>
  );
}
