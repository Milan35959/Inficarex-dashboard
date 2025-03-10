// import { DashboardHeader } from "@/components/dashboard-header"
import { ClientDistributionChart } from "@/components/clientDistributionChart"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

import { User, Users,MessageSquare,BookOpen, CalendarIcon, SettingsIcon, UsersIcon, UserPlusIcon } from "lucide-react"
import Link from "next/link"

export default function DashboardPage() {
  return (
   
     
      
       
        <div className="flex-1 p-2">
        <div className="mb-6 flex items-center">
          <div className="flex items-center gap-2">
            <BookOpen/>
            <span className="text-slate-400">|</span>
            <h1 className="text-xl font-semibold">Dashboard</h1>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
         <Card className="w-[300px] h-[110px]">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">All Users</CardTitle>
                  <Users/>
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-bold">14</div>
                </CardContent>
              </Card>
          
          <Card className="w-[300px] h-[110px]">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">All Clients</CardTitle>
              <User/>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold">14</div>
            </CardContent>
          </Card>

          <Card className="w-[300px] h-[110px]">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Complaints</CardTitle>
            <MessageSquare/>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold">0</div>
            </CardContent>
          </Card>

          <Card className="bg-red-500 text-white w-[300px] h-[110px]">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Incidents</CardTitle>
              <MessageSquare/>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold">0</div>
            </CardContent>
          </Card>
        </div>

        {/* Charts and Lists */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[400px_500px_300px]">
          {/* Client Distribution */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="text-center font-bold text-xl">Client Distribution</CardTitle>
              <p className="text-sm font-medium text-center text-muted-foreground">NDIS clients by state and territory</p>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center">
                <ClientDistributionChart />
                <div className="mt-2 text-center">
                  {/* <div className="text-4xl font-bold">14</div> */}
                  <div className="text-xl font-bold text-black ">Total Clients</div>
                </div>
                <div className="mt-4 text-sm text-muted-foreground">
                  Increased by 8.3% from previous year
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-trending-up ml-1 inline-block"
                  >
                    <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
                    <polyline points="16 7 22 7 22 13" />
                  </svg>
                </div>
              </div>
            </CardContent>
            {/* Roster */}
          </Card>
          <Card className="overflow-hidden lg:col-span-1">
            <CardHeader >
              <CardTitle className="text-xl font-bold">Today's Rosters</CardTitle>
              <p className="text-sm font-medium text-muted-foreground">Friday, March 7, 2025</p>
            </CardHeader>
            <CardContent className="space-y-3 p-3 pt-1">
              <div className="rounded-md bg-blue-50 p-3">
                <div className="flex  items-center gap-2">
                  <div className="w-7 h-7 bg-blue-100 rounded-sm flex items-center justify-center">

                  <CalendarIcon className="mt-0.5 h-6 w-6 text-blue-500" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold">Tamrakar House</h3>
                    <div className="text-sm text-slate-400">
                      <span className="font-medium">Client:</span> Cedrick Hudson
                    </div>
                  </div>
                  <div className="text-right text-sm text-slate-400">
                    <div>4:15 PM - 5:15 PM</div>
                    <div className="text-muted-foreground">Single-Day</div>
                  </div>
                </div>
              </div>

              <div className="rounded-md bg-blue-50 p-3">
                <div className="flex items-center gap-2">
                <div className="w-7 h-7 bg-blue-100 rounded-sm flex items-center justify-center">

                <CalendarIcon className="mt-0.5 h-6 w-6 text-blue-500" />
                </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold">Tamrakar House</h3>
                    <div className="text-sm text-slate-400">
                      <span className="font-medium">Client:</span> Keara Luettgen
                    </div>
                  </div>
                  <div className="text-right text-sm text-slate-400">
                    <div>12:15 AM - 1:15 AM</div>
                    <div className="text-muted-foreground">Single-Day</div>
                  </div>
                </div>
              </div>
            </CardContent>
            {/* Quick Acsses */}
          </Card>
          <Card className="overflow-hidden lg:col-span-1">
            <CardHeader >
              <CardTitle className="text-xl font-bold">Quick Access</CardTitle>
              <p className="text-sm font-medium text-muted-foreground">Frequently used tools and resources</p>
            </CardHeader>
            <CardContent className="space-y-2 p-3 pt-1">
              <Link
                href="/staff/new"
                className="flex items-center gap-2 border-2 rounded-md p-2 transition-colors hover:bg-gray-100"
              >
                <div className="flex h-6 w-6 items-center  justify-evenly rounded-full bg-gray-100">
                  <UserPlusIcon className="h-5 w-5 " />
                </div>
                <span className="text-sm font-medium ">Add New Staff</span>
              </Link>

              <Link
                href="/clients/new"
                className="flex items-center gap-2 rounded-md border-2 p-2 transition-colors hover:bg-gray-100"
              >
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-100">
                  <UsersIcon className="h-5 w-5" />
                </div>
                <span className="text-sm font-medium ">Add New Client</span>
              </Link>

              <Link
                href="/contacts/new"
                className="flex items-center gap-2 rounded-md border-2 p-2 transition-colors hover:bg-gray-100"
              >
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-100">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-contact"
                  >
                    <path d="M17 18a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2" />
                    <rect width="18" height="18" x="3" y="4" rx="2" />
                    <circle cx="12" cy="10" r="2" />
                    <line x1="8" x2="8" y1="2" y2="4" />
                    <line x1="16" x2="16" y1="2" y2="4" />
                  </svg>
                </div>
                <span className="text-sm font-medium">Add Contacts</span>
              </Link>

              <Link
                href="/settings"
                className="flex items-center gap-2 border-2  rounded-md p-2 transition-colors hover:bg-gray-100"
              >
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-100">
                  <SettingsIcon className="h-5 w-5" />
                </div>
                <span className="text-sm font-medium">Settings</span>
              </Link>
            </CardContent>
          </Card>
        
      </div>
      
    </div>

    
  )
}

