"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  CheckCircle2,
  XCircle,
  Mail,
  Phone,
  PhoneCall,
  Home,
  Instagram,
  Facebook,
  Youtube,
  Lock,
  ShieldCheck,
  BellRing,
  Heart,
  PhoneOutgoing,
  Globe,
  Clock,
  ChevronRight,
} from "lucide-react";

import toast from "react-hot-toast";
import { getUserProfile, updateUserProfile, type User } from "@/lib/api/profile";
import avatar from "@/public/emilyrodriguez.jpg";
import profileicon from "@/public/agentpanelicons/sidebarprofileicon.svg";
import editIcon from "@/public/agentpanelicons/profileEditicon.svg";
import camericon from "@/public/agentpanelicons/profilecameraicon.svg";

const SOFT_SHADOW = "shadow-[-8px_8px_16px_0_#999FB4,6px_-6px_12px_0_#FFFFFF]";
const SECTION = `rounded-xl bg-white p-4 ${SOFT_SHADOW}`;
const HEADING_PILL =
  "flex w-fit items-center gap-2 rounded-full bg-[#F1F3F2] px-4 py-2 text-xl font-bold text-[#2495FF]";

const fieldNames: Record<string, string> = {
  "Full Name": "name",
  "Email Address": "email",
  "Phone Number": "phone",
  Address: "address",
};

const personalFields = [
  {
    label: "Full Name",
    value: "Parker Realestate",
    icon: undefined,
    valid: true,
  },
  {
    label: "Email Address",
    value: "parker.realestate@gmail.com",
    icon: Mail,
    valid: true,
  },
  { label: "Phone Number", value: "0142 345 678", icon: Phone, valid: true },
  { label: "Landline", value: "03 9123 4567", icon: PhoneCall, valid: true },
  {
    label: "Address",
    value: "123 Broadway, New York, NY 10001, USA",
    icon: Home,
    valid: true,
    full: true,
  },
];

const bio = {
  label: "About / Bio",
  value:
    "Experienced real estate agent specializing in residential and commercial properties. Helping clients find their perfect space with dedicated expertise and a track record of success in the New York market.",
  valid: false,
};

const socialLinks = [
  {
    label: "Instagram",
    icon: Instagram,
    placeholder: "https://www.instagram....",
  },
  {
    label: "Facebook",
    icon: Facebook,
    placeholder: "https://www.facebook....",
  },
  { label: "Youtube", icon: Youtube, placeholder: "https://www.facebook...." },
];

const security = [
  {
    label: "Password",
    sub: "••••••",
    icon: Lock,
    action: "Change",
  },
  {
    label: "Two-Factor Authentication",
    sub: "Enabled",
    icon: ShieldCheck,
    action: "Manage",
  },
  {
    label: "Email Notifications",
    sub: "Enabled",
    icon: BellRing,
    action: "Manage",
  },
];

const preferences = [
  {
    label: "Communication Preferences",
    sub: "Email, SMS",
    icon: PhoneOutgoing,
  },
  { label: "Language", sub: "English (US)", icon: Globe },
  {
    label: "Timezone",
    sub: "(GMT-05:00) Eastern Time (US & Canada)",
    icon: Clock,
  },
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
  icon: Icon,
  valid,
  full,
}: {
  label: string;
  value: string;
  icon?: typeof Mail;
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
          name={fieldNames[label]}
          defaultValue={value}
          className="mt-0.5 w-full text-lg text-gray-900 outline-none"
        />
      </span>
      {Icon && <Icon className="size-6 shrink-0 text-[#E1AB18]" />}
    </label>
  );
}

