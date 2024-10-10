import { StoreIcon, CircleUser, Car } from 'lucide-react'
import React from 'react'
import { CustomOverlayMap } from 'react-kakao-maps-sdk'

interface StoreLocationItemProps {
  lat: number
  lng: number
}

const StoreLocationItem = ({ lat, lng }: StoreLocationItemProps) => {
  return (
    <CustomOverlayMap
      position={{
        lat,
        lng,
      }}
    >
      <div className="rounded-full bg-main p-2">
        <StoreIcon width={24} height={24} strokeWidth={1.25} color="white" />
      </div>
    </CustomOverlayMap>
  )
}

export default StoreLocationItem
