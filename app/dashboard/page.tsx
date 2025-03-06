// import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function DashboardPage() {
  return (
   
     
      <div className="flex flex-1">
        <DashboardSidebar />
        <main className="flex-1 p-6">
          <div className="space-y-6">
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>Total Users</CardTitle>
                  <CardDescription>Active users on your platform</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">2,543</div>
                  <p className="text-xs text-muted-foreground">+12.5% from last month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>Revenue</CardTitle>
                  <CardDescription>Monthly revenue</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">$45,231</div>
                  <p className="text-xs text-muted-foreground">+7.2% from last month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>Active Projects</CardTitle>
                  <CardDescription>Projects in progress</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">12</div>
                  <p className="text-xs text-muted-foreground">+2 new this month</p>
                </CardContent>
              </Card>
            </div>
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Your recent actions and updates</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1, 2, 3, 4, 5].map((item) => (
                    <div key={item} className="flex items-center gap-4 border-b pb-4 last:border-0">
                      <div className="h-10 w-10 rounded-full bg-muted"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">User updated their profile</p>
                        <p className="text-xs text-muted-foreground">2 hours ago</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    
  )
}

