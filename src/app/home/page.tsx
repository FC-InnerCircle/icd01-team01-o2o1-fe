'use client'
import React, { useEffect, useRef, useState } from 'react'
import CategoryButton from '@/app/home/_components/CategoryButton'
import AddressContainer from '@/app/home/_components/AddressContainer'
import useStoreData from '@/mocks/handlers/store'
import { Store } from '@/types/store'
import LoadingSpinner from '@/components/common/LoadingSpinner'
import useGetStoreList from '@/features/store/hooks/useGetStoreList'
import StoreCard from '@/components/shared/StoreCard'
import throttle from 'lodash.throttle'
import PullToRefresh from '@/components/shared/PullToRefresh'
import { useQueryClient } from '@tanstack/react-query'

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
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
  const queryClient = useQueryClient()

  const handleRefresh = throttle(() => {
    queryClient.invalidateQueries({
      predicate: (query) => query.queryKey[0] === 'storeList',
    })
  }, 1000)

  useEffect(() => {
    const handleScroll = throttle(() => {
      if (window.scrollY + window.innerHeight >= document.body.scrollHeight - 400 && hasNextPage) {
        fetchNextPage()
      }
    }, 300)

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [fetchNextPage, hasNextPage])

  if (storeLoading && categoryLoading) return <LoadingSpinner />
  if (storeError || categoryError) return <div>에러 발생</div>

  return (
    <PullToRefresh elementRef={containerRef} handleRefresh={handleRefresh}>
      <div ref={containerRef} className="flex flex-col p-4 pb-[4.5rem]">
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
    </PullToRefresh>
  )
}
