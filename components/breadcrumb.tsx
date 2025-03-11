import { BookOpen, ChevronRight, Tally1 } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

//  Define prop types
interface BreadcrumbProps {
  linkHref: string
  linkLabel: string
  currentPage: string
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ linkHref, linkLabel, currentPage }) => {
  return (
    <div className="flex items-center space-x-1 text-sm text-gray-500">
      <BookOpen /> 

      <Tally1 className="h-10 w-8 pl-2" />

      <Link href="/Dashboard" className="hover:text-blue-600">
        Dashboard
      </Link>

      <ChevronRight className="h-4 w-4" />
      <Link href={linkHref} className="hover:text-blue-600">
        {linkLabel}
      </Link>

      <ChevronRight className="h-4 w-4" />

      <span className="font-medium text-gray-900">{currentPage}</span>
    </div>
  )
}

export default Breadcrumb
