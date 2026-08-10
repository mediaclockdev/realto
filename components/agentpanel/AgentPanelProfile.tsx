import Image, { type StaticImageData } from "next/image";
import {
  CheckCircle2,
  XCircle,
  PenLine,
  Languages as LanguagesIcon,
  Link2,
} from "lucide-react";

import avatar from "@/public/agentimg1.jpg";
import linkedinIcon from "@/public/logos_linkedin.svg";
import instagramIcon from "@/public/logos_instagram.svg";
import facebookIcon from "@/public/logos_facebook.svg";
import whatsappIcon from "@/public/whatsapp.svg";
import twitterIcon from "@/public/logos_twitter.svg";
import youtubeIcon from "@/public/logos_youtube-icon.svg";
import tiktokIcon from "@/public/tiktok.svg";
import snapchatIcon from "@/public/snapchat.svg";
import tumblrIcon from "@/public/tumbluriconhotel.svg";

import austrilaFlag from "@/public/austrilaflag.svg";
import chinaFlag from "@/public/chinaflag1.svg";
import franceFlag from "@/public/Franceflag.svg";
import indiaFlag from "@/public/India.svg";
import earthIcon from "@/public/earth.svg";
import spainFlag from "@/public/spain.svg";
import vietnamFlag from "@/public/vietnam.svg";
import serbiaFlag from "@/public/serbia.svg";
import greekFlag from "@/public/greek.svg";
import malaysianFlag from "@/public/malasyianflag.svg";
import germanFlag from "@/public/germanyflag.svg";
import thaiFlag from "@/public/thailandflag.svg";
import israelFlag from "@/public/israelflag.svg";
import italyFlag from "@/public/italy.svg";
import indonesianFlag from "@/public/indonesianflag.svg";
import turkishFlag from "@/public/turkishflag.svg";
import portugueseFlag from "@/public/portuguese.svg";
import koreanFlag from "@/public/koreanflag.svg";
import cambodiaFlag from "@/public/cambodia.svg";
import iranFlag from "@/public/iranflag.svg";
import profileicon from "@/public/agentpanelicons/sidebarprofileicon.svg";
import totaldealsicon from "@/public/agentpanelicons/profiletotaldealsicon.svg";
import activelistingicon from "@/public/agentpanelicons/profileactivelistingicon.svg";
import totalrevenueicon from "@/public/agentpanelicons/profiletotalrevenueicon.svg";
import clientratingicon from "@/public/agentpanelicons/profileclientratingicon.svg";
import camericon from "@/public/agentpanelicons/profilecameraicon.svg";
import licenseIcon from "@/public/agentpanelicons/profiledl.svg";
import mailIcon from "@/public/agentpanelicons/profilemailicon.svg";
import mobileIcon from "@/public/agentpanelicons/profilephoneicon.svg";
import telephoneIcon from "@/public/agentpanelicons/profiletelephoneicon.svg";
import locationIcon from "@/public/agentpanelicons/profilelocationicon.svg";
import globeIcon from "@/public/agentpanelicons/profileglobalicon.svg";
// same Figma token as the dashboard tiles
// section shell: white + the two outer drop shadows (no inner shadow)
const SECTION =
  "rounded-xl bg-white p-4 shadow-[-8px_8px_16px_0_#999FB4,6px_-6px_12px_0_#FFFFFF]";

const HEADING_PILL =
  "inline-flex items-center gap-3 rounded-full bg-[#F1F3F2] px-8 py-2.5 text-3xl font-bold text-[#2495FF] shadow-[-8px_8px_16px_0_#999FB4,6px_-6px_12px_0_#FFFFFF]";

const TILE =
  "bg-[linear-gradient(135deg,#D8EFFD_0%,#E9EDFE_100%)] shadow-[-8px_8px_16px_0_#999FB4,6px_-6px_12px_0_#FFFFFF,inset_0_4px_4px_0_rgba(43,108,176,0.2)]";

const stats = [
  {
    label: "Total Deals",
    value: "87",
    icon: totaldealsicon,
    color: "bg-orange-100 text-orange-500",
  },
  {
    label: "Total Revenue",
    value: "$4.7M",
    icon: totalrevenueicon,
    color: "bg-green-100 text-green-500",
  },
  {
    label: "Active Listings",
    value: "12",
    icon: activelistingicon,
    color: "bg-green-100 text-green-500",
  },
  {
    label: "Client Ratings",
    value: "3.8",
    icon: clientratingicon,
    color: "bg-yellow-100 text-yellow-500",
  },
];

