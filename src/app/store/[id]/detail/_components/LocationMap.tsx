'use client'

import { Map } from 'react-kakao-maps-sdk'
import { useGetStoreDetailInfo } from '@/features/store/hooks/useGetStoreDetailInfo'
import { Skeleton } from '@/components/ui/skeleton'
import StoreLocationItem from './StoreLocationItem'

const LocationMap = () => {
  const { data, isLoading } = useGetStoreDetailInfo()

  // 기본 좌표를 설정 (예: 서울 시청)
  const defaultCenter = { lat: 37.5665, lng: 126.978 }

  const mapCenter = {
    lat: data?.latitude ?? defaultCenter.lat,
    lng: data?.longitude ?? defaultCenter.lng,
  }

  return isLoading === true ? (
    <Skeleton className="h-[240px] w-full bg-gray-200" />
  ) : (
    <Map center={mapCenter} className="relative h-[240px] w-full bg-gray-200" level={4}>
      <StoreLocationItem lat={mapCenter.lat} lng={mapCenter.lng} />
    </Map>
  )
}

export default LocationMap
