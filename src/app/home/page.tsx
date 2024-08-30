import Image from 'next/image'
import NullImage from '@images/home/null_image.svg'
import { IoLocationOutline } from 'react-icons/io5'
import CategoryButton from '@/components/home/CategoryButton'
import StoreCard from '@/components/home/StoreCard'
import AddressContainer from '@/components/home/AddressContainer'

const address = '서울 강남구 강남대로 396'

const categories = [
  '1인분',
  '족발·보쌈',
  '돈까스·회·일식',
  '고기·구이',
  '찜·탕·찌개',
  '양식',
  '중식',
  '아시안',
  '치킨',
  '백반·죽·국수',
  '버거',
  '카페·디저트',
  '분식',
]
const restaurants = [
  { id: 1, name: '우리집 밥상', imageSrc: NullImage, rating: 4.7, reviews: 159 },
  { id: 2, name: '우리집 밥상', imageSrc: NullImage, rating: 4.7, reviews: 159 },
  { id: 3, name: '우리집 밥상', imageSrc: NullImage, rating: 4.7, reviews: 159 },
  { id: 4, name: '우리집 밥상', imageSrc: NullImage, rating: 4.7, reviews: 159 },
  { id: 5, name: '우리집 밥상', imageSrc: NullImage, rating: 4.7, reviews: 159 },
  { id: 6, name: '우리집 밥상', imageSrc: NullImage, rating: 4.7, reviews: 159 },
  { id: 7, name: '우리집 밥상', imageSrc: NullImage, rating: 4.7, reviews: 159 },
]

export default function Home() {
  return (
    <div className="flex flex-col p-4 pb-[4.5rem]">
      <AddressContainer address={address} />
      <div className="scroll mb-4 overflow-x-auto whitespace-nowrap scrollbar-hide">
        {categories.map((category, index) => (
          <CategoryButton key={index} category={category} />
        ))}
      </div>

      <div className="space-y-4">
        {restaurants.map((restaurant) => (
          <StoreCard key={restaurant.id} restaurant={restaurant} />
        ))}
      </div>
    </div>
    // </div>
  )
}
