// import { DashboardHeader } from "@/components/dashboard-header"
import { ClientDistributionChart } from "@/components/clientDistributionChart"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import CustomCard from "@/components/ui/customCard"
import { User, Users,MessageSquare,BookOpen } from "lucide-react"

export default function DashboardPage() {
  return (
   
     
      <div className="flex flex-1">
        <DashboardSidebar />
        <div className="flex-1 p-6">
        <div className="mb-6 flex items-center">
          <div className="flex items-center gap-2">
            <BookOpen/>
            <h1 className="text-xl font-semibold">Dashboard</h1>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
         <CustomCard content="All Users" number="14" icon={<Users/>}/>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">All Clients</CardTitle>
              <User/>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold">14</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Complaints</CardTitle>
            <MessageSquare/>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold">0</div>
            </CardContent>
          </Card>

          <Card className="bg-red-500 text-white">
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
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Client Distribution */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle>Client Distribution</CardTitle>
              <p className="text-sm text-muted-foreground">NDIS clients by state and territory</p>
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
          </Card>
      </div>
    </div>
  </div>
    
  )
}

