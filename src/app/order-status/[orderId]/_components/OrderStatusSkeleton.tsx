import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

const OrderStatusSkeleton = () => {
  return (
    <div>
      <Skeleton className="mb-5 h-[240px]" />
      <div className="mx-6 mt-5">
        <Skeleton className="mb-8 h-5" />
        <Skeleton className="mx-auto mb-4 h-8 w-[100px]" />
        <Skeleton className="mx-auto mb-12 h-4 w-[220px]" />
        <Skeleton className="mb-5 h-7 w-[74px]" />
        <Skeleton className="mb-12 h-6 w-[188px]" />
        <Skeleton className="mb-5 h-[2px] w-full" />
        <div className="flex flex-col gap-6">
          <Skeleton className="h-7 w-[100px]" />
          <Skeleton className="h-7 w-[100px]" />
          <Skeleton className="h-7 w-[100px]" />
          <Skeleton className="h-7 w-[100px]" />
        </div>
      </div>
    </div>
  )
}

export default OrderStatusSkeleton
