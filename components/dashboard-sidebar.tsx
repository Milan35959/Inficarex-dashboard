"use client"
import Link from "next/link"
import {ChevronRightIcon,LayoutDashboard,Calendar,Users,User,Building2,BookUser,SquarePlus, NotebookPen,Book,Receipt,FileClock,Settings2,UserCog, ChevronsUpDown, UsersIcon, SettingsIcon, CreditCardIcon, BellIcon, LogOutIcon, UserIcon, ChevronDownIcon, Users2} from "lucide-react"
import { DropdownMenu, DropdownMenuTrigger } from "./ui/dropdown-menu"
import { Button } from "./ui/button"
import { DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from "@radix-ui/react-dropdown-menu"
import { useState } from "react"



export function DashboardSidebar() {
  const [hrmOpen, setHrmOpen] = useState(false);
  const [logOpen, setLogOpen] = useState(false);
  return (
    <aside className="flex h-screen w-64 flex-col border-r bg-slate-50 text-gray-700">
      <div className="flex items-center gap-3  p-4">
      <div className="flex h-10 w-10 items-center justify-center rounded-md bg-black text-white">
                <span>IC</span>
              </div>
              <div className="text-left">
                <h2 className="font-semibold leading-none">InficureX</h2>
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
           
            <div>
            <button
              onClick={() => setHrmOpen(!hrmOpen)}
              className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 focus:outline-none"
            >
              <Users />
              HRM
              {hrmOpen ? (
                <ChevronDownIcon className="ml-auto h-4 w-4" />
              ) : (
                <ChevronRightIcon className="ml-auto h-4 w-4" />
              )}
            </button>

            {/* Submenu */}
            {hrmOpen && (
              <div className="ml-8 mt-1 space-y-1">
                <Link
                  href="/hrm/staff"
                  className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
                >
                  Staff
                </Link>
                <Link
                  href="/hrm/plan-manager"
                  className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
                >
                  Plan Manager
                </Link>
              </div>
            )}
          </div>
            <Link
              href="/ndis"
              className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
            >
              <Users2/>
              NDIS
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
              href="/packages"
              className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
            >
             <Book/>
              Packages
            </Link>
          
            <div>
            <button
              onClick={() => setLogOpen(!logOpen)}
              className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 focus:outline-none"
            >
              <FileClock />
              Logs
              {logOpen ? (
                <ChevronDownIcon className="ml-auto h-4 w-4" />
              ) : (
                <ChevronRightIcon className="ml-auto h-4 w-4" />
              )}
            </button>

            {/* Submenu */}
            {logOpen && (
              <div className="ml-8 mt-1 space-y-1">
                <Link
                  href="/log/login"
                  className="flex items-center gap-3 rounded-md px-2 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
                >
                  Login Logs
                </Link>
                <Link
                  href="/log/activity"
                  className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
                >
                  Activity Logs
                </Link>
              </div>
            )}
          </div>
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

        <div className="mt-auto  p-4">
    <DropdownMenu>
        <Button variant="ghost" className="w-[240px] justify-start px-2 hover:ring-1 hover:ring-blue">
      <DropdownMenuTrigger asChild>
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-6 items-center justify-center rounded-md bg-gray-200 text-xs font-medium">
              TH
            </div>
            <div className="flex-1 text-left">
              <h3 className="text-sm font-medium">Tamrakar House</h3>
              <p className="text-xs text-muted-foreground truncate">tamrakarcares@mailinator.com</p>
            </div>
            <ChevronsUpDown className="h-4 w-4 opacity-50" />
          </div>
      </DropdownMenuTrigger>
      </Button>
      
      {/* Dropdown appears to the right of the button */}
      <DropdownMenuContent side="right" align="start" className="w-56 bg-white mb-4 rounded-md shadow-lg">
        <DropdownMenuItem className="flex items-center gap-2 p-2 border-b-2 border-slate-100">
        <div className="flex h-8 w-6 items-center justify-center rounded-md bg-gray-200 text-xs font-medium">
              TH
            </div>
            <div className="flex-1 text-left">
              <h3 className="text-sm font-medium">Tamrakar House</h3>
              <p className="text-xs text-muted-foreground truncate">tamrakarcares@mailinator.com</p>
            </div>
        </DropdownMenuItem>
        <DropdownMenuItem className="flex items-center gap-2 p-2 border-b-2 border-slate-100">
          <UsersIcon className="mr-2 h-4 w-4" />
          <span>View Frontline</span>
        </DropdownMenuItem>
        <DropdownMenuItem className="flex items-center gap-2 p-2 border-b-2 border-slate-100">
          <SettingsIcon className="mr-2 h-4 w-4" />
          <span>Account</span>
        </DropdownMenuItem>
        <DropdownMenuItem className="flex items-center gap-2 p-2 border-b-2 border-slate-100">
          <CreditCardIcon className="mr-2 h-4 w-4" />
          <span>Billing</span>
        </DropdownMenuItem>
        <DropdownMenuItem className="flex items-center gap-2 p-2 border-b-2 border-slate-100">
          <BellIcon className="mr-2 h-4 w-4" />
          <span>Notifications</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <Link href="/login">
        <DropdownMenuItem className="text-red-600 flex items-center gap-2 p-2 border-b-2 border-slate-100">
          <LogOutIcon className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem> 
        </Link>
    
      </DropdownMenuContent>
    </DropdownMenu>
  </div>
      </aside>
  )
}

