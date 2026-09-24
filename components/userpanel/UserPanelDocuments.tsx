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
  Folder,
  Users,
  PhoneCall,
  History,
  Plus,
  IdCard,
  Calendar,
  Heart,
  Phone,
  Briefcase,
  Mail,
  PawPrint,
  Dog,
  Cat,
  Rabbit,
  ChevronUp,
  MapPin,
  Building2,
  User,
  Hash,
  CalendarCheck,
  Info,
  DollarSign,
  Coins,
  FileImage,
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

const sections = [
  { key: "household", label: 'Household "family or partners"', icon: Users },
  { key: "emergency", label: "Emergency Contact", icon: PhoneCall },
  { key: "residential", label: "Residential History", icon: History },
  { key: "employment", label: "Employment & Income", icon: Briefcase },
] as const;

const leaseholderFields = [
  { label: "Full Name", value: "Parker Realestate", icon: IdCard },
  { label: "Date Of Birth", value: "03/06/2000", icon: Calendar },
  {
    label: "Relationship To You ( Wife , Husband , son , father ,etc... )",
    value: "Married",
    icon: Heart,
  },
  {
    label: "Phone Number  ( Mobile preferred )",
    value: "0142 345 678",
    icon: Phone,
  },
  { label: "Job (Occupation)", value: "Senior Real Estate Agent", icon: Briefcase },
  {
    label: "Email Address",
    value: "parker.realestate@gmail.com",
    icon: Mail,
  },
];

const occupantFields = [
  { label: "Occupant's Full Name", value: "Parker Realestate", icon: IdCard },
  {
    label: "Relationship To You ( Wife , Husband , son , father ,etc... )",
    value: "Married",
    icon: Heart,
  },
  { label: "Date Of Birth", value: "03/06/2000", icon: Calendar },
];

const petTypes = [
  { key: "dogs", label: "Dogs", icon: Dog },
  { key: "cats", label: "Cats", icon: Cat },
  { key: "other", label: "Other Pets", icon: Rabbit },
] as const;

const emergencyContactFields = [
  { label: "Full Name", value: "Parker Realestate", icon: IdCard },
  {
    label: "Relationship To You ( Wife , Husband , son , father ,etc... )",
    value: "Married",
    icon: Heart,
  },
  { label: "Phone Number", value: "0142 345 678", icon: Phone },
  {
    label: "Email Address",
    value: "parker.realestate@gmail.com",
    icon: Mail,
  },
];

const currentAddressFields = [
  { label: "Current address", value: "123,Broadway,1001,NY,USA", icon: MapPin },
  {
    label: "Real Estate Agency",
    value: "Parker Real Estate Group",
    icon: Building2,
  },
  { label: "Agent's Name", value: "Michael", icon: User },
  { label: "Agent's Number", value: "PN12345VB", icon: Hash },
];

const previousAddressFields = [
  {
    label: "Previous Residential address",
    value: "11,Brokeline,1001,NY,USA",
    icon: MapPin,
  },
  {
    label: "Real Estate Agency",
    value: "Parker Real Estate Group",
    icon: Building2,
  },
  { label: "Real Estate Agent's Name", value: "Mark", icon: User },
  {
    label: "Residential Email Address",
    value: "parker.realestate@gmail.com",
    icon: Mail,
  },
  {
    label: "Real Estate Agent's Number",
    value: "0142 345 678",
    icon: Phone,
  },
];

const leaseTermOptions = [
  { label: "6", sub: "months" },
  { label: "12", sub: "months\n(one year)" },
  { label: "24", sub: "months\n(two year)" },
  { label: "36", sub: "months\n(three year)" },
];

const rentPeriodOptions = [
  { label: "Weekly", sub: "every week" },
  { label: "Fortnightly", sub: "(2 weeks)" },
  { label: "Monthly", sub: "Once a month" },
];

const employmentFields = [
  { label: "Employment Type", value: "Full Time", icon: Briefcase },
  { label: "Company Name", value: "Parker Realestate", icon: Building2 },
  {
    label: "Job Title/Role",
    value: "Senior Real Estate Agent",
    icon: IdCard,
  },
  { label: "Reference Name", value: "Michael Parker", icon: User },
  { label: "Start Date", value: "03/06/2000", icon: Calendar },
  { label: "Reference Number", value: "+61 412 345 678", icon: Phone },
  { label: "Income (weekly/monthly)", value: "$8500/month", icon: DollarSign },
  {
    label: "Reference E-mail",
    value: "michael.parker@parkerrealestategmail.com",
    icon: Mail,
  },
];

