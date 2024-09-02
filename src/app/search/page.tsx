'use client'
import NullImage from '@images/home/null_image.svg'
import StoreCard from '@/components/home/StoreCard'
import { useState } from 'react'
import SearchInput from '@/components/search/SearchInput'

const restaurants = [
  { id: 1, name: '우리집 밥상', imageSrc: NullImage, rating: 4.7, reviews: 159 },
  { id: 2, name: '홍콩반점', imageSrc: NullImage, rating: 4.3, reviews: 120 },
  { id: 3, name: '돈까스의집', imageSrc: NullImage, rating: 4.1, reviews: 80 },
  { id: 4, name: '고기천국', imageSrc: NullImage, rating: 4.5, reviews: 200 },
  { id: 5, name: '서울식당', imageSrc: NullImage, rating: 4.8, reviews: 95 },
  { id: 6, name: '치킨마을', imageSrc: NullImage, rating: 4.9, reviews: 210 },
  { id: 7, name: '분식천국', imageSrc: NullImage, rating: 4.2, reviews: 180 },
]

export default function Seacrch() {
  const [searchTerm, setSearchTerm] = useState('')
  const filteredRestaurants = restaurants.filter((restaurant) =>
    restaurant.name.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="flex flex-col p-4 pb-[4.5rem]">
      <SearchInput searchTerm={searchTerm} onSearchChange={setSearchTerm} />
      <div className="space-y-4">
        {filteredRestaurants.map((restaurant) => (
          <StoreCard key={restaurant.id} restaurant={restaurant} />
        ))}
      </div>
    </div>
  )
}
