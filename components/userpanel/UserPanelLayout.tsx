"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Search, Bell, Menu, X } from "lucide-react";
import realtoLogo from "@/public/Realto Logo - 1.gif";
import searchFlag from "@/public/austrilaflag.svg";
import agentAvatarThumb from "@/public/emilyrodriguez.jpg";
import supportAgent from "@/public/contact2.jpeg";
import dashboardicon from "@/public/agentpanelicons/sidebardashboardicon.svg";
import profileicon from "@/public/agentpanelicons/sidebarprofileicon.svg";
import leadsmanagementicon from "@/public/agentpanelicons/sidebarleadsmanagementicon.svg";
import mylistingsicon from "@/public/agentpanelicons/sidebarmylistingicon.svg";
import analyticsicon from "@/public/agentpanelicons/sidebaranalyticsicons.svg";
import messageicon from "@/public/agentpanelicons/sidebarmessageicon.svg";
import documentsicon from "@/public/agentpanelicons/sidebardocumentsicon.svg";
import settingsicon from "@/public/agentpanelicons/sidebarsettingsicon.svg";
import styles from "@/components/agentpanel/sidebar.module.css";

const menuItems = [
  { label: "Dashboard", icon: dashboardicon, href: "/userpanel/dashboard" },
  { label: "Profile", icon: profileicon, href: "/userpanel/profile" },
  {
    label: "Inspection Bookings",
    icon: leadsmanagementicon,
    href: "/userpanel/inspectionbookings",
  },
  {
    label: "Hotel Bookings",
    icon: mylistingsicon,
    href: "/userpanel/hotelbookings",
  },
  {
    label: "Saved Properties",
    icon: analyticsicon,
    href: "/userpanel/savedproperties",
  },
  { label: "Messages", icon: messageicon, href: "/userpanel/messages" },
  { label: "Documents", icon: documentsicon, href: "/userpanel/documents" },
  { label: "Settings", icon: settingsicon, href: "/userpanel/settings" },
];

export default function UserPanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="mx-auto flex min-h-screen max-w-screen-2xl bg-white">
      {/* Mobile backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar - full height, own column */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-60 p-4 space-y-4 border-r  overflow-y-auto bg-[#F8FAFC]  transition-transform duration-300 lg:static lg:z-auto lg:w-56 lg:shrink-0 lg:translate-x-0 lg:space-y-4 lg:overflow-visible lg:border lg:border-[#DBE5F1] lg:px-0 py-2 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between lg:hidden">
          <Link href="/homepage" className="w-28">
            <Image
              src={realtoLogo}
              alt="Realto logo"
              unoptimized
              className="h-auto w-full"
            />
          </Link>
          <button
            className="rounded-lg border border-gray-200 p-1.5"
            aria-label="Close menu"
            onClick={() => setMobileOpen(false)}
          >
            <X className="size-4 text-gray-700" />
          </button>
        </div>

        <div className="hidden w-32 lg:block">
          <Link href="/homepage">
            <Image
              src={realtoLogo}
              alt="Realto logo"
              unoptimized
              className="h-auto w-full"
            />
          </Link>
        </div>

        <div className="rounded-xl p-1.5">
          <p className="rounded-lg bg-yellow-400 py-2 text-center  text-2xl font-bold text-gray-900">
            Main Menu
          </p>
          <nav className="mt-3 space-y-3">
            {menuItems.map(({ label, icon: Icon, href }) => {
              const active = pathname.startsWith(href);
              return (
                <Link
                  key={label}
                  href={href}
                  onClick={() => setMobileOpen(false)}
                  className={`${styles.item} ${active ? styles.active : ""}`}
                >
                  <span className={active ? styles.labelActive : styles.label}>
                    {label}
                  </span>
                  <Image src={Icon} alt="" priority className={styles.icon} />
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="overflow-hidden rounded-xl bg-gradient-to-b from-sky-400 to-blue-600 p-4 text-white">
          <p className="font-bold">Need Help ?</p>
          <p className="mt-1 text-xs text-white/90">
            Contact our support team 24/7
          </p>
          <div className="mt-3 flex items-end justify-between">
            <button className="rounded-lg bg-orange-500 px-3 py-1.5 text-xs font-bold">
              Contact support
            </button>
            <Image
              src={supportAgent}
              alt="Support agent"
              className="size-16 rounded-lg object-cover"
            />
          </div>
        </div>
      </aside>

      {/* Content column */}
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex items-center justify-between gap-4 border-b border-gray-200 bg-white px-4 py-3 lg:px-6">
          <button
            className="rounded-lg border border-gray-200 p-2 lg:hidden"
            aria-label="Open menu"
            onClick={() => setMobileOpen(true)}
          >
            <Menu className="size-5 text-gray-700" />
          </button>

          <div className="flex w-full max-w-xl items-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-2">
            <Image
              src={searchFlag}
              alt="AU"
              className="size-5 shrink-0 rounded-full"
            />
            <input
              type="text"
              placeholder="Type to search"
              className="w-full text-sm text-gray-600 outline-none"
            />
            <Search className="size-5 shrink-0 text-gray-500" />
          </div>

          <div className="flex items-center gap-4 shrink-0">
            <button
              className="relative rounded-full bg-gray-100 p-2"
              aria-label="Notifications"
            >
              <Bell className="size-5 text-gray-700" />
              <span className="absolute -top-1 -right-1 flex size-4 items-center justify-center rounded-full bg-orange-500 text-[10px] font-bold text-white">
                1
              </span>
            </button>
            <Image
              src={agentAvatarThumb}
              alt="Agent avatar"
              className="size-10 rounded-full object-cover"
            />
          </div>
        </header>

        <main className="px-4 py-4 lg:px-4">{children}</main>
      </div>
    </div>
  );
}
