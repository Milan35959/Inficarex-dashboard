"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Breadcrumb from "@/components/breadcrumb"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ArrowDownUp, Eye, Plus, Trash2, Users, UserX, UserCheck, UserPlus, RefreshCcw } from "lucide-react"
import { apiRequest } from "@/lib/auth"

interface NdisProvider {
  id: string
  ndis_provider_name: string
  ndis_provider_number: string | null
  ndis_abn: string
  ndis_registered_location: string
  ndis_business_email: string
  entity_detail: string
  primary_person_full_name: string
  primary_person_designation: string
  primary_person_email: string
  primary_person_phone: string
}

interface ApiResponse {
  success: boolean
  data: {
    pagination: {
      total: number
      max_pages: number
      page_number: number
      per_page: number
    }
    ndis: NdisProvider[]
  }
  message: string
  metadata: {
    api_version: string
  }
}

export default function NdisPage() {
  const [ndisProviders, setNdisProviders] = useState<NdisProvider[]>([])
  const [totalProviders, setTotalProviders] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const router = useRouter()

  const fetchNdisData = async () => {
    try {
      setLoading(true)
      setError(null)

      // Use our auth middleware to make the request
      const data = await apiRequest("dashboard/ndis")
      console.log("NDIS data:", data)

      if (data.success) {
        setNdisProviders(data.data.ndis)
        setTotalProviders(data.data.pagination.total)
      } else {
        setError(`Failed to fetch NDIS data: ${data.message}`)
      }
    } catch (error) {
      console.error("Error fetching NDIS data:", error)
      setError(error instanceof Error ? error.message : "An unexpected error occurred")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchNdisData()
  }, [])

  // Filter providers based on search term
  const filteredProviders = ndisProviders.filter(
    (provider) =>
      provider.ndis_provider_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      provider.primary_person_full_name.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // For demonstration purposes, we'll calculate some stats
  const activeProviders = ndisProviders.length
  const disabledProviders = 0 // This would come from your API if available
  const onboardingProviders = 0 // This would come from your API if available

  return (
    <div className="flex-1 space-y-4 p-4 md:p-6 pt-6">
      <Breadcrumb linkHref="/Dashboard" linkLabel="Dashboard" currentPage="NDIS Providers" />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="w-full h-[100px] py-1">
          <CardContent className="flex items-center justify-between p-4">
            <div>
              <p className="text-2xl font-bold">{totalProviders}</p>
              <p className="text-medium text-gray-500">Total Providers</p>
            </div>
            <div className="rounded-full bg-blue-50 p-3">
              <Users className="text-blue-500 h-6 w-6" />
            </div>
          </CardContent>
        </Card>
        <Card className="w-full h-[100px] py-1">
          <CardContent className="flex items-center justify-between p-4">
            <div>
              <p className="text-2xl font-bold">{disabledProviders}</p>
              <p className="text-medium text-gray-500">Disabled Providers</p>
            </div>
            <div className="rounded-full bg-red-50 p-3">
              <UserX className="text-red-500 h-6 w-6" />
            </div>
          </CardContent>
        </Card>
        <Card className="w-full h-[100px] py-1">
          <CardContent className="flex items-center justify-between p-4">
            <div>
              <p className="text-2xl font-bold">{activeProviders}</p>
              <p className="text-medium text-gray-500">Active Providers</p>
            </div>
            <div className="rounded-full bg-green-50 p-3">
              <UserCheck className="text-green-500 h-6 w-6" />
            </div>
          </CardContent>
        </Card>
        <Card className="w-full h-[100px] py-1">
          <CardContent className="flex items-center justify-between p-4">
            <div>
              <p className="text-2xl font-bold">{onboardingProviders}</p>
              <p className="text-medium text-gray-500">Onboarding Providers</p>
            </div>
            <div className="rounded-full bg-orange-50 p-3">
              <UserPlus className="text-orange-500 h-6 w-6" />
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="relative flex-1 md:max-w-sm">
          <Input
            placeholder="Search by provider name"
            className="pl-3 font-medium"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          {error && (
            <Button variant="outline" onClick={fetchNdisData} className="gap-2">
              <RefreshCcw className="h-4 w-4" />
              Retry
            </Button>
          )}
          <Button className="gap-2 bg-black hover:bg-blue-700" onClick={() => router.push("/ndis/add")}>
            <Plus className="h-4 w-4" />
            Add New NDIS Provider
          </Button>
        </div>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="bg-blue-50">PROVIDER NAME</TableHead>
              <TableHead className="bg-blue-50">
                ABN
                <ArrowDownUp className="ml-2 inline-block h-4 w-4" />
              </TableHead>
              <TableHead className="bg-blue-50">LOCATION</TableHead>
              <TableHead className="bg-blue-50">PRIMARY CONTACT</TableHead>
              <TableHead className="bg-blue-50">CONTACT EMAIL</TableHead>
              <TableHead className="text-right bg-blue-50">ACTION</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-4">
                  Loading NDIS provider data...
                </TableCell>
              </TableRow>
            ) : error ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-4 text-red-500">
                  {error}
                </TableCell>
              </TableRow>
            ) : filteredProviders.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-4">
                  No NDIS providers found
                </TableCell>
              </TableRow>
            ) : (
              filteredProviders.map((provider) => (
                <TableRow key={provider.id}>
                  <TableCell className="font-medium">{provider.ndis_provider_name}</TableCell>
                  <TableCell>{provider.ndis_abn}</TableCell>
                  <TableCell>{provider.ndis_registered_location}</TableCell>
                  <TableCell>{provider.primary_person_full_name}</TableCell>
                  <TableCell>{provider.primary_person_email}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

