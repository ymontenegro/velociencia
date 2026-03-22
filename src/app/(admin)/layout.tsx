import { AdminSidebar } from "@/components/admin/admin-sidebar";

export const dynamic = "force-dynamic";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-[var(--color-bg)]">
      <AdminSidebar />
      <main className="ml-[250px] flex-1 min-h-screen">
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
