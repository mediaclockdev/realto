import Image from "next/image";
import documentsicon from "@/public/agentpanelicons/sidebardocumentsicon.svg";
import {
  FolderPlus,
  Folder,
  FolderOpen,
  UploadCloud,
  Download,
  Search,
  Eye,
  MoreVertical,
  ChevronLeft,
  ChevronRight,
  FileText,
} from "lucide-react";

const GOLD_PILL =
  "flex items-center gap-8 rounded-2xl border border-transparent px-4 py-2 text-2xl font-bold text-[#E1AB18] shadow-[-8px_8px_16px_0_#999FB4,6px_-6px_12px_0_#FFFFFF]";

const GOLD_PILL_STYLE = {
  background:
    "linear-gradient(135deg,#FFFFFF 0%,#ECEDF0 50%,#C2C6CD 100%) padding-box, linear-gradient(180deg,#BA9000 0%,#F7D257 50%,#BA9000 100%) border-box",
};

const TILE =
  "bg-[linear-gradient(135deg,#D8EFFD_0%,#E9EDFE_100%)] shadow-[-8px_8px_16px_0_#999FB4,6px_-6px_12px_0_#FFFFFF,inset_0_4px_4px_0_rgba(43,108,176,0.2)]";

const stats = [
  { label: "Total Documents", value: 48, icon: Folder, color: "text-yellow-500" },
  { label: "Folders", value: 8, icon: FolderOpen, color: "text-amber-600" },
  { label: "Uploaded This Month", value: 12, icon: UploadCloud, color: "text-sky-500" },
  { label: "Total Downloads", value: 36, icon: Download, color: "text-orange-500" },
];

const folders = [
  { name: "Property Documents", count: 2 },
  { name: "Client Agreements", count: 8 },
  { name: "Legal Documents", count: 6 },
  { name: "Marketing Materials", count: 7 },
  { name: "Invoices", count: 5 },
  { name: "Archived", count: 0 },
];

const typeColor: Record<string, string> = {
  PDF: "text-red-500",
  DOCX: "text-blue-500",
  XLSX: "text-green-600",
  PPTX: "text-orange-500",
  JPG: "text-purple-500",
};

const documents = [
  { name: "Property Agreement.pdf", folder: "Client Agreements", type: "PDF", size: "2.4 MB", date: "12 May 2026", time: "10:30 AM" },
  { name: "Listing Presentation.docx", folder: "Marketing Materials", type: "DOCX", size: "1.8 MB", date: "12 May 2026", time: "09:15 AM" },
  { name: "Sales Report - Apr 2026...", folder: "Reports", type: "XLSX", size: "945 KB", date: "11 May 2026", time: "04:20 PM" },
  { name: "Client Contract - John D...", folder: "Client Agreements", type: "PDF", size: "1.2 MB", date: "11 May 2026", time: "02:45 PM" },
  { name: "Market Analysis.pptx", folder: "Reports", type: "PPTX", size: "3.6 MB", date: "10 May 2026", time: "11:05 AM" },
  { name: "Property Image.jpg", folder: "Property Documents", type: "JPG", size: "2.1 MB", date: "10 May 2026", time: "10:20 AM" },
  { name: "Market Analysis.pptx", folder: "Reports", type: "PPTX", size: "3.6 MB", date: "10 May 2026", time: "11:05 AM" },
  { name: "Property Image.jpg", folder: "Property Documents", type: "JPG", size: "2.1 MB", date: "10 May 2026", time: "10:20 AM" },
  { name: "Market Analysis.pptx", folder: "Reports", type: "PPTX", size: "3.6 MB", date: "10 May 2026", time: "11:05 AM" },
  { name: "Property Image.jpg", folder: "Property Documents", type: "JPG", size: "2.1 MB", date: "10 May 2026", time: "10:20 AM" },
];