const personalFields = [
  {
    label: "Full Name",
    value: "Parker Realestate",
    image: licenseIcon,
    valid: true,
  },
  {
    label: "Email Address",
    value: "parker.realestate@gmail.com",
    image: mailIcon,
    valid: true,
  },
  {
    label: "Phone Number",
    value: "0142 345 678",
    image: mobileIcon,
    valid: true,
  },
  {
    label: "Landline",
    value: "03 9123 4567",
    image: telephoneIcon,
    valid: true,
  },
  {
    label: "Address",
    value: "123 Broadway, New York, NY 10001, USA",
    image: locationIcon,
    valid: true,
    full: true,
  },
  {
    label: "Company Name",
    value: "Parker Realestate Group",

    valid: true,
  },
  {
    label: "Your Title",
    value: "Senior Real Estate Agent",

    valid: true,
  },
  {
    label: "Website",
    value: "www.parkerrealestate.com",
    image: globeIcon,
    valid: false,
    full: true,
  },
  { label: "License No.", value: "#12345678", valid: false },
  { label: "Total Experience (Years)", value: "9", valid: false },
];

const bio = {
  label: "About / Bio",
  value:
    "Experienced real estate agent specializing in residential and commercial properties. Helping clients find their perfect space with dedicated expertise and a track record of success in the New York market.",
  valid: false,
};

const socialLinks: { label: string; image?: StaticImageData }[] = [
  { label: "LinkedIn", image: linkedinIcon },
  { label: "Instagram", image: instagramIcon },
  { label: "Facebook", image: facebookIcon },
  { label: "Whatsapp", image: whatsappIcon },
  { label: "X", image: twitterIcon },
  { label: "Youtube", image: youtubeIcon },
  { label: "Tik Tok", image: tiktokIcon },
  { label: "Snapchat", image: snapchatIcon },
  { label: "Vimeo" },
  { label: "Tumbler", image: tumblrIcon },
];

const languages = [
  {
    name: "Australia",
    native: "English",
    level: "Native",
    flag: austrilaFlag,
    checked: true,
  },
  { name: "Chinese", native: "普通话", level: "Basic", flag: chinaFlag },
  {
    name: "French",
    native: "Français",
    level: "Conversational",
    flag: franceFlag,
  },
  { name: "Indian", native: "हिन्दी", level: "Basic", flag: indiaFlag },
  { name: "Arabic", native: "عربي", level: "Fluent", flag: earthIcon },
  { name: "Spanish", native: "Español", level: "Fluent", flag: spainFlag },
  {
    name: "Vietnamese",
    native: "Tiếng Việt",
    level: "Basic",
    flag: vietnamFlag,
  },
  { name: "Serbian", native: "Српски", level: "Basic", flag: serbiaFlag },
  { name: "Greek", native: "Ελληνικά", level: "Basic", flag: greekFlag },
  {
    name: "Malaysian",
    native: "Bahasa Melayu",
    level: "Basic",
    flag: malaysianFlag,
  },
  { name: "German", native: "Deutsch", level: "Basic", flag: germanFlag },
  { name: "Thai", native: "ไทย", level: "Basic", flag: thaiFlag },
  { name: "Hebrew", native: "עברית", level: "Basic", flag: israelFlag },
  { name: "Italian", native: "Italiano", level: "Basic", flag: italyFlag },
  {
    name: "Indonesian",
    native: "Bahasa Indonesia",
    level: "Basic",
    flag: indonesianFlag,
  },
  { name: "Turkish", native: "Türkçe", level: "Basic", flag: turkishFlag },
  {
    name: "Portuguese",
    native: "Português",
    level: "Basic",
    flag: portugueseFlag,
  },
  { name: "Korean", native: "한국어", level: "Basic", flag: koreanFlag },
  { name: "Cambodian", native: "ខ្មែរ", level: "Basic", flag: cambodiaFlag },
  { name: "Persian", native: "فارسی", level: "Basic", flag: iranFlag },
];

function StatusDot({ valid }: { valid: boolean }) {
  return valid ? (
    <CheckCircle2 className="size-4 shrink-0 fill-green-500 text-white" />
  ) : (
    <XCircle className="size-4 shrink-0 fill-red-500 text-white" />
  );
}

function FieldBox({
  label,
  value,
  image,
  valid,
  full,
}: {
  label: string;
  value: string;
  image?: StaticImageData;
  valid: boolean;
  full?: boolean;
}) {
  return (
    <div
      className={`flex items-start justify-between gap-3 rounded-2xl border-2 border-[#E1AB18] px-4 py-2.5 ${
        full ? "sm:col-span-2" : ""
      }`}
    >
      <div className="min-w-0">
        <p className="flex items-center gap-1.5 text-sm text-gray-500">
          <StatusDot valid={valid} />
          {label}
        </p>
        <p className="mt-0.5 truncate text-xl text-gray-900">{value}</p>
      </div>

      {image && (
        <Image src={image} alt="" className="size-9 shrink-0 object-contain" />
      )}
    </div>
  );
}

