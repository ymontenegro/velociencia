import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/admin/auth";
import { LoginForm } from "./login-form";

export const dynamic = "force-dynamic";

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string; error?: string }>;
}) {
  const session = await getAdminSession();
  const params = await searchParams;
  if (session.valid) {
    redirect(params.next || "/admin");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--color-bg)] p-6">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold tracking-tight text-[var(--color-text)]">
            VELOCIENCIA
          </h1>
          <p className="mt-1 text-xs uppercase tracking-[0.2em] text-[var(--color-text-muted)]">
            Panel administrativo
          </p>
        </div>
        <LoginForm next={params.next} initialError={params.error} />
      </div>
    </div>
  );
}
