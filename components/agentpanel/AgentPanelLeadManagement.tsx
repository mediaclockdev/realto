import {
  KeyRound,
  PlusCircle,
  Search,
  FolderOpen,
  Archive,
  Trash2,
  Phone,
  MessageCircle,
  Mail,
  MoreVertical,
  ChevronLeft,
  ChevronRight,
  Home,
} from "lucide-react";

const stats = [
  { label: "Total Leads", value: 32, icon: Search },
  { label: "Open Leads", value: 31, icon: FolderOpen },
  { label: "Closed Leads", value: 1, icon: Archive },
];

const statusStyles: Record<string, string> = {
  New: "bg-blue-100 text-blue-600",
  Contacted: "bg-purple-100 text-purple-600",
  Qualified: "bg-green-100 text-green-600",
};

const engagementStyles: Record<string, string> = {
  High: "text-green-600",
  Medium: "text-orange-500",
  Low: "text-red-500",
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
        <span className="flex items-center gap-2 rounded-lg border border-yellow-400 bg-white px-4 py-2 font-bold text-gray-900">
          Leads Management
          <KeyRound className="size-4" />
        </span>
        <button className="flex items-center gap-2 rounded-lg border border-yellow-400 bg-white px-4 py-2 font-bold text-yellow-600">
          <PlusCircle className="size-4" />
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
            className="flex items-center gap-3 rounded-xl bg-blue-50 p-4 shadow-sm"
          >
            <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-yellow-100 text-yellow-600">
              <Icon className="size-5" />
            </span>
            <div>
              <p className="font-bold text-blue-700">{label}</p>
              <p className="text-2xl font-bold text-gray-900">{value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-xl bg-white p-4 shadow-sm">
        {/* Filters */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-4 text-sm">
            <label className="flex items-center gap-2 font-semibold text-blue-700">
              Listings :
              <select className="rounded-lg border border-gray-200 px-2 py-1.5 text-gray-700">
                <option>All</option>
              </select>
            </label>
            <label className="flex items-center gap-2 font-semibold text-blue-700">
              Status :
              <select className="rounded-lg border border-gray-200 px-2 py-1.5 text-gray-700">
                <option>All</option>
                <option>New</option>
                <option>Contacted</option>
                <option>Qualified</option>
              </select>
            </label>
            <label className="flex items-center gap-2 font-semibold text-blue-700">
              Records :
              <select className="rounded-lg border border-gray-200 px-2 py-1.5 text-gray-700">
                <option>15</option>
                <option>25</option>
                <option>50</option>
              </select>
            </label>
          </div>
          <label className="flex items-center gap-2 text-sm font-semibold text-blue-700">
            Lead Search :
            <span className="flex items-center gap-2 rounded-full border border-gray-300 px-3 py-1.5">
              <input
                type="text"
                placeholder="Search Documents"
                className="w-40 text-sm text-gray-600 outline-none placeholder:italic"
              />
              <Home className="size-4 shrink-0 text-gray-400" />
            </span>
          </label>
        </div>

        {/* Actions */}
        <div className="mt-4 flex flex-wrap gap-3">
          <button className="flex items-center gap-2 rounded-lg border border-yellow-400 px-4 py-2 text-sm font-bold text-yellow-600">
            <PlusCircle className="size-4" />
            Add New Lead
          </button>
          <button className="flex items-center gap-2 rounded-lg border border-gray-200 px-4 py-2 text-sm font-bold text-red-600">
            <Trash2 className="size-4" />
            Delete Selected
          </button>
        </div>

        {/* Table */}
        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[900px] text-left text-sm">
            <thead>
              <tr className="border-b border-gray-200 text-gray-600">
                <th className="w-10 py-2"></th>
                <th className="py-2 font-bold text-blue-700">Date</th>
                <th className="py-2 font-bold text-blue-700">Name</th>
                <th className="py-2 font-bold text-blue-700">Email</th>
                <th className="py-2 font-bold text-blue-700">Status</th>
                <th className="py-2 font-bold text-blue-700">Last Activity</th>
                <th className="py-2 font-bold text-blue-700">Engagement</th>
                <th className="py-2 font-bold text-blue-700">Contact</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((lead, i) => (
                <tr key={i} className="border-b border-gray-100">
                  <td className="py-3">
                    <input
                      type="checkbox"
                      defaultChecked
                      className="size-4 accent-green-500"
                    />
                  </td>
                  <td className="py-3 text-gray-700">{lead.date}</td>
                  <td className="py-3 font-bold text-gray-900">{lead.name}</td>
                  <td className="py-3 text-gray-600">{lead.email}</td>
                  <td className="py-3">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${statusStyles[lead.status]}`}
                    >
                      {lead.status}
                    </span>
                  </td>
                  <td className="py-3 text-gray-700">{lead.lastActivity}</td>
                  <td className={`py-3 font-semibold ${engagementStyles[lead.engagement]}`}>
                    {lead.engagement}
                  </td>
                  <td className="py-3">
                    <div className="flex items-center gap-3 text-yellow-500">
                      <Phone className="size-4" />
                      <MessageCircle className="size-4" />
                      <Mail className="size-4" />
                      <MoreVertical className="size-4 text-gray-400" />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer / pagination */}
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-gray-500">Showing 1 to 10 of 32 leads</p>
          <div className="flex items-center gap-2">
            <button className="flex size-8 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
              <ChevronLeft className="size-4" />
            </button>
            {[1, 2, 3].map((page) => (
              <button
                key={page}
                className={`flex size-8 items-center justify-center rounded-lg font-semibold ${
                  page === 1 ? "bg-blue-600 text-white" : "bg-blue-100 text-blue-600"
                }`}
              >
                {page}
              </button>
            ))}
            <button className="flex size-8 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
              <ChevronRight className="size-4" />
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
