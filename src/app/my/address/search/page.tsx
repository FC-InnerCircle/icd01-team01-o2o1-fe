'use client'
import BackButton from '@/components/shared/BackButton'
import Header from '@/components/shared/Header'
import React from 'react'
import { MagnifyingGlassIcon } from '@radix-ui/react-icons'
import { Separator } from '@/components/ui/separator'

const AddressSearchPage = () => {
  return (
    <div>
      <Header left={<BackButton />} center="주소 검색" />
      <div className="p-4 text-gray-400" onClick={() => console.log('???')}>
        <MagnifyingGlassIcon className="mr-1 inline size-5 text-black" />
        도로명, 건물명 또는 지번으로 검색
      </div>
      <Separator className="h-2" />
    </div>
  )
}

export default AddressSearchPage
