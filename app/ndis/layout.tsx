// app/ndis/layout.tsx
import { DashboardSidebar } from "@/components/dashboard-sidebar";

export default function NdisLayout({
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
