"use client";

import { useEffect, useRef, useState } from "react";
import Image, { type StaticImageData } from "next/image";
import settingicon from "@/public/agentpanelicons/sidebarsettingsicon.svg";
import profileicon from "@/public/agentpanelicons/sidebarprofileicon.svg";
import securityicon from "@/public/agentpanelicons/settingsecurityicon.svg";
import emailicon from "@/public/agentpanelicons/settingsemailicon.svg";
import phoneicon from "@/public/agentpanelicons/settingsphoneicon.svg";
import telephoneicon from "@/public/agentpanelicons/profiletelephoneicon.svg";
import globeicon from "@/public/agentpanelicons/profileglobalicon.svg";
import bookingsicon from "@/public/userpanelicons/userpanelinspectionbookingicon.svg";
import approvalicon from "@/public/userpanelicons/verifieddocumentsicon.svg";
import agentsicon from "@/public/agentpanelicons/sidebarleadsmanagementicon.svg";
import bellicon from "@/public/agentpanelicons/noticationicon.svg";
import keyicon from "@/public/agentpanelicons/currentpasswordicon.svg";
import eyeopen from "@/public/authicons/eyeopen.svg";
import eyeclosed from "@/public/authicons/eyeclosed.svg";

const SOFT_SHADOW = "shadow-[-8px_8px_16px_0_#999FB4,6px_-6px_12px_0_#FFFFFF]";
const GOLD_BORDER = {
  background:
    "linear-gradient(135deg,#FFFFFF 0%,#ECEDF0 50%,#C2C6CD 100%) padding-box, linear-gradient(180deg,#BA9000 0%,#F7D257 50%,#BA9000 100%) border-box",
};
const goldPill = `flex w-fit items-center gap-3 rounded-xl border-2 border-transparent px-3 py-2 text-lg font-semibold md:px-4 md:text-2xl ${SOFT_SHADOW}`;

// ponytail: static demo values, wire to an admin settings API when it exists
const tabs = [
  { id: "profile", label: "Profile Settings", icon: profileicon },
  { id: "security", label: "Security", icon: securityicon },
  { id: "notification", label: "Notification", icon: emailicon },
] as const;

const profileFields = [
  { label: "Site Name", value: "Realto Admin", icon: globeicon },
  { label: "Email Address", value: "parker.realestate@gmail.com", icon: emailicon },
  { label: "Phone Number", value: "0404 123 456", icon: phoneicon },
  { label: "Landline", value: "03 9123 4567", icon: telephoneicon },
  { label: "Default Timezone", value: "(GMT+10:00) Sydney, Australia", wide: true },
  { label: "Date Format", value: "e.g. 21 May,2026 (DD,MM,YYYY)" },
  { label: "Currency", value: "AUD - Australian Dollar ($)" },
];

const notifyGroups = [
  {
    title: "Notification Preferences",
    icon: bellicon,
    chevron: true,
    desc: "Choose what you want to be notified about and how.",
    items: [
      ["Booking Requests", "Receive notifications for new booking requests and schedule updates.", bookingsicon],
      ["Listing Updates", "Get notified when your listings are approved, rejected or require changes.", approvalicon],
      ["Agent Updates", "Notifications about agent activities and team assignments.", agentsicon],
    ],
  },
  {
    title: "Notification Channels",
    icon: settingicon,
    chevron: false,
    desc: "Choose how you want to receive notifications.",
    items: [
      ["Email Notifications", "Receive notifications via email.", emailicon],
      ["SMS Notifications", "Receive important alerts via SMS.", phoneicon],
      ["In-App Notifications", "Get notified within the platform.", settingicon],
    ],
  },
] as const;

const ROW = "rounded-xl border-2 border-[#E1AB18] bg-white px-4 py-2 text-black";
const recovery = [
  ["Recovery Email", "parker.realestate@gmail.com", emailicon],
  ["Recovery Phone", "0142 345 678", phoneicon],
] as const;

