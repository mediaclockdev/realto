"use client";

import Image, { type StaticImageData } from "next/image";
import { CheckCircle2, XCircle, Link2 } from "lucide-react";
import { useEffect, useState } from "react";
import { getAgentProfile, updateAgentProfile, Agent } from "@/lib/api/profile";
import toast from "react-hot-toast";

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
import chinaFlag from "@/public/agentpanelicons/chinaflag2.svg";
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
import languageWorld from "@/public/languageworld.svg";
import licenseIcon from "@/public/agentpanelicons/profiledl.svg";
import mailIcon from "@/public/agentpanelicons/profilemailicon.svg";
import mobileIcon from "@/public/agentpanelicons/profilephoneicon.svg";
import telephoneIcon from "@/public/agentpanelicons/profiletelephoneicon.svg";
import locationIcon from "@/public/agentpanelicons/profilelocationicon.svg";
import globeIcon from "@/public/agentpanelicons/profileglobalicon.svg";
import vimeoicon from "@/public/agentpanelicons/profilesocialiconvimeo.svg";
import editIcon from "@/public/agentpanelicons/profileEditicon.svg";

const SOFT_SHADOW = "shadow-[-8px_8px_16px_0_#999FB4,6px_-6px_12px_0_#FFFFFF]";

const SECTION =
  "rounded-xl bg-white p-4 shadow-[-8px_8px_16px_0_#999FB4,6px_-6px_12px_0_#FFFFFF]";

const HEADING_PILL =
  "flex w-full items-center gap-8 rounded-full bg-[#F1F3F2] py-2.5 pl-4 pr-8 text-3xl font-bold text-[#4A90F0] shadow-[-8px_8px_16px_0_#999FB4,6px_-6px_12px_0_#FFFFFF]";

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

const socialLinks: { label: string; image?: StaticImageData }[] = [
  { label: "LinkedIn", image: linkedinIcon },
  { label: "Instagram", image: instagramIcon },
  { label: "Facebook", image: facebookIcon },
  { label: "Whatsapp", image: whatsappIcon },
  { label: "X", image: twitterIcon },
  { label: "Youtube", image: youtubeIcon },
  { label: "Tik Tok", image: tiktokIcon },
  { label: "Snapchat", image: snapchatIcon },
  { label: "Vimeo", image: vimeoicon },
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
  name,
  image,
  valid,
  full,
}: {
  label: string;
  value: string;
  name: string;
  image?: StaticImageData;
  valid: boolean;
  full?: boolean;
}) {
  return (
    <label
      className={`flex items-center justify-between gap-3 rounded-2xl border-2 border-[#E1AB18] px-4 py-2.5 ${
        full ? "sm:col-span-2" : ""
      }`}
    >
      <span className="min-w-0 flex-1">
        <span className="flex items-center gap-1.5 text-sm text-gray-500">
          <StatusDot valid={valid} />
          {label}
        </span>
        <input
          type="text"
          name={name}
          defaultValue={value}
          className="mt-0.5 w-full text-xl text-gray-900 outline-none placeholder:text-gray-400"
        />
      </span>

      {image && (
        <Image
          src={image}
          alt="icons"
          className="size-12 shrink-0 object-contain"
        />
      )}
    </label>
  );
}

