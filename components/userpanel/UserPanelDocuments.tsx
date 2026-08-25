"use client";

import Image from "next/image";
import { useState } from "react";
import {
  UploadCloud,
  CheckCircle2,
  Clock,
  XCircle,
  FileText,
  Download,
  Trash2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  RefreshCw,
  BookOpen,
} from "lucide-react";

import documentsicon from "@/public/agentpanelicons/sidebardocumentsicon.svg";
import totaldocuments from "@/public/agentpanelicons/documentuploaddocumenticon.svg";

const SOFT_SHADOW = "shadow-[-8px_8px_16px_0_#999FB4,6px_-6px_12px_0_#FFFFFF]";
const CARD = `rounded-xl bg-white p-4 ${SOFT_SHADOW}`;

const stats = [
  { label: "Total Documents", value: 12, icon: FileText, color: "text-blue-500" },
  {
    label: "Verified Documents",
    value: 8,
    icon: CheckCircle2,
    color: "text-green-500",
  },
  { label: "Pending Review", value: 2, icon: Clock, color: "text-orange-500" },
  {
    label: "Rejected Documents",
    value: 1,
    icon: XCircle,
    color: "text-red-500",
  },
];

const statusStyles: Record<string, string> = {
  VERIFIED: "bg-green-50 text-green-600",
  PENDING: "bg-amber-50 text-amber-600",
  REJECTED: "bg-red-50 text-red-500",
};

const documents = [
  {
    name: "Identity Proof (Passport)",
    file: "passport_masha_klein.pdf",
    type: "PDF",
    category: "Identity",
    status: "VERIFIED",
  },
  {
    name: "Identity Proof (Passport)",
    file: "passport_masha_klein.pdf",
    type: "PDF",
    category: "Identity",
    status: "VERIFIED",
  },
  {
    name: "Bank Statement (May 2025)",
    file: "passport_masha_klein.pdf",
    type: "PDF",
    category: "Financial",
    status: "PENDING",
  },
  {
    name: "Property Tax Receipt",
    file: "passport_masha_klein.jpg",
    type: "JPG",
    category: "Property",
    status: "PENDING",
  },
  {
    name: "Insurance Document",
    file: "passport_masha_klein.pdf",
    type: "PDF",
    category: "Insurance",
    status: "REJECTED",
  },
].map((d) => ({ ...d, date: "May 20, 2025", time: "10:30 AM" }));

const typeColor: Record<string, string> = {
  PDF: "bg-red-500",
  JPG: "bg-blue-500",
};

const tabs = ["All Documents", "Verified", "Pending", "Rejected"];

const guidelines = [
  "Upload clear and readable documents.",
  "Supported formats: PDF, JPG, PNG (Max 10MB per file)",
  "Ensure all information is accurate and up to date.",
  "Documents are securely encrypted and protected.",
];

