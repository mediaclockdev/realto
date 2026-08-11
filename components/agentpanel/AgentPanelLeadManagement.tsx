import Image from "next/image";
import { Trash2, ChevronLeft, ChevronRight, CheckCircle2 } from "lucide-react";

import leadsicon from "@/public/agentpanelicons/sidebarleadsmanagementicon.svg";
import addleadicon from "@/public/agentpanelicons/dashboardaddlistingicon.svg";
import searchicon from "@/public/magnifyingglass1.svg";
import totalleadsicon from "@/public/agentpanelicons/leadmanagementTotalleads.svg";
import openleadsicon from "@/public/agentpanelicons/leadmanagementOpenleads.svg";
import closedleadsicon from "@/public/agentpanelicons/leadmanagementClosedleads.svg";
import phoneicon from "@/public/agentpanelicons/leadmanagementphoneicon.svg";
import messageicon from "@/public/agentpanelicons/leadmanagementmessageicon.svg";
import mailicon from "@/public/agentpanelicons/leadmanagementmailicon.svg";
import dotmenu from "@/public/agentpanelicons/leadmanagement3doticon.svg";

const SOFT_SHADOW = "shadow-[-8px_8px_16px_0_#999FB4,6px_-6px_12px_0_#FFFFFF]";

const TILE =
  "bg-[linear-gradient(135deg,#D8EFFD_0%,#E9EDFE_100%)] shadow-[-8px_8px_16px_0_#999FB4,6px_-6px_12px_0_#FFFFFF,inset_0_4px_4px_0_rgba(43,108,176,0.2)]";

const stats = [
  { label: "Total Leads", value: 32, icon: totalleadsicon },
  { label: "Open Leads", value: 31, icon: openleadsicon },
  { label: "Closed Leads", value: 1, icon: closedleadsicon },
];

const statusStyles: Record<string, string> = {
  New: "bg-blue-100 text-blue-600",
  Contacted: "bg-purple-100 text-purple-600",
  Qualified: "bg-green-100 text-green-600",
};

const engagementStyles: Record<string, string> = {
  High: "bg-green-50 text-green-600",
  Medium: "bg-orange-50 text-orange-500",
  Low: "bg-red-50 text-red-500",
};

const rowCycle = [
  { status: "New", engagement: "High" },
  { status: "Contacted", engagement: "Medium" },
  { status: "Qualified", engagement: "Low" },
];

const leads = Array.from({ length: 10 }, (_, i) => ({
  date: "12/12/2026",
  name: "Andrew Williams",
  email: "andrew.w@gmail.com",
  lastActivity: "12/12/2026",
  ...rowCycle[i % rowCycle.length],
}));