export default function UserPanelProfile() {
  const [user, setUser] = useState<User>();
  useEffect(() => {
    getUserProfile().then((r) => r.success && setUser(r.data));
  }, []);

  const fields = personalFields.map((f) => {
    const live =
      f.label === "Full Name"
        ? user?.name
        : f.label === "Email Address"
          ? user?.email
          : f.label === "Phone Number"
            ? user?.phone
            : f.label === "Address"
              ? user?.address
              : undefined;
    return live ? { ...f, value: live } : f;
  });
  async function save(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const r = await updateUserProfile(Object.fromEntries(new FormData(e.currentTarget)));
    if (r.success) {
      toast.success("Profile updated");
      setUser((u) => ({ ...u, ...(r.data ?? Object.fromEntries(new FormData(e.currentTarget))) }));
    } else toast.error(r.message ?? "Update failed");
  }
  const bioValue = user?.bio || bio.value;

  return (
    <main className="space-y-5">
      <div>
        <p className="flex w-fit items-center gap-2 rounded-lg border border-yellow-400 bg-white px-3 py-2 font-bold text-[#E1AB18]">
          Profile
          <Image src={profileicon} alt="profile icon" width={28} height={28} />
        </p>
        <p className="mt-2 italic text-[#64748B]">
          Manage your personal information and account settings.
        </p>
      </div>

      {/* Profile header */}
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
              <p className="text-3xl font-bold text-[#2495FF]">{user?.name ?? "Masha Klein"}</p>
              <p className="text-lg text-[#424656] font-medium">
                New York, USA
              </p>
              <p className="text-base text-[#737687] font-medium">
                Member since Jan 2026
              </p>
            </div>
          </div>
          <button
            type="submit"
            form="profile-form"
            className={`relative cursor-pointer ml-10 mt-8 rounded-lg border border-gray-300 bg-white px-12 py-3 text-base font-bold text-[#004BCA] ${SOFT_SHADOW}`}
          >
            <Image
              src={editIcon}
              alt=""
              className="absolute -left-1 -top-4 size-16 -rotate-6 object-contain"
            />
            Edit Profile
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-[1fr_360px]">
        {/* Left column */}
        <form id="profile-form" onSubmit={save} className={SECTION}>
          <p className={HEADING_PILL}>Personal Information</p>
          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {fields.map((field) => (
              <FieldBox key={field.label + field.value} {...field} />
            ))}
            <label className="rounded-2xl border-2 border-[#E1AB18] px-4 py-2.5 sm:col-span-2">
              <span className="flex items-center gap-1.5 text-sm text-gray-500">
                <StatusDot valid={bio.valid} />
                {bio.label}
              </span>
              <textarea
                rows={3}
                key={bioValue}
                name="bio"
                defaultValue={bioValue}
                className="mt-0.5 w-full resize-none text-lg text-gray-900 outline-none"
              />
            </label>
          </div>

          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
            {socialLinks.map(({ label, icon: Icon, placeholder }) => (
              <label
                key={label}
                className="flex items-center justify-between gap-3 rounded-2xl border-2 border-[#E1AB18] px-4 py-2.5"
              >
                <span className="min-w-0 flex-1">
                  <span className="block text-sm text-gray-500">{label}</span>
                  <input
                    type="text"
                    placeholder={placeholder}
                    className="mt-0.5 w-full text-sm text-gray-900 outline-none placeholder:text-gray-400"
                  />
                </span>
                <Icon className="size-5 shrink-0 text-[#2495FF]" />
              </label>
            ))}
          </div>
        </form>

        {/* Right column */}
        <div className="space-y-5">
          <div className={SECTION}>
            <p className={HEADING_PILL}>Account Security</p>
            <div className="mt-4 space-y-3">
              {security.map(({ label, sub, icon: Icon, action }) => (
                <div
                  key={label}
                  className="flex items-center gap-3 rounded-2xl border-2 border-[#E1AB18] px-4 py-2.5"
                >
                  <Icon className="size-5 shrink-0 text-[#0496FF]" />
                  <span className="min-w-0 flex-1">
                    <span className="block font-bold text-gray-900">
                      {label}
                    </span>
                    <span className="text-sm text-green-600">{sub}</span>
                  </span>
                  <button className="shrink-0 text-sm font-bold text-[#2495FF]">
                    {action}
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className={SECTION}>
            <p className={HEADING_PILL}>
              <Heart className="size-5 fill-pink-500 text-pink-500" />
              Preferences
            </p>
            <div className="mt-4 space-y-3">
              {preferences.map(({ label, sub, icon: Icon }) => (
                <button
                  key={label}
                  className="flex w-full items-center gap-3 rounded-2xl border-2 border-[#E1AB18] px-4 py-2.5 text-left"
                >
                  <Icon className="size-5 shrink-0 text-[#0496FF]" />
                  <span className="min-w-0 flex-1">
                    <span className="block font-bold text-gray-900">
                      {label}
                    </span>
                    <span className="truncate text-sm text-gray-500">
                      {sub}
                    </span>
                  </span>
                  <ChevronRight className="size-4 shrink-0 text-gray-400" />
                </button>
              ))}
            </div>
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