export default function AgentPanelProfile() {
  return (
    <main className="space-y-5">
      <div>
        <p className="flex w-40 items-center justify-between gap-2 rounded-lg border border-yellow-400 bg-white px-2 py-2 font-bold text-[#E1AB18]">
          Profile
          <Image src={profileicon} alt="profile icon" width={32} height={32} />
        </p>
        <p className="mt-2 italic text-[#64748B] font-normal">
          Manage your personal information and account settings.
        </p>
      </div>

      {/* Profile header + stats */}
      <div className={SECTION}>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="relative">
              <Image
                src={avatar}
                alt="Parker Realestate"
                className="size-60 rounded-full object-cover"
              />
              <button
                className="absolute bottom-0 right-0"
                aria-label="Change photo"
              >
                <Image
                  src={camericon}
                  alt="camera icon"
                  className="size-auto "
                />
              </button>
            </div>
            <div>
              <p className="text-3xl font-bold text-[#2495FF]">
                Parker Realestate
              </p>
              <p className="text-lg text-[#424656] font-medium">
                Senior Real Estate Agent • New York, USA
              </p>
              <p className="text-base text-[#737687] font-medium">
                Member since Jan 2026
              </p>
            </div>
          </div>
          <button className="flex items-center gap-2 rounded-lg border border-yellow-400 bg-white px-4 py-2 text-sm font-bold text-gray-900">
            <PenLine className="size-4 text-yellow-500" />
            Edit Profile
          </button>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-4 border-t border-gray-200 pt-4 lg:grid-cols-4">
          {stats.map(({ label, value, icon: Icon }) => (
            <div
              key={label}
              className={`flex items-center gap-3 rounded-xl ${TILE} p-4`}
            >
              <Image src={Icon} alt="icons" className="size-12" />

              <div>
                <p className="text-xs text-gray-500">{label}</p>
                <p className="text-lg font-bold text-gray-900">{value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-[1fr_340px]">
        {/* Left column */}
        <div className="space-y-5">
          <div className="rounded-xl bg-white p-4 shadow-sm">
            <p className={HEADING_PILL}>Personal Information</p>
            <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {personalFields.map((field) => (
                <FieldBox key={field.label} {...field} />
              ))}
              <div className="rounded-2xl border-2 border-[#E1AB18] px-4 py-2.5 sm:col-span-2">
                <p className="flex items-center gap-1.5 text-sm text-gray-500">
                  <StatusDot valid={bio.valid} />
                  {bio.label}
                </p>
                <p className="mt-0.5 text-xl text-gray-900">{bio.value}</p>
              </div>
            </div>
          </div>

          <div className={SECTION}>
            <p className={HEADING_PILL}>
              <Link2 className="size-8 text-[#E1AB18]" />
              Social Media Links
            </p>
            <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {socialLinks.map(({ label, image }) => (
                <label
                  key={label}
                  className="flex items-center justify-between gap-3 rounded-2xl border-2 border-[#E1AB18] px-4 py-2.5"
                >
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm text-gray-500">{label}</span>
                    <input
                      type="text"
                      placeholder="Enter Link"
                      className="mt-0.5 w-full text-xl text-gray-900 outline-none placeholder:text-gray-400"
                    />
                  </span>
                  {image && (
                    <Image
                      src={image}
                      alt=""
                      className="size-12 shrink-0 object-contain"
                    />
                  )}
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Right column: Languages */}
        <div className="rounded-xl bg-white p-4 shadow-sm">
          <p className="flex items-center gap-2 font-bold text-blue-700">
            <LanguagesIcon className="size-5" />
            Languages
          </p>
          <p className="text-xs italic text-gray-500">
            Select the languages you speak
          </p>
          <div className="mt-3 max-h-[640px] space-y-2 overflow-y-auto pr-1">
            {languages.map(({ name, native, level, flag, checked }) => (
              <label
                key={name}
                className="flex items-center gap-3 rounded-lg border border-gray-100 px-2 py-2"
              >
                <span
                  className={`flex size-5 shrink-0 items-center justify-center rounded-full border-2 ${
                    checked
                      ? "border-green-500 bg-green-500"
                      : "border-gray-300"
                  }`}
                >
                  {checked && <CheckCircle2 className="size-4 text-white" />}
                </span>
                <Image
                  src={flag}
                  alt=""
                  className="size-6 shrink-0 rounded-full object-cover"
                />
                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-semibold text-gray-900">
                    {name}
                  </span>
                  <span className="text-xs text-gray-500">{native}</span>
                </span>
                <span className="shrink-0 text-xs font-medium text-gray-400">
                  {level}
                </span>
              </label>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button className="rounded-xl bg-blue-600 px-8 py-3 font-bold text-white">
          Save Changes
        </button>
      </div>
    </main>
  );
}
