import AdminPanelCategories from "@/components/adminpanel/AdminPanelCategories";

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <AdminPanelCategories group={slug} />;
}
