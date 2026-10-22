"use client";

import Image, { type StaticImageData } from "next/image";
import { useState } from "react";
import {
  UploadCloud,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Users,
  PhoneCall,
  History,
  Plus,
  Heart,
  Briefcase,
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
  Coins,
  FileImage,
} from "lucide-react";
import totaldocumentsicon from "@/public/userpanelicons/totaldocumentsicon.svg";
import verifieddocumentsicons from "@/public/userpanelicons/verifieddocumentsicon.svg";
import pendingreviewicon from "@/public/userpanelicons/pendingreviewicon.svg";
import rejecteddocumentsicon from "@/public/userpanelicons/rejecteddocumenticon.svg";
import EmploymentIncomeicon from "@/public/userpanelicons/Employment&Income.svg";
import EmergencyContacticon from "@/public/userpanelicons/EmergencyContact.svg";
import folderrowicon from "@/public/agentpanelicons/leadmanagementOpenleads.svg";
import licenseicon from "@/public/agentpanelicons/profiledl.svg";
import calendaricon from "@/public/buycalender.svg";
import phoneicon from "@/public/contactformphoneicon.svg";
import mailicon from "@/public/contactemailicon.svg";
import documentsicon from "@/public/agentpanelicons/sidebardocumentsicon.svg";
import uploadDocumenticon from "@/public/agentpanelicons/documentuploaddocumenticon.svg";
import foldersicon from "@/public/userpanelicons/folders.svg";
import deleteicon from "@/public/userpanelicons/deleteicon.svg";
import downloadicon from "@/public/userpanelicons/downloadicon.svg";
import guidelinesicon from "@/public/userpanelicons/guidelinesicon.svg";

const SOFT_SHADOW = "shadow-[-8px_8px_16px_0_#999FB4,6px_-6px_12px_0_#FFFFFF]";
const CARD = `rounded-xl bg-white p-4 ${SOFT_SHADOW}`;

const stats = [
  {
    label: "Total Documents",
    value: 12,
    icon: totaldocumentsicon,
    color: "text-blue-500",
  },
  {
    label: "Verified Documents",
    value: 8,
    icon: verifieddocumentsicons,
    color: "text-green-500",
  },
  {
    label: "Pending Review",
    value: 2,
    icon: pendingreviewicon,
    color: "text-orange-500",
  },
  {
    label: "Rejected Documents",
    value: 1,
    icon: rejecteddocumentsicon,
    color: "text-red-500",
  },
];

