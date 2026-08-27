"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { changePassword, updateNotificationSettings } from "@/lib/api/settings";
import { getAgentProfile } from "@/lib/api/profile";
import toast from "react-hot-toast";
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
  {
    label: "Current Password",
    name: "current_password",
    icon: currentpasswordicon,
  },
  { label: "New Password", name: "new_password", icon: viewpasswordicon },
  {
    label: "Confirm Password",
    name: "confirm_password",
    icon: viewpasswordicon,
  },
];

export default function AgentPanelSettings() {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);
  const [changingPassword, setChangingPassword] = useState(false);

  useEffect(() => {
    async function loadSettings() {
      const res = await getAgentProfile();
      if (res.success && res.data) {
        setEmailNotifications(res.data.email_notifications === 1);
        setSmsNotifications(res.data.sms_notifications === 1);
      }
    }
    loadSettings();
  }, []);

  async function handleNotificationToggle(
    type: "email" | "sms",
    checked: boolean,
  ) {
    if (type === "email") {
      setEmailNotifications(checked);
    } else {
      setSmsNotifications(checked);
    }

    const payload = {
      email_notifications: type === "email" ? checked : emailNotifications,
      sms_notifications: type === "sms" ? checked : smsNotifications,
    };

    const res = await updateNotificationSettings(payload);
    if (res.success) {
      toast.success("Notification settings updated!");
    } else {
      toast.error(res.message || "Failed to update notification settings.");
    }
  }

  async function handlePasswordSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);

    if (data.new_password !== data.confirm_password) {
      toast.error("New passwords do not match!");
      return;
    }

    setChangingPassword(true);
    const res = await changePassword({
      current_password: data.current_password,
      new_password: data.new_password,
      confirm_password: data.confirm_password,
    });
    setChangingPassword(false);

    if (res.success) {
      toast.success("Password changed successfully!");
      e.currentTarget.reset();
    } else {
      toast.error(res.message || "Failed to change password.");
    }
  }

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
          {notifications.map(({ icon: Icon, color, title, desc }) => {
            const isEmail = title === "Email Notifications";
            const isChecked = isEmail ? emailNotifications : smsNotifications;
            return (
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
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={(e) =>
                    handleNotificationToggle(
                      isEmail ? "email" : "sms",
                      e.target.checked,
                    )
                  }
                  className="peer sr-only "
                  aria-label={title}
                />
                <span className="relative h-8 w-14 shrink-0 rounded-full bg-gray-200 transition-colors peer-checked:bg-green-500 peer-checked:[&>span]:translate-x-6 cursor-pointer">
                  <span className="absolute left-1 top-1 size-6 rounded-full bg-white shadow transition-transform" />
                </span>
              </label>
            );
          })}
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

        <form onSubmit={handlePasswordSubmit} className="mt-3 space-y-3">
          {passwordFields.map(({ label, name, icon: Icon }) => (
            <div key={label}>
              <p className="mb-1 text-lg font-semibold text-gray-800">
                {label}
              </p>
              <label className="flex items-center gap-4 rounded-xl border-2 border-[#E1AB18] px-4 py-4">
                <Image
                  src={Icon}
                  alt="password icon"
                  className="h-8 w-auto shrink-0"
                />
                <input
                  type="password"
                  name={name}
                  autoComplete="new-password"
                  placeholder={`Enter ${label}`}
                  className="w-full text-lg text-gray-900 outline-none placeholder:text-gray-400"
                  required
                />
              </label>
            </div>
          ))}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={changingPassword}
              className="rounded-full bg-[linear-gradient(180deg,#3FA9FF_0%,#0B63D6_100%)] px-10 py-3 text-xl font-bold text-white shadow-[0_6px_12px_0_rgba(11,99,214,0.35)] disabled:opacity-60"
            >
              {changingPassword ? "Changing..." : "Change Password"}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}
