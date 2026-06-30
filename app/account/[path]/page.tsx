import { redirect } from "next/navigation";
import { auth } from "@/lib/auth/server";
import { SafeAccountView } from "./safe-account-view";

export default async function AccountPage({
  params,
}: {
  params: Promise<{ path: string }>;
}) {
  const { path } = await params;
  const { data: session } = await auth.getSession();

  if (!session) {
    redirect("/auth/sign-in");
  }

  return (
    <main className="container p-4 md:p-6">
      <SafeAccountView path={path} />
    </main>
  );
}