const statusStyles: Record<string, string> = {
  VERIFIED: "bg-[#E6F8F0] text-[#17855C]",
  PENDING: "bg-[#FFF6DC] text-[#EA7A1E]",
  REJECTED: "bg-[#FDECEE] text-[#E52B24]",
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
const tabColor: Record<string, string> = {
  "All Documents": "text-[#2F63E0]",
  Verified: "text-[#17855C]",
  Pending: "text-[#EA7A1E]",
  Rejected: "text-[#E52B24]",
};

const sections = [
  { key: "household", label: 'Household "family or partners"', icon: Users },
  {
    key: "emergency",
    label: "Emergency Contact",
    icon: PhoneCall,
    img: EmergencyContacticon,
  },
  { key: "residential", label: "Residential History", icon: History },
  {
    key: "employment",
    label: "Employment & Income",
    icon: Briefcase,
    img: EmploymentIncomeicon,
  },
] as const;

const leaseholderFields = [
  { label: "Full Name", value: "Parker Realestate", img: licenseicon },
  { label: "Date Of Birth", value: "03/06/2000", img: calendaricon },
  {
    label: "Relationship To You ( Wife , Husband , son , father ,etc... )",
    value: "Married",
    icon: Heart,
  },
  {
    label: "Phone Number  ( Mobile preferred )",
    value: "0142 345 678",
    img: phoneicon,
  },
  { label: "Job (Occupation)", value: "Senior Real Estate Agent" },
  {
    label: "Email Address",
    value: "parker.realestate@gmail.com",
    img: mailicon,
  },
];

const occupantFields = [
  { label: "Occupant's Full Name", value: "Parker Realestate", img: licenseicon },
  {
    label: "Relationship To You ( Wife , Husband , son , father ,etc... )",
    value: "Married",
    icon: Heart,
  },
  { label: "Date Of Birth", value: "03/06/2000", img: calendaricon },
];

const petTypes = [
  { key: "dogs", label: "Dogs", icon: Dog },
  { key: "cats", label: "Cats", icon: Cat },
  { key: "other", label: "Other Pets", icon: Rabbit },
] as const;

const emergencyContactFields = [
  { label: "Full Name", value: "Parker Realestate", img: licenseicon },
  {
    label: "Relationship To You ( Wife , Husband , son , father ,etc... )",
    value: "Married",
    icon: Heart,
  },
  { label: "Phone Number", value: "0142 345 678", img: phoneicon },
  {
    label: "Email Address",
    value: "parker.realestate@gmail.com",
    img: mailicon,
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
    img: mailicon,
  },
  {
    label: "Real Estate Agent's Number",
    value: "0142 345 678",
    img: phoneicon,
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
  { label: "Employment Type", value: "Full Time" },
  { label: "Company Name", value: "Parker Realestate" },
  {
    label: "Job Title/Role",
    value: "Senior Real Estate Agent",
  },
  { label: "Reference Name", value: "Michael Parker" },
  { label: "Start Date", value: "03/06/2000" },
  { label: "Reference Number", value: "+61 412 345 678" },
  { label: "Income (weekly/monthly)", value: "$8500/month" },
  {
    label: "Reference E-mail",
    value: "michael.parker@parkerrealestategmail.com",
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

  // show a sliding window of 3 section tabs around the selected one
  const selected = sections.findIndex((x) => x.key === section);
  const start = selected >= 2 ? 1 : 0;
  const shownSections = sections.slice(start, start + 3);

  const visibleDocs =
    tab === "All Documents"
      ? documents
      : documents.filter((d) => d.status === tab.toUpperCase());

  return (
    <main className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <span className="flex w-fit items-center gap-2 rounded-lg border border-yellow-400 bg-white px-2 py-2 text-xl font-semibold text-[#E1AB18]">
            Documents
            <Image src={documentsicon} alt="" width={28} height={28} />
          </span>
          <p className="mt-2 italic text-gray-600">
            Manage your important documents and uploads
          </p>
        </div>
        {section === "documents" && (
          <button
            className={`flex items-center gap-2 rounded-lg border border-[#E1AB18] bg-white px-2 text-lg font-bold text-[#E1AB18] ${SOFT_SHADOW}`}
          >
            <Image
              src={uploadDocumenticon}
              alt="Upload Document"
              className="size-12"
            />
            Upload Document
          </button>
        )}
      </div>

      {/* Section tabs */}
      <div>
        <div
          className={`flex flex-nowrap items-end justify-between gap-4 -mx-2 overflow-x-auto px-2 pt-3 pb-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden`}
        >
          {shownSections.map(({ key, label, ...rest }, i) => {
            const img = "img" in rest ? rest.img : null;
            const imgEl = img && (
              <Image
                src={img}
                alt=""
                className="-my-6 hidden h-10 w-auto sm:block 2xl:h-14"
              />
            );
            const imgLeft = key === "emergency";
            const active = section === key;
            const isLast = i === shownSections.length - 1;
            return (
              <button
                key={key}
                onClick={() => setSection(active ? "documents" : key)}
                className={`relative flex min-w-0 flex-auto cursor-pointer items-center justify-center gap-2 border-2 px-2 py-3 text-center text-xs font-black sm:whitespace-nowrap sm:px-3 sm:py-4 sm:text-sm xl:text-lg 2xl:text-2xl leading-none text-[#0496FF] font-amasis  transition-colors ${
                  active
                    ? `z-10 -mb-5 border-b-0 border-[#8b8d94] bg-white !p-2 text-[#E1AB18] ${isLast ? "rounded-tr-xl" : "mr-5 border-r-0 !pr-0"} ${i === 0 ? "rounded-tl-3xl" : "ml-5 border-l-0 !pl-0"} drop-shadow-[-6px_-4px_10px_#999FB480]`
                    : `rounded-2xl border-transparent bg-[#F1F3F2] ${SOFT_SHADOW}`
                }`}
              >
                {active ? (
                  <>
                    <span className="relative z-10 flex flex-1 items-center justify-center rounded-xl border-2 border-[#E1AB18] px-2 py-2 sm:px-6 sm:py-3 shadow-[-4px_4px_8px_#999FB4]">
                      {imgLeft && imgEl}
                      {label}
                      {!imgLeft && imgEl && (
                        <span className="ml-4 hidden sm:flex">{imgEl}</span>
                      )}
                    </span>
                    {[false, true].map((left) =>
                      (left ? i === 0 : isLast) ? null : (
                        <svg
                          key={String(left)}
                          viewBox="0 0 48 100"
                          preserveAspectRatio="none"
                          className={`pointer-events-none absolute -top-px h-full w-12 overflow-visible ${left ? "right-full -mr-1 -scale-x-100" : "left-full -ml-1"}`}
                        >
                          <path
                            d="M0 0H6Q13 0 14 9L22 84Q24 100 40 100H48V103H0Z"
                            fill="#fff"
                          />
                          <path
                            d="M0 0H6Q13 0 14 9L22 84Q24 100 40 100H48"
                            fill="none"
                            stroke="#8b8d94"
                            strokeWidth="2"
                            vectorEffect="non-scaling-stroke"
                          />
                        </svg>
                      ),
                    )}
                  </>
                ) : (
                  <>
                    {imgLeft && imgEl}
                    {label}
                    {!imgLeft && imgEl}
                  </>
                )}
              </button>
            );
          })}
        </div>

        {section !== "documents" && (
          <div
            className={`-mt-0.5 rounded-xl ${section === shownSections[0].key ? "rounded-tl-none" : ""} ${section === shownSections[shownSections.length - 1].key ? "rounded-tr-none" : ""} border-2 border-[#8b8d94] bg-white p-3 shadow-[0_6px_12px_#999FB44D] sm:p-6`}
          >
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
                      <FieldBox key={f.label} {...f} compact />
                    ))}
                  </div>

                  <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                    <p className="text-sm text-gray-500">
                      Adjust the number of adults to add in your co-applicants
                      they will be invited once your application been accepted.
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
                    Please add people who will live with you but they will not
                    be on the lease
                  </p>

                  <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                    {occupantFields.map((f) => (
                      <FieldBox key={f.label} {...f} compact />
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
                        className={`flex min-h-[68px] items-center justify-between rounded-xl border border-[#E7ECF2] bg-white px-4 py-3 ${SOFT_SHADOW}`}
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
                  Most realestate agencies request an emergency contact who will
                  be contacted only in case of an emergency or if you are
                  unreachable.
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
                  Please add the details of your previous residential addresses
                  to help verify your details with a valid reference, your
                  history could include living with your parents, your partners
                  or the property you own.
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
                    <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl px-4 py-3">
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
                        img={calendaricon}
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
                  details. If you are self employed, please add your accountant
                  to enable verification
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
                    You must have this person consent to provide their personal
                    information to be contacted by the relevant agency during
                    business hours.
                  </p>
                </div>

                <div className={CARD}>
                  <p className="text-lg font-bold text-gray-900">Pay Slips:</p>
                  <p className="mt-1 text-gray-600">
                    Payslips: You shoud provide payslips to confirm your current
                    income to show your affordability to pay the rent. If you
                    are changing jobs, you should include the last payslips
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
                    List all your income spurces,such as wages ,money transfer
                    ,investments , pensions ,revenues ,support ,payments and
                    dividends.
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
                className={`flex min-h-16 items-center gap-3 rounded-xl border border-[#DCEBFA] bg-[linear-gradient(135deg,#D8EFFD_0%,#E9EDFE_100%)] px-4  ${SOFT_SHADOW}`}
              >
                <Image
                  src={Icon}
                  alt={label}
                  className={`size-12 shrink-0 ${color}`}
                />
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
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-[290px_minmax(0,1fr)]">
            <div className={`${CARD} border border-[#E7ECF2]`}>
              <p
                className={`flex items-center justify-between rounded-full bg-[#F1F3F2] px-6 py-2 text-xl font-black text-[#2495FF] font-amasis ${SOFT_SHADOW}`}
              >
                Folders{" "}
                <Image
                  src={foldersicon}
                  alt="folder"
                  className="-my-3 size-12"
                />
              </p>
              <div className="mt-4 space-y-3">
                {folders.map(({ label, count }) => (
                  <button
                    key={label}
                    onClick={() => setActiveFolder(label)}
                    className={`flex w-full cursor-pointer items-center justify-between gap-2 rounded-xl px-3 py-3 text-left font-[family-name:var(--font-inter)] text-lg font-semibold leading-none text-white [text-shadow:0_0_7.3px_rgba(0,0,0,0.6),1px_1px_2.1px_#000] border transition-all duration-300 ease-out ${
                      activeFolder === label
                        ? "border-[#E1AB18] bg-gray-200 shadow-[-8px_8px_16px_0_transparent,6px_-6px_12px_0_transparent]"
                        : `border-transparent bg-white ${SOFT_SHADOW}`
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <Image src={folderrowicon} alt="" className="size-5" />{" "}
                      {label}
                    </span>
                    <span className="flex size-5 items-center justify-center rounded-full bg-[#FF0000] text-[10px] font-bold text-white shadow-[0_6px_16px_rgba(255,77,103,0.4),-5px_5px_4.2px_rgba(255,0,0,0.3)]">
                      {count}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div className={`${CARD} min-w-0 border border-[#E7ECF2]`}>
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex max-w-full gap-4 overflow-x-auto whitespace-nowrap border-b border-gray-200 [scrollbar-width:none] sm:gap-6 [&::-webkit-scrollbar]:hidden">
                  {tabs.map((t) => (
                    <button
                      key={t}
                      onClick={() => setTab(t)}
                      className={`-mb-px border-b-2 px-1 pb-2 text-base font-bold cursor-pointer transition-colors ${tabColor[t]} ${
                        tab === t ? "border-current" : "border-transparent"
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

              <div className="mt-4 overflow-x-auto rounded-lg border border-[#EDF1F5]">
                <table className="w-full min-w-[700px] text-left text-sm">
                  <thead className="bg-[#F7FAFD]">
                    <tr className="text-[#2495FF]">
                      <th className="px-3 py-3 text-base font-bold">
                        Document Name
                      </th>
                      <th className="px-3 py-3 text-base font-bold">
                        Category
                      </th>
                      <th className="px-3 py-3 text-base font-bold">
                        Uploaded On
                      </th>
                      <th className="px-3 py-3 text-base font-bold">Status</th>
                      <th className="px-3 py-3 text-base font-bold">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#EDF1F5]">
                    {visibleDocs.map((d, i) => (
                      <tr
                        key={i}
                        className="transition-colors hover:bg-[#FAFCFE]"
                      >
                        <td className="px-3 py-3">
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
                              <p className="text-xs text-gray-500">{d.file}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-3 py-3 text-gray-700">
                          {d.category}
                        </td>
                        <td className="px-3 py-3">
                          <p className="font-bold text-gray-900">{d.date}</p>
                          <p className="text-xs text-gray-500">{d.time}</p>
                        </td>
                        <td className="px-3 py-3">
                          <span
                            className={`rounded-full px-5 py-2.5 text-sm font-semibold shadow-[0_4px_10px_rgba(0,0,0,0.08)] ${statusStyles[d.status]}`}
                          >
                            {d.status}
                          </span>
                        </td>
                        <td className="px-3 py-3">
                          <div className="flex items-center gap-3 text-gray-500">
                            <button aria-label="Download">
                              <Image
                                src={downloadicon}
                                alt="download"
                                className="size-8 text-orange-500"
                              />
                            </button>
                            <button aria-label="Delete">
                              <Image
                                src={deleteicon}
                                alt="delete"
                                className="size-8"
                              />
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
                  Showing 1 to {visibleDocs.length} of {visibleDocs.length}{" "}
                  documents
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
                Document Guidelines
                <Image
                  src={guidelinesicon}
                  alt="document guidelines"
                  className="size-8"
                />
              </p>
              <ul className="mt-3 space-y-2 text-sm text-gray-600">
                {guidelines.map((g) => (
                  <li key={g}>{g}</li>
                ))}
              </ul>
            </div>

            <div className={`flex flex-col rounded-3xl border border-[#E7ECF2] bg-[#EEF4FF] p-6 ${SOFT_SHADOW}`}>
              <p className="flex items-center gap-4 font-[family-name:var(--font-inter)] text-xl font-semibold text-[#0F1B33]">
                <span className="relative size-12 shrink-0 overflow-hidden">
                  <Image
                    src="/confirmbooking/imgImage1650.png"
                    alt=""
                    width={400}
                    height={400}
                    className="absolute max-w-none"
                    style={{ height: "103.16%", left: "-2.5%", top: 0, width: "105%" }}
                  />
                </span>
                Need to update a document?
              </p>
              <p className="mt-4 text-base text-slate-500">
                If your document has expired or information has changed, please
                upload the latest version for review.
              </p>
              <button
                className={`mt-auto ml-auto flex items-center gap-3 rounded-xl border-2 border-[#E1AB18] bg-white py-2 pr-6 pl-2 text-lg font-semibold text-[#E8C04A] ${SOFT_SHADOW}`}
              >
                <Image src={uploadDocumenticon} alt="" className="size-10" />
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
  img,
  bordered = true,
  shadow = true,
  compact = false,
}: {
  label: string;
  value: string;
  icon?: React.ComponentType<{ className?: string }>;
  img?: StaticImageData;
  bordered?: boolean;
  shadow?: boolean;
  compact?: boolean;
}) {
  return (
    <div
      className={`flex items-center justify-between gap-3 bg-white ${compact ? "min-h-[58px] rounded-lg px-3 py-2" : "rounded-xl px-4 py-3"} ${bordered ? "border border-yellow-400" : ""} ${shadow ? SOFT_SHADOW : ""}`}
    >
      <div className="min-w-0">
        <p
          className={`flex items-center gap-1.5 text-gray-500 ${compact ? "text-xs" : "text-sm"}`}
        >
          <CheckCircle2 className="size-4 text-green-500" /> {label}
        </p>
        <p
          className={`mt-1 break-words font-bold text-gray-900 ${compact ? "text-sm" : "text-lg"}`}
        >
          {value}
        </p>
      </div>
      {img && (
        <Image
          src={img}
          alt=""
          className={`shrink-0 object-contain ${compact ? "h-8 w-12" : "h-10 w-14"}`}
        />
      )}
      {Icon && (
        <Icon
          className={`shrink-0 text-[#2495FF] ${compact ? "size-5" : "size-8"}`}
        />
      )}
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
