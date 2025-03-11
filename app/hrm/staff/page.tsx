"use client"

import { useState } from "react"
import { BookOpen, ChevronDown, ChevronRight, Eye, Plus, Tally1, Trash2, ArrowDownUp } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import Breadcrumb from "@/components/breadcrumb"

export default function StaffsPage() {
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10
  const totalPages = 3 // This would normally be calculated from total items

  const staffs = [
    {
      name: "Telly Carter",
      email: "breitenberg.agnes@mailinator.com",
      phone: "0418 251 351",
      status: "active",
      joinedDate: "2025-03-10T10:43:26.00000Z",
    },
    {
      name: "Camila Moore",
      email: "henriette.barrows@mailinator.com",
      phone: "0484 346 271",
      status: "active",
      joinedDate: "2025-03-10T10:43:26.00000Z",
    },
    {
      name: "Jayme Stracke",
      email: "haylie96@mailinator.com",
      phone: "0437 215 943",
      status: "active",
      joinedDate: "2025-03-10T10:43:26.00000Z",
    },
    {
      name: "Diana Rath",
      email: "leone66@mailinator.com",
      phone: "0463 011 005",
      status: "active",
      joinedDate: "2025-03-10T10:43:26.00000Z",
    },
    {
      name: "Colten Bashirian",
      email: "brown.pierre@mailinator.com",
      phone: "0408 541 004",
      status: "active",
      joinedDate: "2025-03-10T10:43:26.00000Z",
    },
    {
      name: "Tamrakar House",
      email: "tamrakarcares@mailinator.com",
      phone: "0416 216 228",
      status: "active",
      joinedDate: "2025-03-10T10:43:25.00000Z",
    },
    {
      name: "Antwan Bayer",
      email: "oma.schmitt@mailinator.com",
      phone: "0455 480 913",
      status: "active",
      joinedDate: "2025-03-10T10:43:25.00000Z",
    },
    {
      name: "Lamar Farrell",
      email: "autumn.kiehn@mailinator.com",
      phone: "0433 812 469",
      status: "active",
      joinedDate: "2025-03-10T10:43:25.00000Z",
    },
  ]

  return (
    <div className="flex-1 space-y-4 p-4 md:p-6 pt-6">
      {/* Breadcrumb */}
      <Breadcrumb linkHref="/Dashboard" linkLabel="HRM" currentPage="Staff"/>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="w-[300px] h-[100px] py-1">
          <CardContent className="flex items-center justify-between   p-4">
            <div >
              <p className="text-2xl font-bold">11</p>
              <p className="text-medium text-gray-500 ">Total Staffs</p>
            </div>
            <div className="rounded-full bg-blue-50 p-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-blue-500"
              >
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            </div>
          </CardContent>
        </Card>
        <Card className="w-[300px] h-[100px] py-1">
          <CardContent className="flex items-center justify-between p-4">
            <div>
              <p className="text-2xl font-bold">0</p>
              <p className="text-medium text-gray-500">Disabled Staffs</p>
            </div>
            <div className="rounded-full bg-red-50 p-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-red-500"
              >
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <line x1="3" x2="15" y1="3" y2="15" />
              </svg>
            </div>
          </CardContent>
        </Card>
        <Card className="w-[300px] h-[100px] py-1">
          <CardContent className="flex items-center justify-between p-4">
            <div>
              <p className="text-2xl font-bold">11</p>
              <p className="text-medium text-gray-500">Active Staffs</p>
            </div>
            <div className="rounded-full bg-green-50 p-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-green-500"
              >
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="m9 11 3 3L22 4" />
              </svg>
            </div>
          </CardContent>
        </Card>
        <Card className="w-[300px] h-[100px] py-1">
          <CardContent className="flex items-center justify-between p-4">
            <div>
              <p className="text-2xl font-bold">0</p>
              <p className="text-medium text-gray-500">Onboarding Staffs</p>
            </div>
            <div className="rounded-full bg-orange-50 p-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-orange-500"
              >
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M19 8v6" />
                <path d="M22 11h-6" />
              </svg>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Add Staff */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="relative flex-1 md:max-w-sm">
          
          <Input placeholder="Search by user name" className="pl-3 font-medium" />
        </div>
        <Button className="gap-2 bg-black hover:bg-blue-700">
          <Plus className="h-4 w-4" />
          Add New Staff
        </Button>
      </div>

      {/* Staff Table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="bg-blue-50">USER NAME</TableHead>
              <TableHead className="bg-blue-50">
                EMAIL
                < ArrowDownUp className="ml-2 inline-block h-4 w-4" />
              </TableHead>
              <TableHead className="bg-blue-50">PHONE</TableHead>
              <TableHead className="bg-blue-50">STATUS</TableHead>
              <TableHead className="bg-blue-50">Joined Date</TableHead>
              <TableHead className="text-right bg-blue-50">ACTION</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {staffs.map((staff) => (
              <TableRow key={staff.email}>
                <TableCell className="font-medium">{staff.name}</TableCell>
                <TableCell>{staff.email}</TableCell>
                <TableCell>{staff.phone}</TableCell>
                <TableCell>
                  <span className="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700">
                    {staff.status}
                  </span>
                </TableCell>
                <TableCell>{new Date(staff.joinedDate).toLocaleString()}</TableCell>
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
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between border-t px-2 py-4">
        <div className="text-sm text-gray-500">
          Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, staffs.length)} of{" "}
          {staffs.length} entries
        </div>
        <div className="flex gap-1">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          {[...Array(totalPages)].map((_, i) => (
            <Button
              key={i + 1}
              variant={currentPage === i + 1 ? "default" : "outline"}
              size="sm"
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </Button>
          ))}
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}