const folders = [
  { label: "Identity Documents", count: 2 },
  { label: "Employment", count: 8 },
  { label: "Finances", count: 7 },
  { label: "Address History", count: 5 },
  { label: "Archived", count: 0 },
];

const guidelines = [
  "Upload clear and readable documents.",
  "Supported formats: PDF, JPG, PNG (Max 10MB per file)",
  "Ensure all information is accurate and up to date.",
  "Documents are securely encrypted and protected.",
];

export default function UserPanelDocuments() {
  const [tab, setTab] = useState("All Documents");
  const [activeFolder, setActiveFolder] = useState(folders[0].label);
  const [section, setSection] = useState<
    "documents" | (typeof sections)[number]["key"]
  >("documents");
  const [pets, setPets] = useState<Record<string, number>>({
    dogs: 1,
    cats: 1,
    other: 1,
  });
  const [leaseTerm, setLeaseTerm] = useState<string | null>(null);
  const [rentPeriod, setRentPeriod] = useState<string | null>(null);

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

      {/* Section tabs */}
      <div className={CARD}>
        <div className="flex flex-wrap gap-4">
          {sections.map(({ key, label, icon: Icon }) => {
            const active = section === key;
            return (
              <button
                key={key}
                onClick={() => setSection(active ? "documents" : key)}
                className={`flex items-center gap-2 rounded-xl px-4 py-3 text-base font-bold text-[#2495FF] ${
                  active
                    ? "border border-yellow-400 bg-white"
                    : `bg-white ${SOFT_SHADOW}`
                }`}
              >
                <Icon className="size-5" />
                {label}
              </button>
            );
          })}
        </div>

        {section !== "documents" && (
          <div className="mt-4 border-t border-gray-100 pt-4">
            {section === "household" && (
              <div className="space-y-6">
                <p className="text-gray-700">
                  Please add the details of all people you plan to live with
                  including leaseholder or occupants including children and
                  other dependent.
                </p>

                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="flex items-center gap-2 rounded-full bg-green-50 px-3 py-2 text-base font-bold text-[#2495FF]">
                      <Plus className="size-5 rounded-full bg-green-500 p-0.5 text-white" />
                      Add Leaseholder(s):
                    </span>
                    <p className="italic text-gray-500">
                      Please add all people who will be on the lease.
                    </p>
                  </div>

                  <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                    {leaseholderFields.map((f) => (
                      <FieldBox key={f.label} {...f} />
                    ))}
                  </div>

                  <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                    <p className="text-sm text-gray-500">
                      Adjust the number of adults to add in your co-applicants
                      they will be invited once your application been
                      accepted.
                    </p>
                    <button
                      className={`flex items-center gap-2 rounded-full bg-white px-4 py-2.5 text-sm font-bold text-gray-900 ${SOFT_SHADOW}`}
                    >
                      <Plus className="size-4 rounded-full bg-yellow-400 p-0.5" />
                      Add lease holder
                    </button>
                  </div>
                </div>

                <div>
                  <span className="flex items-center gap-2 rounded-full bg-blue-50 px-3 py-2 text-base font-bold text-[#2495FF]">
                    <Plus className="size-5 rounded-full bg-green-500 p-0.5 text-white" />
                    Add Occupants:
                  </span>
                  <p className="mt-2 italic text-gray-500">
                    Please add people who will live with you but they will
                    not be on the lease
                  </p>

                  <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                    {occupantFields.map((f) => (
                      <FieldBox key={f.label} {...f} />
                    ))}
                    <button
                      className={`flex items-center justify-center gap-2 self-start rounded-full bg-white px-4 py-2.5 text-sm font-bold text-gray-900 ${SOFT_SHADOW}`}
                    >
                      <Plus className="size-4 rounded-full bg-yellow-400 p-0.5" />
                      Add another occupant
                    </button>
                  </div>
                </div>

                <div>
                  <p className="flex items-center gap-2 text-xl font-bold text-[#2495FF]">
                    <PawPrint className="size-6" /> Pets
                  </p>
                  <p className="mt-2 text-gray-600">
                    Please let the property managed know if you have pet :
                  </p>
                  <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-3">
                    {petTypes.map(({ key, label, icon: Icon }) => (
                      <div
                        key={key}
                        className={`flex items-center justify-between rounded-xl bg-white px-4 py-3 ${SOFT_SHADOW}`}
                      >
                        <span className="flex items-center gap-2 text-lg font-bold text-gray-900">
                          <Icon className="size-6 text-[#2495FF]" />
                          {label}
                        </span>
                        <div className="flex items-center gap-2">
                          <span className="text-lg font-bold text-gray-900">
                            {pets[key]}
                          </span>
                          <div className="flex flex-col">
                            <button
                              aria-label={`Increase ${label}`}
                              onClick={() =>
                                setPets((p) => ({ ...p, [key]: p[key] + 1 }))
                              }
                            >
                              <ChevronUp className="size-4 text-yellow-500" />
                            </button>
                            <button
                              aria-label={`Decrease ${label}`}
                              onClick={() =>
                                setPets((p) => ({
                                  ...p,
                                  [key]: Math.max(0, p[key] - 1),
                                }))
                              }
                            >
                              <ChevronDown className="size-4 text-yellow-500" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {section === "emergency" && (
              <div className="space-y-4">
                <p className="italic text-gray-500">
                  Most realestate agencies request an emergency contact who
                  will be contacted only in case of an emergency or if you
                  are unreachable.
                </p>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  {emergencyContactFields.map((f) => (
                    <FieldBox key={f.label} {...f} />
                  ))}
                </div>
                <div className="flex justify-end">
                  <button
                    className={`flex items-center gap-2 rounded-full bg-white px-4 py-2.5 text-sm font-bold text-gray-900 ${SOFT_SHADOW}`}
                  >
                    <Plus className="size-4 rounded-full bg-yellow-400 p-0.5" />
                    Add another contact
                  </button>
                </div>
              </div>
            )}

            {section === "residential" && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  {currentAddressFields.map((f) => (
                    <FieldBox key={f.label} {...f} />
                  ))}
                </div>

                <p className="italic text-gray-500">
                  Please add the details of your previous residential
                  addresses to help verify your details with a valid
                  reference, your history could include living with your
                  parents, your partners or the property you own.
                </p>

                <div className="space-y-4 rounded-xl border border-yellow-400 p-4">
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    {previousAddressFields.map((f) => (
                      <FieldBox
                        key={f.label}
                        {...f}
                        bordered={false}
                        shadow={false}
                      />
                    ))}
                    <div className="flex items-center justify-between gap-3 rounded-xl px-4 py-3">
                      <div>
                        <p className="flex items-center gap-1.5 text-sm font-bold text-green-600">
                          Check-in
                        </p>
                        <p className="text-lg font-bold text-gray-900">
                          May 24, 2025
                        </p>
                      </div>
                      <CalendarCheck className="size-8 shrink-0 text-green-500" />
                      <div className="text-right">
                        <p className="text-sm font-bold text-red-500">
                          Check-out
                        </p>
                        <p className="text-lg font-bold text-gray-900">
                          May 24, 2025
                        </p>
                      </div>
                      <CalendarCheck className="size-8 shrink-0 text-red-500" />
                    </div>
                  </div>
                  <FieldBox
                    label="Reasons of leaving"
                    value="abc"
                    bordered={false}
                    shadow={false}
                  />
                </div>

                <div className="flex justify-end">
                  <button
                    className={`flex items-center gap-2 rounded-full bg-white px-4 py-2.5 text-sm font-bold text-gray-900 ${SOFT_SHADOW}`}
                  >
                    <Plus className="size-4 rounded-full bg-yellow-400 p-0.5" />
                    Add another address
                  </button>
                </div>

                <div>
                  <p className="text-xl font-bold text-[#2495FF]">
                    Rental Preferrences
                  </p>
                  <div className={`mt-3 space-y-4 ${CARD}`}>
                    <div className="grid grid-cols-1 items-center gap-3 md:grid-cols-[220px_1fr]">
                      <div>
                        <p className="font-bold text-gray-900">Lease Term:</p>
                        <p className="text-sm italic text-gray-500">
                          Select Your Preference
                        </p>
                      </div>
                      <PillGroup
                        options={leaseTermOptions}
                        selected={leaseTerm}
                        onSelect={setLeaseTerm}
                      />
                    </div>

                    <div className="grid grid-cols-1 items-center gap-3 md:grid-cols-[220px_1fr]">
                      <p className="font-bold text-gray-900">Lease Start:</p>
                      <FieldBox
                        label="Move in date"
                        value="03/06/2026"
                        icon={Calendar}
                      />
                    </div>

                    <div className="grid grid-cols-1 items-center gap-3 md:grid-cols-[220px_1fr]">
                      <div>
                        <p className="font-bold text-gray-900">
                          Rent Payment Period:
                        </p>
                        <p className="text-sm italic text-gray-500">
                          You would like to pay rent
                        </p>
                      </div>
                      <PillGroup
                        options={rentPeriodOptions}
                        selected={rentPeriod}
                        onSelect={setRentPeriod}
                      />
                    </div>
                  </div>
                </div>

                <UploadBox
                  title="Tenant Ledger"
                  description="Please upload all your tenant ledgers to show the agent and landlord rental history and to prove that you pay your rent on time according to the rental agreement."
                  buttonLabel="Upload tenant Ledger"
                />
              </div>
            )}

            {section === "employment" && (
              <div className="space-y-6">
                <p className="text-gray-700">
                  If you are currently employed, please add your employment
                  details. If you are self employed, please add your
                  accountant to enable verification
                </p>

                <div>
                  <p className="text-lg font-bold text-[#2495FF]">
                    Employment Details:
                  </p>
                  <div className="mt-3 grid grid-cols-1 gap-4 md:grid-cols-2">
                    {employmentFields.map((f) => (
                      <FieldBox key={f.label} {...f} />
                    ))}
                  </div>
                </div>

                <div className="flex items-start gap-2 rounded-xl bg-blue-50 p-3">
                  <Info className="size-5 shrink-0 text-[#2495FF]" />
                  <p className="italic text-gray-600">
                    You must have this person consent to provide their
                    personal information to be contacted by the relevant
                    agency during business hours.
                  </p>
                </div>

                <div className={CARD}>
                  <p className="text-lg font-bold text-gray-900">
                    Pay Slips:
                  </p>
                  <p className="mt-1 text-gray-600">
                    Payslips: You shoud provide payslips to confirm your
                    current income to show your affordability to pay the
                    rent. If you are changing jobs, you should include the
                    last payslips
                  </p>
                  <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
                    {Array.from({ length: 6 }).map((_, i) => (
                      <div
                        key={i}
                        className="flex aspect-[3/4] items-center justify-center rounded-lg border border-gray-200 bg-gray-50"
                      >
                        <FileImage className="size-8 text-gray-300" />
                      </div>
                    ))}
                  </div>
                  <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
                    <p className="text-sm italic text-gray-500">
                      Please note that your payslips won&apos;t be able to be
                      cross-checked against your employment details.
                    </p>
                    <button
                      className={`flex items-center gap-2 rounded-full bg-white px-4 py-2.5 text-sm font-bold text-[#E1AB18] ${SOFT_SHADOW}`}
                    >
                      <UploadCloud className="size-5" />
                      Upload Payslip
                    </button>
                  </div>
                </div>

                <div>
                  <p className="flex items-center gap-2 text-xl font-bold text-[#2495FF]">
                    <Coins className="size-6" /> Income
                  </p>
                  <p className="mt-2 text-gray-700">
                    List all your income spurces,such as wages ,money
                    transfer ,investments , pensions ,revenues ,support
                    ,payments and dividends.
                  </p>
                  <div className="mt-3 flex justify-end">
                    <button
                      className={`flex items-center gap-2 rounded-full bg-white px-4 py-2.5 text-sm font-bold text-gray-900 ${SOFT_SHADOW}`}
                    >
                      <Plus className="size-4 rounded-full bg-yellow-400 p-0.5" />
                      Add income source
                    </button>
                  </div>
                </div>

                <UploadBox
                  title="Rent Payment Affordability :"
                  description="Attach three recent payslips or other supporting documents to show the agent and landlord that you always pay rent on time"
                  disclaimer="If you will attach bank statements, please hide all your account details"
                  buttonLabel="Upload document"
                />
              </div>
            )}
          </div>
        )}
      </div>

      {section === "documents" && (
        <>
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

          {/* Folders + documents table */}
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-[220px_1fr]">
            <div className={CARD}>
              <p className="flex items-center gap-2 text-lg font-bold text-[#2495FF]">
                Folders <Folder className="size-5" />
              </p>
              <div className="mt-3 space-y-2">
                {folders.map(({ label, count }) => (
                  <button
                    key={label}
                    onClick={() => setActiveFolder(label)}
                    className={`flex w-full items-center justify-between gap-2 rounded-lg px-3 py-2.5 text-left text-sm font-bold ${
                      activeFolder === label
                        ? "bg-amber-50 text-amber-600"
                        : "text-gray-600"
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <Folder className="size-4" /> {label}
                    </span>
                    <span className="flex size-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
                      {count}
                    </span>
                  </button>
                ))}
              </div>
            </div>

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
                      <th className="py-3 text-base font-bold">
                        Document Name
                      </th>
                      <th className="py-3 text-base font-bold">Category</th>
                      <th className="py-3 text-base font-bold">
                        Uploaded On
                      </th>
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
                              <p className="font-bold text-gray-900">
                                {d.name}
                              </p>
                              <p className="text-xs text-gray-500">
                                {d.file}
                              </p>
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
                <RefreshCw className="size-5 text-orange-500" /> Need to
                update a document?
              </p>
              <p className="mt-2 text-sm text-gray-600">
                If your document has expired or information has changed,
                please upload the latest version for review.
              </p>
              <button
                className={`mt-4 flex items-center gap-2 rounded-full bg-white px-4 py-2.5 text-sm font-bold text-[#E1AB18] ${SOFT_SHADOW}`}
              >
                <UploadCloud className="size-5" />
                Upload New Document
              </button>
            </div>
          </div>
        </>
      )}
    </main>
  );
}

function FieldBox({
  label,
  value,
  icon: Icon,
  bordered = true,
  shadow = true,
}: {
  label: string;
  value: string;
  icon?: React.ComponentType<{ className?: string }>;
  bordered?: boolean;
  shadow?: boolean;
}) {
  return (
    <div
      className={`flex items-center justify-between gap-3 rounded-xl bg-white px-4 py-3 ${bordered ? "border border-yellow-400" : ""} ${shadow ? SOFT_SHADOW : ""}`}
    >
      <div>
        <p className="flex items-center gap-1.5 text-sm text-gray-500">
          <CheckCircle2 className="size-4 text-green-500" /> {label}
        </p>
        <p className="mt-1 text-lg font-bold text-gray-900">{value}</p>
      </div>
      {Icon && <Icon className="size-8 shrink-0 text-[#2495FF]" />}
    </div>
  );
}

function PillGroup({
  options,
  selected,
  onSelect,
}: {
  options: { label: string; sub: string }[];
  selected: string | null;
  onSelect: (label: string) => void;
}) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
      {options.map(({ label, sub }) => (
        <button
          key={label}
          onClick={() => onSelect(label)}
          className={`rounded-xl border px-3 py-2 text-center ${
            selected === label
              ? "border-[#2495FF] bg-blue-50"
              : "border-gray-200 bg-white"
          }`}
        >
          <span className="block font-bold text-gray-900">{label}</span>
          <span className="block whitespace-pre-line text-xs text-gray-500">
            {sub}
          </span>
        </button>
      ))}
    </div>
  );
}

function UploadBox({
  title,
  description,
  disclaimer,
  buttonLabel,
}: {
  title: string;
  description: string;
  disclaimer?: string;
  buttonLabel: string;
}) {
  return (
    <div>
      <p className="text-xl font-bold text-[#2495FF]">{title}</p>
      <p className="mt-2 text-gray-700">{description}</p>
      {disclaimer && (
        <p className="mt-1 text-red-500">
          <span className="font-bold">Disclaimer : </span>
          <span className="italic text-gray-500">{disclaimer}</span>
        </p>
      )}
      <div className="mt-3 flex items-center justify-end rounded-xl border border-yellow-400 p-4">
        <button
          className={`flex items-center gap-2 rounded-full bg-white px-4 py-2.5 text-sm font-bold text-[#E1AB18] ${SOFT_SHADOW}`}
        >
          <UploadCloud className="size-5" />
          {buttonLabel}
        </button>
      </div>
    </div>
  );
}