export default function AgentPanelLeadManagement() {
  return (
    <main className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <span className="flex items-center gap-2 rounded-lg border border-yellow-400 bg-white px-2 py-2 text-xl font-semibold text-[#E1AB18]">
          Leads Management
          <Image src={leadsicon} alt="" width={32} height={32} />
        </span>
        <button className="flex items-center gap-2 rounded-lg border border-yellow-400 bg-white px-4 py-2 text-lg font-semibold text-[#E1AB18]">
          <Image src={addleadicon} alt="" width={28} height={28} />
          Add New Lead
        </button>
      </div>
      <p className="italic text-gray-600">
        Manage and track your leads all in one place.
      </p>

      {/* Stat cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {stats.map(({ label, value, icon: Icon }) => (
          <div
            key={label}
            className={`flex items-center gap-3 rounded-xl p-4 ${TILE}`}
          >
            <Image
              src={Icon}
              alt="icons"
              className="size-12 shrink-0 text-[#E1AB18] object-cover"
            />
            <div>
              <p className="text-lg font-bold text-[#2495FF]">{label}</p>
              <p className="text-xl font-bold text-gray-900">{value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className={`rounded-2xl bg-white p-4 ${SOFT_SHADOW}`}>
        {/* Filters */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-4 text-base">
            <label className="flex items-center gap-2 font-bold text-[#2495FF]">
              Listings :
              <select className="rounded-lg border border-gray-200 px-2 py-1.5 text-gray-700">
                <option>All</option>
              </select>
            </label>
            <label className="flex items-center gap-2 font-bold text-[#2495FF]">
              Status :
              <select className="rounded-lg border border-gray-200 px-2 py-1.5 text-gray-700">
                <option>All</option>
                <option>New</option>
                <option>Contacted</option>
                <option>Qualified</option>
              </select>
            </label>
            <label className="flex items-center gap-2 font-bold text-[#2495FF]">
              Records :
              <select className="rounded-lg border border-gray-200 px-2 py-1.5 text-gray-700">
                <option>15</option>
                <option>25</option>
                <option>50</option>
              </select>
            </label>
          </div>
          <label className="flex items-center gap-2 text-base font-bold text-[#2495FF]">
            Lead Search :
            <span
              className={`flex items-center gap-2 rounded-full bg-white px-4 py-2 ${SOFT_SHADOW}`}
            >
              <input
                type="text"
                placeholder="Search Documents"
                className="w-56 text-base text-gray-600 outline-none placeholder:italic placeholder:text-gray-400"
              />
              <Image src={searchicon} alt="" className="size-7 shrink-0" />
            </span>
          </label>
        </div>

        {/* Actions */}
        <div className="mt-4 flex flex-wrap gap-3">
          <button
            className={`flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-lg font-bold text-[#E1AB18] ${SOFT_SHADOW}`}
          >
            <Image src={addleadicon} alt="" width={26} height={26} />
            Add New Lead
          </button>
          <button
            className={`flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-lg font-bold text-[#EF4444] ${SOFT_SHADOW}`}
          >
            <Trash2 className="size-6 text-gray-700" />
            Delete Selected
          </button>
        </div>

        {/* Table */}
        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[900px] text-left text-sm">
            <thead>
              <tr className="bg-[#EAF4FE] text-gray-600">
                <th className="w-12 rounded-l-lg py-3 pl-4">
                  <span className="block size-5 rounded-full border-2 border-gray-300" />
                </th>
                <th className="py-3 text-base font-bold text-[#2495FF]">
                  Date
                </th>
                <th className="py-3 text-base font-bold text-[#2495FF]">
                  Name
                </th>
                <th className="py-3 text-base font-bold text-[#2495FF]">
                  Email
                </th>
                <th className="py-3 text-base font-bold text-[#2495FF]">
                  Status
                </th>
                <th className="py-3 text-base font-bold text-[#2495FF]">
                  Last Activity
                </th>
                <th className="py-3 text-base font-bold text-[#2495FF]">
                  Engagement
                </th>
                <th className="rounded-r-lg py-3 pr-4 font-bold text-[#2495FF]">
                  Contact
                </th>
              </tr>
            </thead>
            <tbody>
              {leads.map((lead, i) => (
                <tr key={i} className="border-b border-gray-100">
                  <td className="py-3 pl-4">
                    <CheckCircle2 className="size-5 fill-green-500 text-white" />
                  </td>
                  <td className="py-3 text-gray-700">{lead.date}</td>
                  <td className="py-3 font-bold text-gray-900">{lead.name}</td>
                  <td className="py-3 text-gray-600">{lead.email}</td>
                  <td className="py-3">
                    <span
                      className={`rounded-full px-3 py-1 text-sm font-bold ${statusStyles[lead.status]}`}
                    >
                      {lead.status}
                    </span>
                  </td>
                  <td className="py-3 text-gray-700">{lead.lastActivity}</td>
                  <td className="py-3">
                    <span
                      className={`rounded-full px-3 py-1 text-sm font-bold ${engagementStyles[lead.engagement]}`}
                    >
                      {lead.engagement}
                    </span>
                  </td>
                  <td className="py-3">
                    <div className="flex items-center gap-3">
                      {[phoneicon, messageicon, mailicon, dotmenu].map(
                        (icon, i) => (
                          <Image
                            key={i}
                            src={icon}
                            alt="icons"
                            className="h-7 w-auto"
                          />
                        ),
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer / pagination */}
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
          <p className="text-base text-gray-500">Showing 1 to 10 of 32 leads</p>
          <div className="flex items-center gap-2">
            <button className="flex size-10 items-center justify-center rounded-xl bg-[#D7E9FB] text-[#2495FF]">
              <ChevronLeft className="size-4" />
            </button>
            {[1, 2, 3].map((page) => (
              <button
                key={page}
                className={`flex size-10 items-center justify-center rounded-xl font-bold ${
                  page === 1
                    ? "bg-[#1E6FD9] text-white"
                    : "bg-[#D7E9FB] text-[#2495FF]"
                }`}
              >
                {page}
              </button>
            ))}
            <button className="flex size-10 items-center justify-center rounded-xl bg-[#D7E9FB] text-[#2495FF]">
              <ChevronRight className="size-4" />
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
