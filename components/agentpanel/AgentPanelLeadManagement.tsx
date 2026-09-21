"use client";

import { useEffect, useState } from "react";
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
import toast from "react-hot-toast";
import {
  bulkDeleteLeads,
  createLead,
  deleteLead,
  listLeads,
  updateLead,
  type Lead,
} from "@/lib/api/leads";
import {
  getDashboardStats,
  listProperties,
  type DashboardStats,
  type Property,
} from "@/lib/api/properties";

const SOFT_SHADOW = "shadow-[-8px_8px_16px_0_#999FB4,6px_-6px_12px_0_#FFFFFF]";

const TILE =
  "bg-[linear-gradient(135deg,#D8EFFD_0%,#E9EDFE_100%)] shadow-[-8px_8px_16px_0_#999FB4,6px_-6px_12px_0_#FFFFFF,inset_0_4px_4px_0_rgba(43,108,176,0.2)]";

const stats = [
  { label: "Total Leads", key: "total_leads", icon: totalleadsicon },
  { label: "Open Leads", key: "open_leads", icon: openleadsicon },
  { label: "Closed Leads", key: "closed_leads", icon: closedleadsicon },
] as const;

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

const fmtDate = (d?: string) => (d ? new Date(d).toLocaleDateString() : "–");

function SelectCircle({
  checked,
  label,
  onToggle,
}: {
  checked: boolean;
  label: string;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={checked}
      aria-label={label}
      onClick={onToggle}
      className="block"
    >
      {checked ? (
        <CheckCircle2 className="size-5 fill-green-500 text-white" />
      ) : (
        <span className="block size-5 rounded-full border-2 border-gray-300" />
      )}
    </button>
  );
}

const INPUT =
  "w-full rounded-lg border border-gray-200 px-3 py-2 text-gray-700 outline-none focus:border-[#2495FF]";

