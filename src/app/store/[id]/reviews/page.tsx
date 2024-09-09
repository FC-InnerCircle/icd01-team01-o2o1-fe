'use client'
import ReviewItem from '@/app/store/[id]/reviews/_components/ReviewItem'
import { useStoreReviewInfiniteQuery } from '@/features/reviews/hooks'
import { ArrowLeftIcon } from 'lucide-react'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import ReviewSkeleton from './_components/ReviewSkeleton'
import { LoadingSpinner } from '@/components/shared/LoadingSpinner'

export default function StoreReviewPage() {
  const params = useParams<{
    id: string
  }>()

  const router = useRouter()

  const { pages, storeName, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useStoreReviewInfiniteQuery(params?.id || '')

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

  return (
    <div className="pb-20">
      <div className="flex items-center gap-3 p-4">
        <Link
          href="#"
          onClick={(e) => {
            e.preventDefault()
            router.back()
          }}
        >
          <ArrowLeftIcon width={24} height={24} />
        </Link>
        <p className="font-semibold">{storeName}</p>
      </div>
      {isLoading && <ReviewSkeleton />}
      {pages &&
        pages.map((page) => {
          return page.response.reviews.map((review) => (
            <ReviewItem key={review.reviewId} review={review} />
          ))
        })}
      {isFetchingNextPage && (
        <div className="fixed bottom-40 flex w-full justify-center">
          <LoadingSpinner size="md" />
        </div>
      )}
    </div>
  )
}
