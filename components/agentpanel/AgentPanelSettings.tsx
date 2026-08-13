"use client";

import Image from "next/image";
import {
  Settings,
  Bell,
  AtSign,
  Smartphone,
  Lock,
  KeyRound,
} from "lucide-react";
import settingicon from "@/public/agentpanelicons/sidebarsettingsicon.svg";
import notificationicon from "@/public/agentpanelicons/noticationicon.svg";
import securityIcon from "@/public/agentpanelicons/settingsecurityicon.svg";
import currentpasswordicon from "@/public/agentpanelicons/currentpasswordicon.svg";
import viewpasswordicon from "@/public/agentpanelicons/viewpasswordicon.svg";
import phoneicon from "@/public/agentpanelicons/settingsphoneicon.svg";
import emailicon from "@/public/agentpanelicons/settingsemailicon.svg";
const SOFT_SHADOW = "shadow-[-8px_8px_16px_0_#999FB4,6px_-6px_12px_0_#FFFFFF]";

const GOLD_PILL =
  "flex w-fit items-center gap-4 rounded-2xl border border-transparent px-4 py-2 text-2xl font-bold shadow-[-8px_8px_16px_0_#999FB4,6px_-6px_12px_0_#FFFFFF]";

const GOLD_PILL_STYLE = {
  background:
    "linear-gradient(135deg,#FFFFFF 0%,#ECEDF0 50%,#C2C6CD 100%) padding-box, linear-gradient(180deg,#BA9000 0%,#F7D257 50%,#BA9000 100%) border-box",
};

const HEADING_PILL =
  "flex w-fit items-center gap-4 rounded-full bg-[#F1F3F2] py-2 pl-6 pr-4 text-3xl font-bold text-[#2495FF] shadow-[-8px_8px_16px_0_#999FB4,6px_-6px_12px_0_#FFFFFF]";

const notifications = [
  {
    icon: emailicon,
    color: "text-blue-500",
    title: "Email Notifications",
    desc: "Receive email notifications for important updates.",
    on: true,
  },
  {
    icon: phoneicon,
    color: "text-gray-700",
    title: "SMS Notifications",
    desc: "Receive SMS notifications for urgent updates.",
    on: false,
  },
];

const passwordFields = [
  { label: "Current Password", icon: currentpasswordicon },
  { label: "New Password", icon: viewpasswordicon },
  { label: "Confirm Password", icon: viewpasswordicon },
];

export default function AgentPanelSettings() {
  return (
    <div className="space-y-5">
      <span className={`${GOLD_PILL} text-[#8A8F98]`} style={GOLD_PILL_STYLE}>
        <Image src={settingicon} alt="setting icon" className="size-12" />
        Settings
      </span>
      <p className="font-serif text-2xl italic text-[#64748B]">
        Manage your account, preferences and system settings.
      </p>

      <section className={`rounded-2xl bg-white p-4 ${SOFT_SHADOW}`}>
        <span className={HEADING_PILL}>
          Notification Settings
          <Image
            src={notificationicon}
            alt="notificationicon"
            className="size-12"
          />
        </span>
        <p className="mt-3 font-serif text-xl italic text-[#64748B]">
          Manage your general preferences and system behavior.
        </p>

        <div className="mt-3 space-y-3">
          {notifications.map(({ icon: Icon, color, title, desc, on }) => (
            <label
              key={title}
              className="flex items-center gap-4 rounded-xl border-2 border-[#E1AB18] px-4 py-3"
            >
              <Image
                src={Icon}
                alt="icons"
                className={`size-14 shrink-0 ${color}`}
              />
              <span className="flex-1">
                <span className="block text-lg font-bold text-gray-900">
                  {title}
                </span>
                <span className="block text-base text-gray-600">{desc}</span>
              </span>
              {/* Native checkbox styled as a track+knob switch — no toggle component needed. */}
              <input
                type="checkbox"
                defaultChecked={on}
                className="peer sr-only"
                aria-label={title}
              />
              <span className="relative h-8 w-14 shrink-0 rounded-full bg-gray-200 transition-colors peer-checked:bg-green-500 peer-checked:[&>span]:translate-x-6">
                <span className="absolute left-1 top-1 size-6 rounded-full bg-white shadow transition-transform" />
              </span>
            </label>
          ))}
        </div>
      </section>

      <section className={`rounded-2xl bg-white p-4 ${SOFT_SHADOW}`}>
        <span className={HEADING_PILL}>
          Password &amp; Security
          <Image src={securityIcon} alt="security icon" className="size-12" />
        </span>
        <p className="mt-3 font-serif text-xl italic text-[#64748B]">
          Manage your password and account security settings.
        </p>

        <form onSubmit={(e) => e.preventDefault()} className="mt-3 space-y-3">
          {passwordFields.map(({ label, icon: Icon }) => (
            <div key={label}>
              <p className="mb-1 text-lg font-semibold text-gray-800">{label}</p>
              <label className="flex items-center gap-4 rounded-xl border-2 border-[#E1AB18] px-4 py-4">
                <Image
                  src={Icon}
                  alt="password icon"
                  className="h-8 w-auto shrink-0"
                />
                <input
                  type="password"
                  autoComplete="new-password"
                  placeholder={`Enter ${label}`}
                  className="w-full text-lg text-gray-900 outline-none placeholder:text-gray-400"
                />
              </label>
            </div>
          ))}
          <div className="flex justify-end">
            <button className="rounded-full bg-[linear-gradient(180deg,#3FA9FF_0%,#0B63D6_100%)] px-10 py-3 text-xl font-bold text-white shadow-[0_6px_12px_0_rgba(11,99,214,0.35)]">
              Change Password
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}
