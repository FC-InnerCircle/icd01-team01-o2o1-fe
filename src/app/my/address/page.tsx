'use client'
import BackButton from '@/components/shared/BackButton'
import Header from '@/components/shared/Header'
import { Separator } from '@/components/ui/separator'
import React from 'react'

import { PlusCircledIcon } from '@radix-ui/react-icons'
import { useRouter } from 'next/navigation'
import AddressList from './_components/AddressList'

const ManagedAddressPage = () => {
  const router = useRouter()
  return (
    <div>
      <Header left={<BackButton />} center="주소 관리" />
      <div className="p-4" onClick={() => router.push('/my/address/search')}>
        <PlusCircledIcon className="my-1 mr-1 inline size-5 text-[#0FA5FA]" />새 주소 추가
      </div>
      <Separator className="h-2" />
      <AddressList />
    </div>
  )
}

export default ManagedAddressPage
