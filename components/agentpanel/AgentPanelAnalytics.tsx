import Image from "next/image";

import analyticsicon from "@/public/agentpanelicons/sidebaranalyticsicons.svg";
import calendericon from "@/public/agentpanelicons/analtyicscalendericon.svg";
import totalviewsicon from "@/public/agentpanelicons/analtyicstotalviews.svg";
import mylistingsicon from "@/public/agentpanelicons/sidebarmylistingicon.svg";
import soldicon from "@/public/agentpanelicons/mylistingsoldicon.svg";
import totalleadsicon from "@/public/agentpanelicons/dashboardtotalleadicon.svg";
import enquiriesicon from "@/public/agentpanelicons/analyticsEnquiriesicon.svg";
import newleadsicon from "@/public/agentpanelicons/analyticsNewleadsicon.svg";
import closeddealsicon from "@/public/agentpanelicons/dashboardcloseddealsicon.svg";
import villa1 from "@/public/Luxury Modern Villa.jpg";
import villa2 from "@/public/Luxury Modern Villa1.jpg";
import villa3 from "@/public/Luxury Modern Villa2.jpg";

const months = [
  "Dec 2025",
  "Jan 2026",
  "Feb 2026",
  "Mar 2026",
  "Apr 2026",
  "May 2026",
];

const GOLD_PILL =
  "flex items-center gap-8 rounded-2xl border border-transparent px-4 py-2 text-2xl font-bold text-[#E1AB18] shadow-[-8px_8px_16px_0_#999FB4,6px_-6px_12px_0_#FFFFFF]";

const GOLD_PILL_STYLE = {
  background:
    "linear-gradient(135deg,#FFFFFF 0%,#ECEDF0 50%,#C2C6CD 100%) padding-box, linear-gradient(180deg,#BA9000 0%,#F7D257 50%,#BA9000 100%) border-box",
};

const TILE =
  "bg-[linear-gradient(135deg,#D8EFFD_0%,#E9EDFE_100%)] shadow-[-8px_8px_16px_0_#999FB4,6px_-6px_12px_0_#FFFFFF,inset_0_4px_4px_0_rgba(43,108,176,0.2)]";

const stats = [
  { label: "Total Listings", value: "10", icon: mylistingsicon },
  { label: "Total Views", value: "2,458", icon: totalviewsicon },
  { label: "Total Leads", value: "112", icon: totalleadsicon },
  { label: "Total Deals", value: "4", icon: soldicon },
];

const listingSeries = [
  { label: "Total Listings", color: "#3b82f6", data: [6, 8, 9, 11, 14, 18] },
  { label: "Active", color: "#22c55e", data: [4, 5, 7, 8, 9, 13] },
  { label: "Sold", color: "#a855f7", data: [1, 2, 3, 4, 5, 8] },
];

const leadSources = [
  { label: "Website", pct: 45, color: "#22c55e" },
  { label: "Property Portal", pct: 25, color: "#3b82f6" },
  { label: "Social Media", pct: 15, color: "#7dd3fc" },
  { label: "Referrals", pct: 10, color: "#fbcfe8" },
  { label: "Others", pct: 5, color: "#ef4444" },
];

const topListings = [
  {
    image: villa1,
    name: "Modern Villa",
    area: "Austin, Australia",
    views: 512,
    leads: 28,
    enquiries: 16,
    rate: "18.2%",
  },
  {
    image: villa2,
    name: "Luxury Apartment",
    area: "Cronulla, NSW",
    views: 398,
    leads: 22,
    enquiries: 12,
    rate: "16.7%",
  },
  {
    image: villa3,
    name: "Beachside House",
    area: "Bondi Beach, NSW",
    views: 341,
    leads: 18,
    enquiries: 10,
    rate: "15.6%",
  },
  {
    image: villa1,
    name: "City View Apartment",
    area: "Parramatta, NSW",
    views: 289,
    leads: 15,
    enquiries: 8,
    rate: "14.3%",
  },
];

const leadsViews = [
  { leads: 22, views: 1200 },
  { leads: 26, views: 1500 },
  { leads: 30, views: 1700 },
  { leads: 35, views: 1900 },
  { leads: 42, views: 2300 },
  { leads: 33, views: 1800 },
];

