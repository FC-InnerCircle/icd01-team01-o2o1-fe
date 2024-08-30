'use client'
import Image, { StaticImageData } from 'next/image'
import * as React from 'react'
import Star from '@images/home/star.svg'

interface RestaurantProps {
  restaurant: {
    id: number
    name: string
    imageSrc: StaticImageData
    rating: number
    reviews: number
  }
}

export default function StoreCard({ restaurant }: RestaurantProps) {
  return (
    <div key={restaurant.id} className="overflow-hidden rounded-lg bg-white shadow">
      <div className="relative h-48 w-full">
        <Image src={restaurant.imageSrc} alt={restaurant.name} layout="fill" objectFit="cover" />
      </div>
      <div className="flex flex-col p-4">
        <h2 className="text-lg font-semibold">{restaurant.name}</h2>
        <div className="flex">
          <Image src={Star} alt={'별점'} width={16} height={16} />
          <span>
            {restaurant.rating}({restaurant.reviews})
          </span>
        </div>
      </div>
    </div>
  )
}
