import { notFound } from "next/navigation";
import AgentProfilePage from "@/components/Agent/AgentProfilePage";
import {
  getAgentByIdOrSlug,
  getAgentCurrentListings,
  getAgentSoldListings,
} from "@/lib/agents/repository";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const agent = await getAgentByIdOrSlug(slug);

  if (!agent) {
    notFound();
  }

  const [currentListings, soldListings] = await Promise.all([
    getAgentCurrentListings(slug),
    getAgentSoldListings(slug),
  ]);

  return (
    <AgentProfilePage
      agent={agent}
      currentListings={currentListings}
      soldListings={soldListings}
    />
  );
}
