import AgentPanelLayout from "@/components/agentpanel/AgentPanelLayout";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <AgentPanelLayout>{children}</AgentPanelLayout>;
}
