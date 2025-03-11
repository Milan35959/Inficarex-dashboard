import Breadcrumb from '@/components/breadcrumb'
import React from 'react'

const page = () => {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-6 pt-6">
      {/* Breadcrumb */}
      <Breadcrumb linkHref="/Dashboard" linkLabel="HRM" currentPage="Plan Manager"/>

    </div>
  )
}

export default page
