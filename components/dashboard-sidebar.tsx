import Link from "next/link"
import { BarChart, Home, LayoutDashboard, Settings, Users } from "lucide-react"

import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"

export function DashboardSidebar() {
  return (
    <aside className="hidden w-64 flex-col border-r bg-background md:flex">
      <ScrollArea className="flex-1 px-4 py-6">
        <nav className="flex flex-col gap-4">
          <div className="px-2 py-2">
            <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">Menu</h2>
            <div className="space-y-1">
              <Button variant="secondary" className="w-full justify-start gap-2" asChild>
                <Link href="/dashboard">
                  <LayoutDashboard className="h-4 w-4" />
                  Dashboard
                </Link>
              </Button>
              <Button variant="ghost" className="w-full justify-start gap-2" asChild>
                <Link href="/dashboard/home">
                  <Home className="h-4 w-4" />
                  Home
                </Link>
              </Button>
              <Button variant="ghost" className="w-full justify-start gap-2" asChild>
                <Link href="/dashboard/analytics">
                  <BarChart className="h-4 w-4" />
                  Analytics
                </Link>
              </Button>
              <Button variant="ghost" className="w-full justify-start gap-2" asChild>
                <Link href="/dashboard/users">
                  <Users className="h-4 w-4" />
                  Users
                </Link>
              </Button>
            </div>
          </div>
          <div className="px-2 py-2">
            <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">Settings</h2>
            <div className="space-y-1">
              <Button variant="ghost" className="w-full justify-start gap-2" asChild>
                <Link href="/dashboard/settings">
                  <Settings className="h-4 w-4" />
                  Settings
                </Link>
              </Button>
            </div>
          </div>
        </nav>
      </ScrollArea>
    </aside>
  )
}

