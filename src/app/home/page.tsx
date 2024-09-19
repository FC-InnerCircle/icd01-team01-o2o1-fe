'use client'
import React, { useEffect, useState } from 'react'
import CategoryButton from '@/components/home/CategoryButton'
import StoreCard from '@/components/home/StoreCard'
import AddressContainer from '@/components/home/AddressContainer'
import useStoreData from '@/mocks/handlers/store'
import { Store } from '@/types/store'
import LoadingSpinner from '@/components/common/LoadingSpinner'
import useGetStoreList from '@/features/store/hooks/useGetStoreList'

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const { useCategoryQuery } = useStoreData()
  const { data: categories, error: categoryError, isLoading: categoryLoading } = useCategoryQuery()
  const {
    pages,
    isLoading: storeLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isError: storeError,
  } = useGetStoreList({
    category: selectedCategory || '',
  })

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY + window.innerHeight >= document.body.scrollHeight - 300 && hasNextPage) {
        fetchNextPage()
      }
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [fetchNextPage, hasNextPage])

  if (storeLoading && categoryLoading) return <LoadingSpinner />
  if (storeError || categoryError) return <div>에러 발생</div>

  return (
    <div className="flex flex-col p-4 pb-[4.5rem]">
      <AddressContainer />
      <div className="custom-scrollbar mb-4 overflow-x-auto whitespace-nowrap">
        {categories?.map((category: string) => (
          <CategoryButton
            key={category}
            category={category}
            isSelected={selectedCategory === category}
            onClick={() => setSelectedCategory(selectedCategory === category ? null : category)}
          />
        ))}
      </div>

      <div>
        {pages &&
          pages.map((page) => {
            return page.data?.map((store: Store) => (
              <StoreCard key={store.storeName} store={store} />
            ))
          })}
      </div>
    </div>
  )
}
