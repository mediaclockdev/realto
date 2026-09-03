"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import {
  getDocumentStats,
  getFolders,
  createFolder,
  deleteFolder,
  getDocuments,
  uploadDocument,
  deleteDocument,
  viewDocument,
  downloadDocument,
  type AgentDocument,
  type DocumentFolder,
  type DocumentStats,
} from "@/lib/api/documents";
import documentsicon from "@/public/agentpanelicons/sidebardocumentsicon.svg";
import {
  Download,
  Search,
  Eye,
  MoreVertical,
  ChevronLeft,
  ChevronRight,
  FileText,
} from "lucide-react";
import newfolder from "@/public/agentpanelicons/documentsNewfolder.svg";
import foldericon from "@/public/agentpanelicons/leadmanagementTotalleads.svg";
import totaldocuments from "@/public/agentpanelicons/leadmanagementOpenleads.svg";
import uploadthismonthicon from "@/public/agentpanelicons/documentuploadthismonthicon.svg";
import uploadicon from "@/public/agentpanelicons/documentuploaddocumenticon.svg";
import totaldownloads from "@/public/agentpanelicons/documenttotaldownloads.svg";

const GOLD_PILL =
  "flex items-center gap-8 rounded-2xl border border-transparent px-4 py-2 text-xl font-semibold text-[#E1AB18] shadow-[-8px_8px_16px_0_#999FB4,6px_-6px_12px_0_#FFFFFF]";

const GOLD_PILL_STYLE = {
  background:
    "linear-gradient(135deg,#FFFFFF 0%,#ECEDF0 50%,#C2C6CD 100%) padding-box, linear-gradient(180deg,#BA9000 0%,#F7D257 50%,#BA9000 100%) border-box",
};

const TILE =
  "bg-[linear-gradient(135deg,#D8EFFD_0%,#E9EDFE_100%)] shadow-[-8px_8px_16px_0_#999FB4,6px_-6px_12px_0_#FFFFFF,inset_0_4px_4px_0_rgba(43,108,176,0.2)]";

const statTiles = [
  {
    label: "Total Documents",
    key: "total_documents",
    icon: totaldocuments,
    color: "text-yellow-500",
  },
  { label: "Folders", key: "folders", icon: foldericon, color: "text-amber-600" },
  {
    label: "Uploaded This Month",
    key: "uploaded_this_month",
    icon: uploadthismonthicon,
    color: "text-sky-500",
  },
  {
    label: "Total Downloads",
    key: "total_downloads",
    icon: totaldownloads,
    color: "text-orange-500",
  },
] as const;

const PER_PAGE = 10;

const typeColor: Record<string, string> = {
  PDF: "text-red-500",
  DOCX: "text-blue-500",
  XLSX: "text-green-600",
  PPTX: "text-orange-500",
  JPG: "text-purple-500",
};

const docType = (d: AgentDocument) =>
  (d.type || d.extension || (d.name || "").split(".").pop() || "").toUpperCase();

const formatSize = (size: AgentDocument["size"]) => {
  const bytes = Number(size);
  if (!bytes) return String(size ?? "-");
  const units = ["B", "KB", "MB", "GB"];
  const i = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), 3);
  return `${(bytes / 1024 ** i).toFixed(1)} ${units[i]}`;
};

const openInTab = (url: string | null, message: string) => {
  if (!url) return toast.error(message);
  window.open(url, "_blank", "noopener");
};

