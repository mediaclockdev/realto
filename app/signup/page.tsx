import Signup from "@/components/Auth/Signup";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ role?: string }>;
}) {
  const { role } = await searchParams;
  return (
    <main className="flex min-h-dvh items-center justify-center bg-[#1E1E1E] p-4">
      <section className="w-full max-w-lg rounded-2xl sm:rounded-3xl bg-white p-5 sm:p-8">
        <Signup isAgent={role === "agent"} />
      </section>
    </main>
  );
}
