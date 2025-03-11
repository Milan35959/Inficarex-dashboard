// app/dashboard/layout.tsx
import { DashboardSidebar } from "@/components/dashboard-sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-1">
          <DashboardSidebar/>
          {children}

    </div>
  );
}
