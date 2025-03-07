import Link from "next/link"
import {ChevronRightIcon,LayoutDashboard,Calendar,Users,User,Building2,BookUser, NotebookPen,Book,Receipt,FileClock,Settings2,UserCog} from "lucide-react"



export function DashboardSidebar() {
  return (
    <aside className="w-64 border-r bg-white">
        <div className="flex items-center gap-3 border-b p-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-md bg-black text-white">
            <span>TC</span>
          </div>
          <div>
            <h2 className="font-semibold">Tamrakar Cares</h2>
            <p className="text-sm text-muted-foreground">admin</p>
          </div>
        </div>

        <div className="p-2">
          <p className="mb-2 text-sm font-medium text-muted-foreground">Admin Center</p>
          <nav className="space-y-1">
            <Link
              href="/dashboard"
              className="flex items-center gap-3 rounded-md bg-gray-100 px-3 py-2 text-sm font-medium"
            >
              <LayoutDashboard/>
              Dashboard
            </Link>
            <Link
              href="/roster"
              className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
            >
            <Calendar/>
              Roster
            </Link>
            <Link
              href="/hrm"
              className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
            >
              <Users/>  
              HRM
              <ChevronRightIcon className="ml-auto h-4 w-4" />
            </Link>
            <Link
              href="/clients"
              className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
            >
              <User/>
              Clients
            </Link>
            <Link
              href="/organizations"
              className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
            >
              <Building2/>
              Organizations
            </Link>
            <Link
              href="/contacts"
              className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
            >
              <BookUser/> 
              Contacts
            </Link>
            <Link
              href="/updates"
              className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
            >
              <NotebookPen/>
              Updates
            </Link>
            <Link
              href="/packages"
              className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
            >
             <Book/>
              Packages
            </Link>
            <Link
              href="/invoices"
              className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
            >
              <Receipt/>
              Invoices
            </Link>
            <Link
              href="/logs"
              className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
            >
              <FileClock/>  
              Logs
              <ChevronRightIcon className="ml-auto h-4 w-4" />
            </Link>
            <Link
              href="/settings"
              className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
            >
              <Settings2/>
              Settings
            </Link>
            <Link
              href="/roles"
              className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
            >
              <UserCog/>
              Roles & Permissions
            </Link>
          </nav>
        </div>

        <div className="mt-auto border-t p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-gray-200 text-xs font-medium">
              TH
            </div>
            <div>
              <h3 className="text-sm font-medium">Tamrakar House</h3>
              <p className="text-xs text-muted-foreground truncate">tamrakarcares@mailinator.com</p>
            </div>
          </div>
        </div>
      </aside>
  )
}