function LeadForm({
  lead,
  onClose,
  onSaved,
}: {
  lead?: Lead;
  onClose: () => void;
  onSaved: () => void;
}) {
  const [properties, setProperties] = useState<Property[]>([]);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    listProperties().then((res) => {
      if (res.success && Array.isArray(res.data)) setProperties(res.data);
    });
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const property = properties.find(
      (p) => String(p.id) === f.get("property_id"),
    );
    if (!property) return setError("Please pick a property.");

    setSaving(true);
    setError("");
    const body = {
      name: String(f.get("name")),
      email: String(f.get("email")),
      phone: String(f.get("phone")),
      status: String(f.get("status")),
      message: String(f.get("message")),
      property_id: Number(property.id),
      agent_id: Number(property.agent_id),
    };
    const res = lead
      ? await updateLead(lead.id, body)
      : await createLead(body);
    setSaving(false);
    if (!res.success) return setError(res.message || "Could not save lead.");
    toast.success(lead ? "Lead updated" : "Lead added");
    onSaved();
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
      onClick={onClose}
    >
      <form
        onSubmit={handleSubmit}
        onClick={(e) => e.stopPropagation()}
        className={`w-full max-w-lg space-y-3 rounded-2xl bg-white p-5 ${SOFT_SHADOW}`}
      >
        <p className="text-xl font-bold text-[#2495FF]">
          {lead ? "Edit Lead" : "Add New Lead"}
        </p>
        <input
          name="name"
          required
          defaultValue={lead?.name}
          placeholder="Name"
          className={INPUT}
        />
        <input
          name="email"
          type="email"
          required
          defaultValue={lead?.email}
          placeholder="Email"
          className={INPUT}
        />
        <input
          name="phone"
          type="tel"
          required
          defaultValue={lead?.phone}
          placeholder="Phone"
          className={INPUT}
        />
        {/* keyed so the default re-applies once the properties have loaded */}
        <select
          key={properties.length}
          name="property_id"
          required
          defaultValue={lead?.property_id ?? ""}
          className={INPUT}
        >
          <option value="" disabled>
            Select property
          </option>
          {properties.map((p) => (
            <option key={p.id} value={p.id}>
              {p.title || p.location || `Property #${p.id}`}
            </option>
          ))}
        </select>
        <select
          name="status"
          defaultValue={lead?.status ?? "New"}
          className={INPUT}
        >
          <option>New</option>
          <option>Contacted</option>
          <option>Qualified</option>
        </select>
        <textarea
          name="message"
          rows={3}
          defaultValue={lead?.message}
          placeholder="Message"
          className={INPUT}
        />
        {error && <p className="text-sm text-red-500">{error}</p>}
        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-gray-200 px-4 py-2 font-semibold text-gray-600"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={saving}
            className="rounded-lg bg-[#2495FF] px-4 py-2 font-semibold text-white disabled:opacity-60"
          >
            {saving ? "Saving..." : lead ? "Save Changes" : "Add Lead"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default function AgentPanelLeadManagement() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [limit, setLimit] = useState(15);
  const [breakdown, setBreakdown] = useState<DashboardStats["breakdown"]>();
  // "new" = add form, a Lead = edit form
  const [form, setForm] = useState<Lead | "new" | null>(null);
  // open 3-dot menu, positioned fixed so the table's scroll box can't clip it
  const [menu, setMenu] = useState<{ lead: Lead; x: number; y: number }>();
  const [selected, setSelected] = useState<Lead["id"][]>([]);
  // bumped after a save/delete so the list and stats refetch
  const [version, setVersion] = useState(0);

  useEffect(() => {
    getDashboardStats().then((res) => {
      if (res.success) setBreakdown(res.data?.breakdown);
    });
  }, [version]);

  useEffect(() => {
    // ponytail: refetches on every keystroke; debounce if the API gets slow
    const params: Record<string, string | number> = { limit };
    if (search) params.search = search;
    if (status) params.status = status;
    listLeads(params).then((res) => {
      if (res.success && Array.isArray(res.data)) {
        setLeads(res.data);
        setSelected([]); // drop selections when the visible list changes
      }
    });
  }, [search, status, limit, version]);

  const allSelected = leads.length > 0 && selected.length === leads.length;

  async function handleDelete(ids: Lead["id"][]) {
    if (!window.confirm(`Delete ${ids.length} lead(s)?`)) return;
    const res =
      ids.length === 1 ? await deleteLead(ids[0]) : await bulkDeleteLeads(ids);
    if (!res.success) toast.error(res.message || "Could not delete leads.");
    else toast.success("Leads deleted");
    setVersion((v) => v + 1);
  }

  return (
    <main className="space-y-5">
      {form && (
        <LeadForm
          lead={form === "new" ? undefined : form}
          onClose={() => setForm(null)}
          onSaved={() => {
            setForm(null);
            setVersion((v) => v + 1);
          }}
        />
      )}
      {menu && (
        <div className="fixed inset-0 z-40" onClick={() => setMenu(undefined)}>
          <div
            role="menu"
            style={{ left: menu.x, top: menu.y }}
            className="fixed w-32 -translate-x-full overflow-hidden rounded-lg border border-gray-100 bg-white text-sm font-semibold shadow-lg"
          >
            <button
              role="menuitem"
              onClick={() => setForm(menu.lead)}
              className="block w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-50"
            >
              Edit
            </button>
            <button
              role="menuitem"
              onClick={() => handleDelete([menu.lead.id])}
              className="block w-full px-4 py-2 text-left text-red-500 hover:bg-gray-50"
            >
              Delete
            </button>
          </div>
        </div>
      )}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <span className="flex items-center gap-2 rounded-lg border border-yellow-400 bg-white px-2 py-2 text-xl font-semibold text-[#E1AB18]">
          Leads Management
          <Image src={leadsicon} alt="" width={32} height={32} />
        </span>
        <button
          onClick={() => setForm("new")}
          className="flex items-center gap-2 rounded-lg border border-yellow-400 bg-white px-4 py-2 text-lg font-semibold text-[#E1AB18]"
        >
          <Image src={addleadicon} alt="" width={28} height={28} />
          Add New Lead
        </button>
      </div>
      <p className="italic text-gray-600">
        Manage and track your leads all in one place.
      </p>

      {/* Stat cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {stats.map(({ label, key, icon: Icon }) => (
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
              <p className="text-xl font-bold text-gray-900">
                {breakdown?.[key] ?? "–"}
              </p>
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
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="rounded-lg border border-gray-200 px-2 py-1.5 text-gray-700"
              >
                <option value="">All</option>
                <option>New</option>
                <option>Contacted</option>
                <option>Qualified</option>
              </select>
            </label>
            <label className="flex items-center gap-2 font-bold text-[#2495FF]">
              Records :
              <select
                value={limit}
                onChange={(e) => setLimit(Number(e.target.value))}
                className="rounded-lg border border-gray-200 px-2 py-1.5 text-gray-700"
              >
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
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search Leads"
                className="w-56 text-base text-gray-600 outline-none placeholder:italic placeholder:text-gray-400"
              />
              <Image src={searchicon} alt="" className="size-7 shrink-0" />
            </span>
          </label>
        </div>

        {/* Actions */}
        <div className="mt-4 flex flex-wrap gap-3">
          <button
            onClick={() => setForm("new")}
            className={`flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-lg font-bold text-[#E1AB18] ${SOFT_SHADOW}`}
          >
            <Image src={addleadicon} alt="" width={26} height={26} />
            Add New Lead
          </button>
          <button
            onClick={() => handleDelete(selected)}
            disabled={selected.length === 0}
            className={`flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-lg font-bold text-[#EF4444] disabled:opacity-50 ${SOFT_SHADOW}`}
          >
            <Trash2 className="size-6 text-gray-700" />
            Delete Selected{selected.length > 0 && ` (${selected.length})`}
          </button>
        </div>

        {/* Table */}
        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[900px] text-left text-sm">
            <thead>
              <tr className="bg-[#EAF4FE] text-gray-600">
                <th className="w-12 rounded-l-lg py-3 pl-4">
                  <SelectCircle
                    checked={allSelected}
                    label="Select all leads"
                    onToggle={() =>
                      setSelected(allSelected ? [] : leads.map((l) => l.id))
                    }
                  />
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
              {leads.length === 0 && (
                <tr>
                  <td colSpan={8} className="py-6 text-center text-gray-500">
                    No leads found.
                  </td>
                </tr>
              )}
              {leads.map((lead) => (
                <tr key={lead.id} className="border-b border-gray-100">
                  <td className="py-3 pl-4">
                    <SelectCircle
                      checked={selected.includes(lead.id)}
                      label={`Select ${lead.name ?? "lead"}`}
                      onToggle={() =>
                        setSelected((s) =>
                          s.includes(lead.id)
                            ? s.filter((id) => id !== lead.id)
                            : [...s, lead.id],
                        )
                      }
                    />
                  </td>
                  <td className="py-3 text-gray-700">
                    {fmtDate(lead.created_at)}
                  </td>
                  <td className="py-3 font-bold text-gray-900">{lead.name}</td>
                  <td className="py-3 text-gray-600">{lead.email}</td>
                  <td className="py-3">
                    <span
                      className={`rounded-full px-3 py-1 text-sm font-bold ${statusStyles[lead.status ?? ""] ?? ""}`}
                    >
                      {lead.status}
                    </span>
                  </td>
                  <td className="py-3 text-gray-700">
                    {fmtDate(lead.updated_at)}
                  </td>
                  <td className="py-3">
                    <span
                      className={`rounded-full px-3 py-1 text-sm font-bold ${engagementStyles[lead.engagement ?? ""] ?? ""}`}
                    >
                      {lead.engagement}
                    </span>
                  </td>
                  <td className="py-3">
                    <div className="flex items-center gap-3">
                      {[phoneicon, messageicon, mailicon].map((icon, i) => (
                        <Image
                          key={i}
                          src={icon}
                          alt="icons"
                          className="h-7 w-auto"
                        />
                      ))}
                      <button
                        type="button"
                        aria-label={`Actions for ${lead.name ?? "lead"}`}
                        onClick={(e) => {
                          const r = e.currentTarget.getBoundingClientRect();
                          setMenu({ lead, x: r.right, y: r.bottom + 4 });
                        }}
                      >
                        <Image src={dotmenu} alt="" className="h-7 w-auto" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer / pagination */}
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
          <p className="text-base text-gray-500">Showing {leads.length} leads</p>
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