export default function AgentPanelProfile() {
  const [agent, setAgent] = useState<Agent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchProfile() {
      const res = await getAgentProfile();
      if (res.success && res.data) {
        setAgent(res.data);
      } else {
        setError(res.message || "Failed to load profile details.");
      }
      setLoading(false);
    }
    fetchProfile();
  }, []);

  const personalFields = [
    {
      label: "Full Name",
      name: "name",
      value: agent?.name || "",
      image: licenseIcon,
      valid: !!agent?.name,
    },
    {
      label: "Email Address",
      name: "email",
      value: agent?.email || "",
      image: mailIcon,
      valid: !!agent?.email,
    },
    {
      label: "Phone Number",
      name: "phone",
      value: agent?.phone || "",
      image: mobileIcon,
      valid: !!agent?.phone,
    },
    {
      label: "Landline",
      name: "landline",
      value: "03 9123 4567",
      image: telephoneIcon,
      valid: true,
    },
    {
      label: "Address",
      name: "address",
      value: agent?.address || "",
      image: locationIcon,
      valid: !!agent?.address,
      full: true,
    },
    {
      label: "Company Name",
      name: "company_name",
      value: agent?.company_name || "",
      valid: !!agent?.company_name,
    },
    {
      label: "Your Title",
      name: "title",
      value: agent?.title || "",
      valid: !!agent?.title,
    },
    {
      label: "Website",
      name: "website",
      value: agent?.website || "",
      image: globeIcon,
      valid: !!agent?.website,
      full: true,
    },
    { label: "License No.", name: "license_no", value: agent?.license_no || "", valid: !!agent?.license_no },
    { label: "Total Experience (Years)", name: "total_experience", value: agent?.total_experience?.toString() || "", valid: !!agent?.total_experience },
  ];
  const bio = {
    label: "About / Bio",
    value: agent?.bio || "",
    valid: !!agent?.bio,
  };

  const [saving, setSaving] = useState(false);

  async function onSave(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSaving(true);
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);
    
    const res = await updateAgentProfile(data);
    setSaving(false);
    if (res.success) {
      toast.success("Profile updated successfully!");
      if (res.data) setAgent(res.data);
    } else {
      toast.error(res.message || "Failed to update profile.");
    }
  }

  if (loading) return <div className="p-8 text-center">Loading profile...</div>;
  if (error) return <div className="p-8 text-center text-red-500">{error}</div>;
  return (
    <form onSubmit={onSave} className="space-y-5">
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
                alt={agent?.name || "Profile Picture"}
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
                {agent?.name || "Parker Realestate"}
              </p>
              <p className="text-lg text-[#424656] font-medium">
                {agent?.title || "Senior Real Estate Agent"}{" "}
                • {agent?.address || "New York, USA"}
              </p>
              <p className="text-base text-[#737687] font-medium">
                Member since {agent?.created_at ? new Date(agent.created_at).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : "Jan 2026"}
              </p>
            </div>
          </div>
          <button
            className={`relative ml-10 mt-8 rounded-lg border border-gray-300 bg-white px-12 py-3 text-base font-bold text-[#004BCA] ${SOFT_SHADOW}`}
          >
            <Image
              src={editIcon}
              alt=""
              className="absolute -left-1 -top-4 size-16 -rotate-6 object-contain"
            />
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
                <p className="text-lg font-bold text-[#0496FF]">{label}</p>
                <p className="text-2xl font-bold text-[#191C1E]">{value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-[1fr_420px]">
        {/* Left column */}
        <div className="space-y-5">
          <div className={SECTION}>
            <p className={HEADING_PILL}>Personal Information</p>
            <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {personalFields.map((field) => (
                <FieldBox key={field.label} {...field} />
              ))}
              <label className="rounded-2xl border-2 border-[#E1AB18] px-4 py-2.5 sm:col-span-2">
                <span className="flex items-center gap-1.5 text-sm text-gray-500">
                  <StatusDot valid={bio.valid} />
                  {bio.label}
                </span>
                <textarea
                  rows={3}
                  name="bio"
                  defaultValue={bio.value}
                  className="mt-0.5 w-full resize-none text-xl text-gray-900 outline-none"
                />
              </label>
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
        <div className={SECTION}>
          <p className={HEADING_PILL}>
            <Image src={languageWorld} alt="" className="size-14 shrink-0" />
            Languages
          </p>
          <p className="mt-2 italic text-gray-500">
            Select the languages you speak
          </p>
          <div className="mt-3 space-y-5">
            {languages.map(({ name, native, level, flag, checked }) => (
              <label
                key={name}
                className="flex items-center gap-3  rounded-2xl border-2 border-[#E1AB18] px-3 py-1.5"
              >
                <span
                  className={`flex size-3 shrink-0 items-center justify-center rounded-full border-2 ${
                    checked
                      ? "border-green-500 bg-green-500"
                      : "border-[#2495FF]"
                  }`}
                >
                  {checked && <CheckCircle2 className="size-4 text-white" />}
                </span>
                <div className="relative h-9 w-10">
                  <Image
                    src={flag}
                    alt=""
                    width={60}
                    height={60}
                    className="absolute -top-4 rounded-full object-cover"
                  />
                </div>
                <span className="min-w-0 flex-1">
                  <span className="text-base font-semibold text-gray-900">
                    {name}
                  </span>{" "}
                  <span className="text-sm text-gray-400">{native}</span>
                </span>
                <span className="shrink-0 rounded-full bg-[#E8F2FE] px-3 py-1.5 text-sm font-semibold text-[#2495FF]">
                  {level}
                </span>
              </label>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={saving}
          className="rounded-xl bg-blue-600 px-8 py-3 font-bold text-white disabled:opacity-60"
        >
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </form>
  );
}
