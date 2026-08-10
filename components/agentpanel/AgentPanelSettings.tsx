"use client";

import { Settings, Bell, AtSign, Smartphone, Lock, KeyRound } from "lucide-react";

const notifications = [
  {
    icon: AtSign,
    color: "text-blue-500",
    title: "Email Notifications",
    desc: "Receive email notifications for important updates.",
    on: true,
  },
  {
    icon: Smartphone,
    color: "text-gray-700",
    title: "SMS Notifications",
    desc: "Receive SMS notifications for urgent updates.",
    on: false,
  },
];

const passwordFields = [
  { label: "Current Password", icon: KeyRound },
  { label: "New Password", icon: Lock },
  { label: "Confirm Password", icon: Lock },
];

export default function AgentPanelSettings() {
  return (
    <div className="space-y-5">
      <span className="flex w-fit items-center gap-2 rounded-lg border border-yellow-400 bg-white px-4 py-2 font-bold text-gray-500">
        <Settings className="size-5" />
        Settings
      </span>
      <p className="italic text-gray-600">
        Manage your account, preferences and system settings.
      </p>

      <section className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
        <span className="flex w-fit items-center gap-2 rounded-lg border border-yellow-400 px-4 py-1.5 font-bold text-blue-500">
          Notification Settings
          <Bell className="size-4 text-yellow-500" />
        </span>
        <p className="mt-2 text-sm italic text-gray-500">
          Manage your general preferences and system behavior.
        </p>

        <div className="mt-3 space-y-3">
          {notifications.map(({ icon: Icon, color, title, desc, on }) => (
            <label
              key={title}
              className="flex items-center gap-3 rounded-lg border border-yellow-400 px-4 py-3"
            >
              <Icon className={`size-7 shrink-0 ${color}`} />
              <span className="flex-1">
                <span className="block font-bold text-gray-900">{title}</span>
                <span className="block text-sm text-gray-600">{desc}</span>
              </span>
              {/* Native checkbox styled as a track+knob switch — no toggle component needed. */}
              <input
                type="checkbox"
                defaultChecked={on}
                className="peer sr-only"
                aria-label={title}
              />
              <span className="relative h-6 w-11 shrink-0 rounded-full bg-gray-200 transition-colors peer-checked:bg-green-500 peer-checked:[&>span]:translate-x-5">
                <span className="absolute left-0.5 top-0.5 size-5 rounded-full bg-white shadow transition-transform" />
              </span>
            </label>
          ))}
        </div>
      </section>

      <section className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
        <span className="flex w-fit items-center gap-2 rounded-lg border border-yellow-400 px-4 py-1.5 font-bold text-blue-500">
          Password &amp; Security
          <Lock className="size-4 text-gray-700" />
        </span>
        <p className="mt-2 text-sm italic text-gray-500">
          Manage your password and account security settings.
        </p>

        <form onSubmit={(e) => e.preventDefault()} className="mt-3 space-y-3">
          {passwordFields.map(({ label, icon: Icon }) => (
            <div key={label}>
              <p className="mb-1 font-semibold text-gray-800">{label}</p>
              <label className="flex items-center gap-3 rounded-lg border border-yellow-400 px-4 py-3">
                <Icon className="size-5 shrink-0 text-gray-500" />
                <input
                  type="password"
                  autoComplete="new-password"
                  placeholder={`Enter ${label}`}
                  className="w-full text-gray-900 outline-none placeholder:text-gray-400"
                />
              </label>
            </div>
          ))}
          <div className="flex justify-end">
            <button className="rounded-lg bg-blue-500 px-6 py-2.5 font-bold text-white shadow-sm">
              Change Password
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}