export default function UserPanelDocuments() {
  const [tab, setTab] = useState("All Documents");

  const visibleDocs =
    tab === "All Documents"
      ? documents
      : documents.filter((d) => d.status === tab.toUpperCase());

  return (
    <main className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <span className="flex items-center gap-2 rounded-lg border border-yellow-400 bg-white px-2 py-2 text-xl font-semibold text-[#E1AB18]">
            Documents
            <Image src={documentsicon} alt="" width={28} height={28} />
          </span>
          <p className="mt-2 italic text-gray-600">
            Manage your important documents and uploads
          </p>
        </div>
        <button
          className={`flex items-center gap-2 rounded-full bg-white px-4 py-2.5 text-base font-bold text-[#E1AB18] ${SOFT_SHADOW}`}
        >
          <UploadCloud className="size-6" />
          Upload Document
        </button>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map(({ label, value, icon: Icon, color }) => (
          <div
            key={label}
            className={`flex items-center gap-3 rounded-xl bg-[linear-gradient(135deg,#D8EFFD_0%,#E9EDFE_100%)] px-4 py-4 ${SOFT_SHADOW}`}
          >
            <Icon className={`size-9 shrink-0 ${color}`} />
            <span>
              <span className={`block text-base font-bold ${color}`}>
                {label}
              </span>
              <span className="block text-2xl font-bold text-gray-900">
                {value}
              </span>
            </span>
          </div>
        ))}
      </div>

      {/* Documents table */}
      <div className={CARD}>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex gap-6 border-b border-gray-200">
            {tabs.map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`-mb-px border-b-2 px-1 pb-2 text-base font-bold ${
                  tab === t
                    ? "border-[#2495FF] text-[#2495FF]"
                    : "border-transparent text-gray-400"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
          <button className="flex items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-600">
            All Categories <ChevronDown className="size-4" />
          </button>
        </div>

        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[800px] text-left text-sm">
            <thead>
              <tr className="text-[#2495FF]">
                <th className="py-3 text-base font-bold">Document Name</th>
                <th className="py-3 text-base font-bold">Category</th>
                <th className="py-3 text-base font-bold">Uploaded On</th>
                <th className="py-3 text-base font-bold">Status</th>
                <th className="py-3 text-base font-bold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {visibleDocs.map((d, i) => (
                <tr key={i} className="border-t border-gray-100">
                  <td className="py-3">
                    <div className="flex items-center gap-3">
                      <span
                        className={`flex size-9 shrink-0 items-center justify-center rounded-lg text-[10px] font-bold text-white ${typeColor[d.type]}`}
                      >
                        {d.type}
                      </span>
                      <div>
                        <p className="font-bold text-gray-900">{d.name}</p>
                        <p className="text-xs text-gray-500">{d.file}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 text-gray-700">{d.category}</td>
                  <td className="py-3">
                    <p className="font-bold text-gray-900">{d.date}</p>
                    <p className="text-xs text-gray-500">{d.time}</p>
                  </td>
                  <td className="py-3">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-bold ${statusStyles[d.status]}`}
                    >
                      {d.status}
                    </span>
                  </td>
                  <td className="py-3">
                    <div className="flex items-center gap-3 text-gray-500">
                      <button aria-label="Download">
                        <Download className="size-4 text-orange-500" />
                      </button>
                      <button aria-label="Delete">
                        <Trash2 className="size-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-gray-500">
            Showing 1 to {visibleDocs.length} of 32 leads
          </p>
          <div className="flex items-center gap-2">
            <button className="flex size-9 items-center justify-center rounded-xl bg-[#D7E9FB] text-[#2495FF]">
              <ChevronLeft className="size-4" />
            </button>
            {[1, 2, 3].map((page) => (
              <button
                key={page}
                className={`flex size-9 items-center justify-center rounded-xl font-bold ${
                  page === 1
                    ? "bg-[#1E6FD9] text-white"
                    : "bg-[#D7E9FB] text-[#2495FF]"
                }`}
              >
                {page}
              </button>
            ))}
            <button className="flex size-9 items-center justify-center rounded-xl bg-[#D7E9FB] text-[#2495FF]">
              <ChevronRight className="size-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Guidelines + update panel */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div className={CARD}>
          <p className="flex items-center gap-2 text-lg font-bold text-[#2495FF]">
            <BookOpen className="size-5" /> Document Guidelines
          </p>
          <ul className="mt-3 space-y-2 text-sm text-gray-600">
            {guidelines.map((g) => (
              <li key={g}>{g}</li>
            ))}
          </ul>
        </div>

        <div className="rounded-xl bg-[#EAF3FF] p-4">
          <p className="flex items-center gap-2 text-lg font-bold text-gray-900">
            <RefreshCw className="size-5 text-orange-500" /> Need to update a
            document?
          </p>
          <p className="mt-2 text-sm text-gray-600">
            If your document has expired or information has changed, please
            upload the latest version for review.
          </p>
          <button
            className={`mt-4 flex items-center gap-2 rounded-full bg-white px-4 py-2.5 text-sm font-bold text-[#E1AB18] ${SOFT_SHADOW}`}
          >
            <UploadCloud className="size-5" />
            Upload New Document
          </button>
        </div>
      </div>
    </main>
  );
}