const activity = [
  { label: "New Listings", value: "3", icon: mylistingsicon },
  { label: "Property Views", value: "2,458", icon: totalviewsicon },
  { label: "Enquiries", value: "156", icon: enquiriesicon },
  { label: "New Leads", value: "112", icon: newleadsicon },
  { label: "Close Deals", value: "4", icon: closeddealsicon },
];

function Card({
  title,
  action,
  children,
  className = "border border-gray-200 bg-white shadow-sm",
}: {
  title: string;
  action?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={`rounded-xl p-4 ${className}`}>
      <div className="flex items-center justify-between gap-3">
        <h2 className="font-bold text-orange-500">{title}</h2>
        {action}
      </div>
      <div className="mt-4">{children}</div>
    </section>
  );
}

function RangeSelect({ options }: { options: string[] }) {
  return (
    <select className="rounded-lg border border-gray-200 px-3 py-1.5 text-sm font-semibold text-gray-700 shadow-sm">
      {options.map((o) => (
        <option key={o}>{o}</option>
      ))}
    </select>
  );
}

/* Charts are hand-rolled SVG/CSS — no chart dependency for six static data points. */
function ListingsOverviewChart() {
  const max = 20;
  const w = 100;
  const h = 40;
  const x = (i: number) => (i / (months.length - 1)) * w;
  const y = (v: number) => h - (v / max) * h;

  return (
    <div>
      <svg
        viewBox={`0 0 ${w} ${h}`}
        preserveAspectRatio="none"
        className="h-52 w-full"
      >
        {[0, 5, 10, 15, 20].map((v) => (
          <line
            key={v}
            x1={0}
            x2={w}
            y1={y(v)}
            y2={y(v)}
            stroke="#f1f5f9"
            strokeWidth={0.4}
          />
        ))}
        {listingSeries.map(({ label, color, data }) => (
          <polyline
            key={label}
            points={data.map((v, i) => `${x(i)},${y(v)}`).join(" ")}
            fill="none"
            stroke={color}
            strokeWidth={0.6}
            vectorEffect="non-scaling-stroke"
          />
        ))}
      </svg>
      <div className="flex justify-between text-[11px] text-gray-500">
        {months.map((m) => (
          <span key={m}>{m}</span>
        ))}
      </div>
    </div>
  );
}

