// app/dashboard/layout.tsx
import { DashboardSidebar } from "@/components/dashboard-sidebar";

export default function HrmLayout({
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
