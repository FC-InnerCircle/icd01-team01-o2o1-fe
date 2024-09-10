import React from 'react'
// import { Star, X } from 'lucide-react'
import Star from '@images/home/star.svg'
import Image from 'next/image'
import { X } from 'lucide-react'
import { StarFilledIcon } from '@radix-ui/react-icons'
import { Separator } from '@/components/ui/separator'

type Address = {
  addressId: number
  latitude: number
  longitude: number
  address: string
  addressDetail: string
  zipCode: string
  addressStatus: string
}

const mockData = {
  addresses: [
    {
      addressId: 1,
      latitude: 37.5665,
      longitude: 126.978,
      address: '서울시 블라',
      addressDetail: '몇동 몇호',
      zipCode: '12345',
      addressStatus: 'main',
    },
    {
      addressId: 2,
      latitude: 37.5665,
      longitude: 126.978,
      address: '서울시 블라',
      addressDetail: '몇동 몇호',
      zipCode: '12345',
      addressStatus: 'sub',
    },
  ],
}

const AddressList = () => {
  return (
    <ul className="p-2">
      {mockData.addresses.map((address) => (
        <AddressListItem {...address} key={address.addressId} />
      ))}
    </ul>
  )
}

export default AddressList

const AddressListItem = ({ ...props }: Address) => {
  return (
    <>
      <li key={props.addressId} className="flex h-12 items-center justify-between bg-white p-3">
        <div className="flex items-center space-x-3">
          <StarFilledIcon
            className={`h-5 w-5 ${
              props.addressStatus == 'main' ? 'text-yellow-400' : 'text-gray-400'
            }`}
          />

          <span className="text-gray-700">{props.address}</span>
        </div>
        <button className="text-gray-400 hover:text-gray-600">
          <X className="h-5 w-5" />
        </button>
      </li>
      <Separator />
    </>
  )
}
