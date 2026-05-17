import { Sidebar } from "@/components/dashboard/sidebar";

export default function GenerateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 ml-[240px]">{children}</main>
    </div>
  );
}