export default function AgentPanelDocuments() {
  const [stats, setStats] = useState<DocumentStats>({});
  const [folders, setFolders] = useState<DocumentFolder[]>([]);
  const [documents, setDocuments] = useState<AgentDocument[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [folderId, setFolderId] = useState<number | string | null>(null);
  const [loading, setLoading] = useState(true);
  const fileInput = useRef<HTMLInputElement>(null);

  const loadSidebar = useCallback(async () => {
    const [s, f] = await Promise.all([getDocumentStats(), getFolders()]);
    if (s.success && s.data) setStats(s.data);
    if (f.success && f.data) setFolders(f.data);
  }, []);

  const loadDocuments = useCallback(async () => {
    setLoading(true);
    const res = await getDocuments({
      page,
      per_page: PER_PAGE,
      ...(search ? { search } : {}),
      ...(folderId != null ? { folder_id: folderId } : {}),
    });
    if (res.success && res.data) {
      const list = res.data.data ?? [];
      setDocuments(list);
      setTotal(res.data.total ?? list.length);
    } else {
      toast.error(res.message || "Failed to load documents.");
    }
    setLoading(false);
  }, [page, search, folderId]);

  useEffect(() => {
    loadSidebar();
  }, [loadSidebar]);

  // debounce search typing, immediate for page/folder changes
  useEffect(() => {
    const t = setTimeout(loadDocuments, search ? 400 : 0);
    return () => clearTimeout(t);
  }, [loadDocuments, search]);

  async function handleNewFolder() {
    const name = window.prompt("Folder name")?.trim();
    if (!name) return;
    const res = await createFolder({ name });
    if (!res.success) return toast.error(res.message || "Failed to create folder.");
    toast.success("Folder created.");
    loadSidebar();
  }

  async function handleDeleteFolder(id: number | string, name: string) {
    if (!window.confirm(`Delete folder "${name}"?`)) return;
    const res = await deleteFolder(id);
    if (!res.success) return toast.error(res.message || "Failed to delete folder.");
    toast.success("Folder deleted.");
    if (folderId === id) setFolderId(null);
    loadSidebar();
  }

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    const res = await uploadDocument(file, folderId ?? undefined);
    if (!res.success) return toast.error(res.message || "Upload failed.");
    toast.success("Document uploaded.");
    loadSidebar();
    loadDocuments();
  }

  async function handleDelete(id: number | string) {
    if (!window.confirm("Delete this document?")) return;
    const res = await deleteDocument(id);
    if (!res.success) return toast.error(res.message || "Failed to delete document.");
    toast.success("Document deleted.");
    loadSidebar();
    loadDocuments();
  }

  const lastPage = Math.max(1, Math.ceil(total / PER_PAGE));
  const from = total === 0 ? 0 : (page - 1) * PER_PAGE + 1;

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <span className={GOLD_PILL} style={GOLD_PILL_STYLE}>
          Documents
          <Image src={documentsicon} alt="" className="size-11" />
        </span>
        <button
          className={GOLD_PILL}
          style={GOLD_PILL_STYLE}
          onClick={handleNewFolder}
        >
          <Image
            src={newfolder}
            alt="new folder icon"
            className="size-10 text-[#41A5FF]"
          />
          <span className="text-[#EF4444]">New Folder</span>
        </button>
      </div>
      <p className="font-serif text-2xl italic text-[#64748B]">
        Store, manage and access all your important documents.
      </p>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {statTiles.map(({ label, key, icon: Icon, color }) => (
          <div
            key={label}
            className={`flex items-center gap-3 rounded-xl p-4 ${TILE}`}
          >
            <Image
              src={Icon}
              alt="icons"
              className={`size-12 shrink-0 ${color}`}
            />
            <div>
              <p className="text-lg font-bold text-[#2495FF]">{label}</p>
              <p className="text-2xl font-bold text-[#0F172A]">
                {stats[key] ?? 0}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <input
          ref={fileInput}
          type="file"
          className="hidden"
          onChange={handleUpload}
        />
        <button
          className={`relative ${GOLD_PILL} !py-3 !pl-28 !pr-8 disabled:opacity-50`}
          style={GOLD_PILL_STYLE}
          disabled={folderId == null}
          title={folderId == null ? "Select a folder to upload into" : undefined}
          onClick={() => fileInput.current?.click()}
        >
          <Image
            src={uploadicon}
            alt="upload icon"
            className="absolute -top-3 left-3 size-20"
          />
          Upload Document
        </button>
        <span className="flex items-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-2">
          <input
            type="search"
            placeholder="Search Documents"
            className="w-48 text-sm text-gray-600 outline-none placeholder:italic"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
          />
          <Search className="size-4 shrink-0 text-gray-400" />
        </span>
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-[260px_1fr]">
        {/* Folder list */}
        <aside className="h-fit rounded-xl border border-gray-200 bg-white p-3 shadow-sm">
          <p className="flex items-center justify-between rounded-lg px-2 py-2 font-bold text-orange-500">
            Folders
            <Image
              src={totaldocuments}
              alt="folder icon"
              className="size-6 text-blue-500"
            />
          </p>
          <ul className="mt-2 space-y-2">
            {folders.map(({ id, name, files_count }) => (
              <li key={id}>
                <button
                  onClick={() => {
                    setFolderId((current) => (current === id ? null : id));
                    setPage(1);
                  }}
                  onContextMenu={(e) => {
                    e.preventDefault();
                    handleDeleteFolder(id, name);
                  }}
                  className={`flex w-full items-center justify-between gap-2 rounded-lg border px-3 py-2 text-left text-sm font-semibold text-gray-700 shadow-sm ${
                    folderId === id
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <Image
                      src={totaldocuments}
                      alt="folder icon"
                      className="size-4 text-yellow-500"
                    />
                    {name}
                  </span>
                  <span className="flex size-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
                    {files_count ?? 0}
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
                {loading && (
                  <tr>
                    <td colSpan={6} className="py-6 text-center text-gray-500">
                      Loading documents...
                    </td>
                  </tr>
                )}
                {!loading && documents.length === 0 && (
                  <tr>
                    <td colSpan={6} className="py-6 text-center text-gray-500">
                      No documents found.
                    </td>
                  </tr>
                )}
                {!loading &&
                  documents.map((d) => {
                    const type = docType(d);
                    const uploaded = d.created_at ? new Date(d.created_at) : null;
                    return (
                      <tr
                        key={d.id}
                        className="border-b border-gray-100 last:border-0"
                      >
                        <td className="flex items-center gap-2 px-2 py-2 font-semibold text-gray-900">
                          <FileText
                            className={`size-5 shrink-0 ${typeColor[type]}`}
                          />
                          {d.name || d.original_name}
                        </td>
                        <td className="px-2 text-gray-600">
                          {d.folder_name ||
                            folders.find((f) => f.id === d.folder_id)?.name ||
                            "-"}
                        </td>
                        <td className={`px-2 font-bold ${typeColor[type]}`}>
                          {type}
                        </td>
                        <td className="px-2 text-gray-600">
                          {formatSize(d.size)}
                        </td>
                        <td className="px-2">
                          <span className="block font-bold text-gray-900">
                            {uploaded?.toLocaleDateString() ?? "-"}
                          </span>
                          <span className="block text-xs text-gray-500">
                            {uploaded?.toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </span>
                        </td>
                        <td className="px-2">
                          <span className="flex items-center gap-3 text-gray-500">
                            <button
                              aria-label="View"
                              onClick={async () =>
                                openInTab(
                                  await viewDocument(d.id),
                                  "Unable to open document.",
                                )
                              }
                            >
                              <Eye className="size-4" />
                            </button>
                            <button
                              aria-label="Download"
                              onClick={async () =>
                                openInTab(
                                  await downloadDocument(d.id),
                                  "Download failed.",
                                )
                              }
                            >
                              <Download className="size-4 text-orange-500" />
                            </button>
                            <button
                              aria-label="Delete"
                              onClick={() => handleDelete(d.id)}
                            >
                              <MoreVertical className="size-4" />
                            </button>
                          </span>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>

          <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
            <p className="text-gray-600">
              Showing {from} to {(page - 1) * PER_PAGE + documents.length} of{" "}
              {total} documents
            </p>
            <div className="flex items-center gap-2">
              <button
                className="rounded-lg bg-blue-500 p-1.5 text-white disabled:opacity-40"
                aria-label="Previous"
                disabled={page === 1}
                onClick={() => setPage((p) => p - 1)}
              >
                <ChevronLeft className="size-4" />
              </button>
              {Array.from({ length: lastPage }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className={`size-8 rounded-lg font-semibold ${
                    p === page
                      ? "bg-blue-500 text-white"
                      : "border border-gray-200 text-blue-600"
                  }`}
                >
                  {p}
                </button>
              ))}
              <button
                className="rounded-lg bg-blue-500 p-1.5 text-white disabled:opacity-40"
                aria-label="Next"
                disabled={page >= lastPage}
                onClick={() => setPage((p) => p + 1)}
              >
                <ChevronRight className="size-4" />
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
