'use client'
import * as React from 'react'
import { IoLocationOutline } from 'react-icons/io5'

interface AddressProps {
  address: string
}

export default function AddressContainer({ address }: AddressProps) {
  return (
    <div className="mb-4 flex items-center justify-start">
      <IoLocationOutline size={20} />
      <p>{address}</p>
    </div>
  )
}
