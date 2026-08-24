import UserPanelLayout from "@/components/userpanel/UserPanelLayout";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <UserPanelLayout>{children}</UserPanelLayout>;
}
