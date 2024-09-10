import { useInfiniteQuery } from '@tanstack/react-query'
import { getReviews } from '../api'

export const useStoreReviewInfiniteQuery = (storeId: string) => {
  const { data, isLoading, isFetchingNextPage, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ['store', storeId, 'reviews'],
    queryFn: ({ pageParam }) => getReviews(storeId, pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.nextPage,
    staleTime: 0,
  })

  return {
    storeName: data?.pages[0].response.storeName,
    pages: data?.pages,
    isFetchingNextPage,
    isLoading,
    fetchNextPage,
    hasNextPage,
  }
}
