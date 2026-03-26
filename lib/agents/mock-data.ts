import type { RecommendedAgent } from "@/lib/agents/types";
import agent1 from "@/public/recommendagent1.svg";
import agent2 from "@/public/recommendagent2.svg";
import ana from "@/public/anajonesagent.svg";
import roombg from "@/public/roombgimg.svg";

export const recommendedAgentsCatalog: RecommendedAgent[] = [
  {
    id: "rec-1",
    name: "Katherine Fernandes",
    phone: "+9999999999",
    email: "exampleemail.com",
    location: "Austin, Australia",
    licenseNumber: "12345678",
    rating: 4.5,
    reviewCount: 38,
    avatar: agent1,
    bgimg: "",
    cardVariant: "angled",
  },
  {
    id: "rec-2",
    name: "Katherine Fernandes",
    phone: "+9999999999",
    email: "exampleemail.com",
    location: "Austin, Australia",
    licenseNumber: "12345678",
    rating: 4.5,
    reviewCount: 38,
    avatar: agent2,
    bgimg: roombg,
    cardVariant: "framed",
  },
  {
    id: "rec-3",
    name: "Katherine Fernandes",
    phone: "+9999999999",
    email: "exampleemail.com",
    location: "Austin, Australia",
    licenseNumber: "12345678",
    rating: 4.5,
    reviewCount: 38,
    avatar: agent1,
    bgimg: "",
    cardVariant: "angled",
  },
  {
    id: "rec-4",
    name: "Katherine Fernandes",
    phone: "+9999999999",
    email: "exampleemail.com",
    location: "Austin, Australia",
    licenseNumber: "12345678",
    rating: 4.5,
    reviewCount: 38,
    avatar: agent2,
    bgimg: roombg,
    cardVariant: "framed",
  },
];
