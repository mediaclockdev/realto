import AdminGuard from "@/components/adminpanel/AdminGuard";
import AgentPanelLayout from "@/components/agentpanel/AgentPanelLayout";
import dashboardicon from "@/public/agentpanelicons/sidebardashboardicon.svg";
import listingsicon from "@/public/agentpanelicons/sidebarmylistingicon.svg";
import approvalicon from "@/public/userpanelicons/verifieddocumentsicon.svg";
import bookingsicon from "@/public/userpanelicons/userpanelinspectionbookingicon.svg";
import customersicon from "@/public/agentpanelicons/sidebarprofileicon.svg";
import agentsicon from "@/public/agentpanelicons/sidebarleadsmanagementicon.svg";
import analyticsicon from "@/public/agentpanelicons/sidebaranalyticsicons.svg";
import { categoryGroups } from "@/components/adminpanel/categoryGroups";
import categoryicon from "@/public/agentpanelicons/sidebardocumentsicon.svg";
import settingsicon from "@/public/agentpanelicons/sidebarsettingsicon.svg";

const adminItems = [
  { label: "Dashboard", icon: dashboardicon, href: "/adminpanel/dashboard" },
  {
    label: "Property Listings",
    icon: listingsicon,
    href: "/adminpanel/listings",
  },
  {
    label: "Listing Approval",
    icon: approvalicon,
    href: "/adminpanel/approval",
  },
  {
    label: "Manage Bookings",
    icon: bookingsicon,
    href: "/adminpanel/bookings",
  },
  {
    label: "Manage Customers",
    icon: customersicon,
    href: "/adminpanel/customers",
  },
  { label: "Manage Agents", icon: agentsicon, href: "/adminpanel/agents" },
  {
    label: "Analytics overview",
    icon: analyticsicon,
    href: "/adminpanel/analytics",
  },
  {
    label: "Manage Category",
    icon: categoryicon,
    href: "/adminpanel/categories",
    children: categoryGroups.map(({ label, slug }) => ({
      label,
      href: `/adminpanel/categories/${slug}`,
    })),
  },
  { label: "Settings", icon: settingsicon, href: "/adminpanel/settings" },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <AdminGuard>
      <AgentPanelLayout items={adminItems}>{children}</AgentPanelLayout>
    </AdminGuard>
  );
}
