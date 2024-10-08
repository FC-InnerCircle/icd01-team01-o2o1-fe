'use client'

import Image from 'next/image'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { useState } from 'react'
import { useGetStoreDetailInfo } from '@/features/store/hooks/useGetStoreDetailInfo'
import { Skeleton } from '@/components/ui/skeleton'
import { useParams } from 'next/navigation'

const settings = {
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
}

const Thumbnail = () => {
  const params = useParams<{ menuId: string }>()
  const { data, isLoading } = useGetStoreDetailInfo()
  const [errorIndexes, setErrorIndexes] = useState<Set<number>>(new Set())

  const images =
    data?.menus
      ?.filter((menu) => menu.menuId === Number(params.menuId))
      .flatMap((menu) => menu.menuImages) || []

  const handleImageError = (index: number) => {
    setErrorIndexes((prev) => new Set(prev.add(index)))
  }

  if (isLoading) {
    return (
      <figure className="relative h-[220px] w-full bg-gray-200">
        <Skeleton className="h-full w-full" /> {/* 스켈레톤 적용 */}
      </figure>
    )
  }

  if (images.length === 0) {
    return (
      <figure className="relative h-[220px] w-full bg-gray-200">
        <div className="absolute inset-0 flex items-center justify-center text-white">
          이미지가 없어요
        </div>
      </figure>
    )
  }

  if (images.length === 1) {
    return (
      <figure className="relative h-[220px] w-full bg-gray-200">
        <Image
          src={images[0]}
          alt="Thumbnail"
          fill
          priority
          onError={() => handleImageError(0)} // 이미지 로드 실패 시 호출
        />
        {errorIndexes.has(0) && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-400 text-white">
            이미지 로드 실패
          </div>
        )}
      </figure>
    )
  }

  return (
    <div className="relative h-[220px] w-full overflow-hidden">
      <Slider {...settings}>
        {images.map((src, index) => (
          <figure key={index} className="relative h-[220px] w-full bg-gray-200">
            <Image
              src={src}
              alt={`Thumbnail ${index + 1}`}
              fill
              priority={index === 0}
              onError={() => handleImageError(index)} // 이미지 로드 실패 시 호출
            />
            {errorIndexes.has(index) && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-400 text-white">
                이미지 로드 실패
              </div>
            )}
          </figure>
        ))}
      </Slider>
    </div>
  )
}

export default Thumbnail
