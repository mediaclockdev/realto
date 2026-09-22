import Login from "@/components/Auth/Login";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ role?: string }>;
}) {
  const { role } = await searchParams;
  return (
    <main className="flex min-h-dvh items-center justify-center bg-[#1E1E1E] p-2">
      <section className="w-full max-w-lg rounded-2xl sm:rounded-3xl bg-white p-2 sm:p-2">
        <Login isAgent={role === "agent"} />
      </section>
    </main>
  );
}