function LeadsDonut() {
  let start = 0;
  const stops = leadSources
    .map(({ pct, color }) => {
      const seg = `${color} ${start}% ${start + pct}%`;
      start += pct;
      return seg;
    })
    .join(", ");

  return (
    <div className="flex flex-wrap items-center justify-around gap-4">
      <div
        className="relative size-44 rounded-full"
        style={{ background: `conic-gradient(${stops})` }}
      >
        <div className="absolute inset-7 flex flex-col items-center justify-center rounded-full bg-white">
          <span className="text-2xl font-bold text-gray-900">112</span>
          <span className="text-xs text-gray-500">Total Leads</span>
        </div>
      </div>
      <ul className="space-y-2 text-sm">
        {leadSources.map(({ label, pct, color }) => (
          <li key={label} className="flex items-center gap-2">
            <span
              className="size-2.5 rounded-full"
              style={{ background: color }}
            />
            <span className="w-32 text-gray-600">{label}</span>
            <span className="font-bold text-gray-900">{pct}%</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function LeadsViewsChart() {
  const maxViews = 2500;
  const maxLeads = 50;

  return (
    <div>
      <div className="flex h-52 justify-between gap-2">
        {leadsViews.map(({ leads, views }, i) => (
          <div key={i} className="flex flex-1 justify-center gap-1">
            <div className="flex flex-1 flex-col items-center justify-end">
              <span className="text-[10px] font-semibold text-blue-500">
                {leads}
              </span>
              <div
                className="w-full max-w-4 rounded-t bg-blue-500"
                style={{ height: `${(leads / maxLeads) * 100}%` }}
              />
            </div>
            <div className="flex flex-1 flex-col items-center justify-end">
              <span className="text-[10px] font-semibold text-green-600">
                {(views / 1000).toFixed(1)}K
              </span>
              <div
                className="w-full max-w-4 rounded-t bg-green-500"
                style={{ height: `${(views / maxViews) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
      <div className="mt-1 flex justify-between text-[11px] text-gray-500">
        {months.map((m) => (
          <span key={m} className="flex-1 text-center">
            {m}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function AgentPanelAnalytics() {
  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <span className={GOLD_PILL} style={GOLD_PILL_STYLE}>
          Analytics
          <Image src={analyticsicon} alt="" className="size-11" />
        </span>
        <span className={GOLD_PILL} style={GOLD_PILL_STYLE}>
          <Image src={calendericon} alt="" className="size-11" />
          12 Feb 2026 - 12 May 2026
        </span>
      </div>
      <p className="font-serif text-2xl italic text-[#64748B]">
        Track your performance and grow your real estate business.
      </p>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map(({ label, value, icon: Icon }) => (
          <div
            key={label}
            className={`flex items-center gap-3 rounded-xl p-4 ${TILE}`}
          >
            <Image src={Icon} alt="" className="size-14 shrink-0" />
            <div>
              <p className="text-lg font-bold text-[#2495FF]">{label}</p>
              <p className="text-2xl font-bold text-[#0F172A]">{value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <Card
          title="Listings Overview"
          action={
            <div className="flex items-center gap-3">
              <ul className="hidden items-center gap-3 text-[11px] text-gray-600 sm:flex">
                {listingSeries.map(({ label, color }) => (
                  <li key={label} className="flex items-center gap-1">
                    <span
                      className="size-2 rounded-full"
                      style={{ background: color }}
                    />
                    {label}
                  </li>
                ))}
              </ul>
              <RangeSelect options={["Monthly", "Weekly", "Yearly"]} />
            </div>
          }
        >
          <ListingsOverviewChart />
        </Card>

        <Card
          title="Leads by Source"
          action={<RangeSelect options={["This Month", "Last Month"]} />}
        >
          <LeadsDonut />
        </Card>

        <Card
          title="Top Performing Listings"
          action={
            <button className="rounded-lg border border-gray-200 px-4 py-1.5 text-sm font-semibold text-gray-700 shadow-sm">
              View All
            </button>
          }
        >
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 text-left font-bold text-blue-600">
                  <th className="pb-2">Property</th>
                  <th className="pb-2 text-right">Views</th>
                  <th className="pb-2 text-right">Leads</th>
                  <th className="pb-2 text-right">Enquiries</th>
                  <th className="pb-2 text-right">Conversion Rate</th>
                </tr>
              </thead>
              <tbody>
                {topListings.map((l) => (
                  <tr
                    key={l.name}
                    className="border-b border-gray-100 last:border-0"
                  >
                    <td className="flex items-center gap-2 py-2">
                      <Image
                        src={l.image}
                        alt=""
                        className="size-9 rounded object-cover"
                      />
                      <span>
                        <span className="block font-bold text-gray-900">
                          {l.name}
                        </span>
                        <span className="block text-xs text-gray-500">
                          {l.area}
                        </span>
                      </span>
                    </td>
                    <td className="text-right text-gray-700">{l.views}</td>
                    <td className="text-right text-gray-700">{l.leads}</td>
                    <td className="text-right text-gray-700">{l.enquiries}</td>
                    <td className="text-right font-bold text-green-600">
                      {l.rate}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <Card
          title="Leads & Views Overview"
          action={
            <div className="flex items-center gap-3">
              <ul className="hidden items-center gap-3 text-[11px] text-gray-600 sm:flex">
                <li className="flex items-center gap-1">
                  <span className="size-2 rounded-full bg-blue-500" /> Leads
                </li>
                <li className="flex items-center gap-1">
                  <span className="size-2 rounded-full bg-green-500" /> Views
                </li>
              </ul>
              <RangeSelect options={["This Month", "Last Month"]} />
            </div>
          }
        >
          <LeadsViewsChart />
        </Card>
      </div>

      <Card title="Activity Summary" className={TILE}>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
          {activity.map(({ label, value, icon: Icon }) => (
            <div key={label} className="flex items-center gap-3">
              <Image src={Icon} alt="" className="size-14 shrink-0" />
              <div>
                <p className="text-lg font-bold text-[#2495FF]">{label}</p>
                <p className="text-2xl font-bold text-[#0F172A]">{value}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
