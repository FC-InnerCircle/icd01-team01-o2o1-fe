'use client'

import { Skeleton } from '@/components/ui/skeleton'
import { useGetMemberHooks } from '@/features/member/hooks/useGetMemberHook'
import React from 'react'

const UserInfo = () => {
  const { data, isLoading } = useGetMemberHooks()
  if (isLoading)
    return (
      <div className="space-y-2">
        <Skeleton className="h-4 w-16" />
        <Skeleton className="h-4 w-36" />
      </div>
    )

  return (
    <div>
      <div className="text-xl">{data?.nickName}</div>
      <div>{data?.contact}</div>
    </div>
  )
}

export default UserInfo