// folder-tab outline: slanted sides, rounded top, concave fillets into the card's top edge
function TabShape({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [[w, h], setSize] = useState([0, 0]);
  useEffect(() => {
    const el = ref.current!;
    const ro = new ResizeObserver(() => setSize([el.offsetWidth, el.offsetHeight]));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  const f = 24, s = 24, W = w + 2 * f;
  const outline = `M0 ${h} Q${f} ${h} ${f + 2} ${h - 14} L${f + s} 14 Q${f + s + 2} 0 ${f + s + 18} 0 L${W - f - s - 18} 0 Q${W - f - s - 2} 0 ${W - f - s} 14 L${W - f - 2} ${h - 14} Q${W - f} ${h} ${W} ${h}`;
  return (
    <div ref={ref} className="relative xl:px-14 xl:pb-4 xl:pt-5">
      <svg
        width={W}
        height={h + 1}
        style={{ clipPath: "inset(-40px -40px 0 -40px)" }} // keep shadows off the card
        className="absolute -left-6 top-0 hidden xl:block drop-shadow-[-8px_8px_16px_#999FB4] drop-shadow-[6px_-6px_12px_rgba(0,0,0,0.25)]"
      >
        <path d={`${outline} V${h + 1} H0Z`} fill="#fff" />
        <path d={outline} fill="none" stroke="rgba(0,0,0,.5)" />
      </svg>
      <div className="relative">{children}</div>
    </div>
  );
}

function PasswordRow({ label }: { label: string }) {
  const [show, setShow] = useState(false);
  return (
    <label className="flex h-12 items-center gap-2 rounded-xl border-2 border-[#E1AB18] bg-white pl-1 pr-0.5 text-black sm:h-16 sm:gap-3">
      <Image src={keyicon} alt="" className="h-full w-11 shrink-0 object-contain sm:w-14" />
      <span className="min-w-0 flex-1">
        <span className="block text-sm font-semibold">{label}</span>
        <input
          type={show ? "text" : "password"}
          autoComplete="new-password"
          placeholder="••••••••"
          className="w-full min-w-0 text-base text-gray-600 outline-none placeholder:text-gray-400"
        />
      </span>
      <button
        type="button"
        onClick={() => setShow(!show)}
        aria-label={show ? "Hide password" : "Show password"}
        className="h-full shrink-0 py-0.5"
      >
        <Image src={show ? eyeopen : eyeclosed} alt="" className="h-full w-auto rounded-xl" />
      </button>
    </label>
  );
}

function Toggle({ label }: { label: string }) {
  return (
    <>
      <input type="checkbox" defaultChecked className="peer sr-only" aria-label={label} />
      <span className="relative h-6 w-11 sm:h-8 sm:w-14 shrink-0 cursor-pointer rounded-full bg-gray-200 transition-colors peer-checked:bg-[#04875A] peer-checked:[&>span]:translate-x-5 sm:peer-checked:[&>span]:translate-x-6">
        <span className="absolute left-1 top-1 size-4 sm:size-6 rounded-full bg-white shadow transition-transform" />
      </span>
    </>
  );
}

function Card({ title, desc, icon, children }: { title: string; desc: string; icon?: StaticImageData; children: React.ReactNode }) {
  return (
    <div className={`rounded-3xl bg-white p-4 shadow-[-8px_8px_16px_0_#999FB4,6px_-6px_12px_0_#F4F4F4] lg:p-6`}>
      <div className="flex items-center gap-3 sm:gap-4 border-b border-[#E6ECF5] pb-4">
        {icon && <Image src={icon} alt="" className="size-10 shrink-0 sm:size-14" />}
        <div>
          <h3 className="text-xl font-bold sm:text-2xl text-[#0A8CFF]">{title}</h3>
          <p className="text-base sm:text-lg text-gray-500">{desc}</p>
        </div>
      </div>
      <div className="pt-2">{children}</div>
    </div>
  );
}

const passwordFields = ["Current Password", "New Password", "Confirm Password"];

export default function AdminPanelSettings() {
  const [tab, setTab] = useState<(typeof tabs)[number]["id"]>("profile");

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <span className={`${goldPill} text-[#E1AB18]`} style={GOLD_BORDER}>
          <Image src={settingicon} alt="" className="size-10" />
          Settings
        </span>
        <button
          type="button"
          className={`${goldPill} text-[#E1AB18]`}
          style={GOLD_BORDER}
        >
          Save Changes
        </button>
      </div>

      <div className="relative z-10 !mb-0 grid grid-cols-3 gap-2 xl:flex xl:items-end xl:gap-6 xl:pl-10">
        {tabs.map(({ id, label, icon }) => {
          const on = tab === id;
          const btn = (
            <button
              key={id}
              type="button"
              onClick={() => setTab(id)}
              style={on ? GOLD_BORDER : undefined}
              className={`flex w-full flex-col items-center justify-center gap-1 rounded-xl px-1 py-3 text-center text-xs font-bold xl:w-auto xl:flex-row xl:gap-3 xl:px-6 xl:py-3 xl:text-left xl:text-2xl text-[#0A3D91] ${
                on
                  ? "border-2 border-transparent shadow-[-8px_8px_16px_0_#999FB4]"
                  : `lg:mb-4 bg-[linear-gradient(90deg,#D8EFFD,#E9EDFE)] shadow-[inset_0_4px_4px_0_rgba(0,0,0,0.1),-8px_8px_16px_0_#999FB4]`
              }`}
            >
              <Image src={icon} alt="" className="size-8 shrink-0 xl:size-10" />
              {label}
            </button>
          );
          return on ? <TabShape key={id}>{btn}</TabShape> : btn;
        })}
      </div>

      <section className={`!mt-4 xl:!mt-0 min-h-96 rounded-2xl border border-black/50 bg-white p-3 md:p-6 ${SOFT_SHADOW}`}>
        {tab === "profile" && (
          <>
            <span className="rounded-full bg-[#E5E7EB] px-6 py-2 font-serif text-2xl font-bold text-[#2495FF]">
              Profile
            </span>
            <p className="mb-5 mt-4 font-serif text-xl italic text-[#64748B]">
              Configure general preferences for the system
            </p>
            <div className="grid gap-4 md:grid-cols-2">
              {profileFields.map(({ label, value, icon, wide }) => (
                <label
                  key={label}
                  className={`flex items-center gap-3 rounded-xl border-2 border-[#E1AB18] px-4 py-2 ${
                    wide ? "md:col-span-2" : ""
                  }`}
                >
                  <span className="flex-1">
                    <span className="block text-base text-gray-600">{label}</span>
                    <input
                      defaultValue={value}
                      className="w-full text-xl font-medium text-gray-900 outline-none"
                    />
                  </span>
                  {icon && <Image src={icon} alt="" className="size-12 shrink-0" />}
                </label>
              ))}
            </div>
          </>
        )}

        {tab === "security" && (
          <>
            <span className="rounded-full bg-[#E5E7EB] px-6 py-2 font-serif text-2xl font-bold text-[#2495FF]">
              Security
            </span>
            <p className="mb-5 mt-4 font-serif text-xl italic text-[#64748B]">
              Manage your password and account security settings.
            </p>
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
              <div className="space-y-8">
                <Card title="Change Password" desc="Update your password regularly to keep your account safe." icon={keyicon}>
                  <form className="space-y-3">
                    {passwordFields.map((label) => (
                      <PasswordRow key={label} label={label} />
                    ))}
                    <div className="flex justify-end">
                      <button
                        type="submit"
                        className="w-full rounded-full bg-[linear-gradient(180deg,#3FA9FF_0%,#0B63D6_100%)] whitespace-nowrap px-6 py-2 text-xl font-bold text-white sm:w-4/5"
                      >
                        Update Password
                      </button>
                    </div>
                  </form>
                </Card>
                <Card title="Active Sessions" desc="Manage devices that are currently logged in to your account." icon={securityicon}>
                  <div className={`${ROW} flex items-center justify-between`}>
                    <span className="min-w-0 flex-1">
                      <span className="block whitespace-nowrap text-sm font-semibold sm:text-base">
                        Windows PC <span className="text-green-600">(Current Device)</span>
                      </span>
                      <span className="text-xs text-gray-600 sm:text-sm">
                        Sydney, Australia • Chrome • Aug 21, 2024 10:24 AM
                      </span>
                    </span>
                    <span className="shrink-0 rounded-full px-2 py-1 text-xs font-semibold text-green-600 shadow sm:px-3 sm:text-sm">
                      Active
                    </span>
                  </div>
                </Card>
              </div>
              <div className="space-y-8 lg:pt-28">
                <Card title="Login Alerts" desc="Get notified about new login activity on your account." icon={bellicon}>
                  <label className="flex items-center justify-between gap-4 text-gray-600">
                    Email me when there is a new login from an unrecognized device.
                    <Toggle label="Login alerts" />
                  </label>
                </Card>
                <Card title="Account Recovery" desc="Manage your recovery options." icon={profileicon}>
                  <div className="space-y-3">
                    {recovery.map(([t, v, icon]) => (
                      <button key={t} type="button" className="flex h-14 w-full items-center gap-2 rounded-xl border-2 border-[#E1AB18] bg-white px-1 text-left text-black sm:h-16 sm:gap-3">
                        <Image src={icon} alt="" className="h-full w-12 shrink-0 object-contain sm:w-14" />
                        <span className="min-w-0 flex-1">
                          <span className="block font-semibold">{t}</span>
                          <span className="block truncate text-sm text-gray-600">{v}</span>
                        </span>
                        <span className="h-full shrink-0 py-0.5">›</span>
                      </button>
                    ))}
                  </div>
                </Card>
              </div>
            </div>
          </>
        )}

        {tab === "notification" && (
          <>
            <span className="rounded-full bg-[#E5E7EB] px-6 py-2 font-serif text-2xl font-bold text-[#2495FF]">
              Notification
            </span>
            <p className="mb-5 mt-4 font-serif text-xl italic text-[#64748B]">
              Choose what you want to be notified about and how.
            </p>
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
              {notifyGroups.map(({ title, desc, icon, chevron, items }) => (
                <Card key={title} title={title} desc={desc} icon={icon}>
                  <div className="divide-y divide-[#E6ECF5]">
                    {items.map(([t, d, icon]) => (
                      <label key={t} className="flex items-center gap-3 py-3 sm:gap-4">
                        <Image src={icon} alt="" className="size-10 shrink-0 sm:size-14" />
                        <span className="flex-1">
                          <span className="block text-base font-medium sm:text-xl text-black">{t}</span>
                          <span className="text-sm text-gray-500 sm:text-base">{d}</span>
                        </span>
                        <Toggle label={t} />
                        {chevron && <span className="text-2xl text-gray-500">›</span>}
                      </label>
                    ))}
                  </div>
                </Card>
              ))}
            </div>
          </>
        )}
      </section>
    </div>
  );
}