export default function AgentPanelDocuments() {
  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <span className={GOLD_PILL} style={GOLD_PILL_STYLE}>
          Documents
          <Image src={documentsicon} alt="" className="size-11" />
        </span>
        <button className={GOLD_PILL} style={GOLD_PILL_STYLE}>
          <FolderPlus className="size-10 text-[#41A5FF]" />
          <span className="text-[#EF4444]">New Folder</span>
        </button>
      </div>
      <p className="font-serif text-2xl italic text-[#64748B]">
        Store, manage and access all your important documents.
      </p>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map(({ label, value, icon: Icon, color }) => (
          <div key={label} className={`flex items-center gap-3 rounded-xl p-4 ${TILE}`}>
            <Icon className={`size-12 shrink-0 ${color}`} />
            <div>
              <p className="text-lg font-bold text-[#2495FF]">{label}</p>
              <p className="text-2xl font-bold text-[#0F172A]">{value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <button className="flex items-center gap-2 rounded-lg border border-yellow-400 bg-white px-4 py-2 font-bold text-gray-900 shadow-sm">
          <UploadCloud className="size-5 text-sky-500" />
          Upload Document
        </button>
        <span className="flex items-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-2">
          <input
            type="search"
            placeholder="Search Documents"
            className="w-48 text-sm text-gray-600 outline-none placeholder:italic"
          />
          <Search className="size-4 shrink-0 text-gray-400" />
        </span>
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-[260px_1fr]">
        {/* Folder list */}
        <aside className="h-fit rounded-xl border border-gray-200 bg-white p-3 shadow-sm">
          <p className="flex items-center justify-between rounded-lg px-2 py-2 font-bold text-orange-500">
            Folders
            <Folder className="size-6 text-blue-500" />
          </p>
          <ul className="mt-2 space-y-2">
            {folders.map(({ name, count }) => (
              <li key={name}>
                <button className="flex w-full items-center justify-between gap-2 rounded-lg border border-gray-200 px-3 py-2 text-left text-sm font-semibold text-gray-700 shadow-sm">
                  <span className="flex items-center gap-2">
                    <Folder className="size-4 text-yellow-500" />
                    {name}
                  </span>
                  <span className="flex size-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
                    {count}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </aside>

        {/* Document table */}
        <section className="rounded-xl border border-gray-200 bg-white p-3 shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 text-left font-bold text-blue-600">
                  <th className="px-2 pb-2">Document Name</th>
                  <th className="px-2 pb-2">Folder</th>
                  <th className="px-2 pb-2">Type</th>
                  <th className="px-2 pb-2">Size</th>
                  <th className="px-2 pb-2">Uploaded On</th>
                  <th className="px-2 pb-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {documents.map((d, i) => (
                  <tr key={i} className="border-b border-gray-100 last:border-0">
                    <td className="flex items-center gap-2 px-2 py-2 font-semibold text-gray-900">
                      <FileText className={`size-5 shrink-0 ${typeColor[d.type]}`} />
                      {d.name}
                    </td>
                    <td className="px-2 text-gray-600">{d.folder}</td>
                    <td className={`px-2 font-bold ${typeColor[d.type]}`}>{d.type}</td>
                    <td className="px-2 text-gray-600">{d.size}</td>
                    <td className="px-2">
                      <span className="block font-bold text-gray-900">{d.date}</span>
                      <span className="block text-xs text-gray-500">{d.time}</span>
                    </td>
                    <td className="px-2">
                      <span className="flex items-center gap-3 text-gray-500">
                        <button aria-label="View">
                          <Eye className="size-4" />
                        </button>
                        <button aria-label="Download">
                          <Download className="size-4 text-orange-500" />
                        </button>
                        <button aria-label="More">
                          <MoreVertical className="size-4" />
                        </button>
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
            <p className="text-gray-600">Showing 1 to 10 of 32 leads</p>
            <div className="flex items-center gap-2">
              <button className="rounded-lg bg-blue-500 p-1.5 text-white" aria-label="Previous">
                <ChevronLeft className="size-4" />
              </button>
              {[1, 2, 3].map((p) => (
                <button
                  key={p}
                  className={`size-8 rounded-lg font-semibold ${
                    p === 1 ? "bg-blue-500 text-white" : "border border-gray-200 text-blue-600"
                  }`}
                >
                  {p}
                </button>
              ))}
              <button className="rounded-lg bg-blue-500 p-1.5 text-white" aria-label="Next">
                <ChevronRight className="size-4" />
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
