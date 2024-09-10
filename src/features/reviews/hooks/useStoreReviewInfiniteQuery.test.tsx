import { renderHook, waitFor } from '@testing-library/react'
import { wrapper } from '@/util/test-utils'
import { useStoreReviewInfiniteQuery } from '.'

describe('useStoreReviewInfiniteQuery', () => {
  it('서버로부터 리뷰를 가져오는 중일 때 isLoading이 true를 반환하고, 완료되면 false를 반환한다.', async () => {
    const { result } = renderHook(() => useStoreReviewInfiniteQuery('1'), { wrapper })

    expect(result.current.isLoading).toBe(true)

    await waitFor(
      () => {
        expect(result.current.isLoading).toBe(false)
      },
      { timeout: 3000 },
    )
  })
  it('서버로부터 리뷰를 가져온다.', async () => {
    const { result } = renderHook(() => useStoreReviewInfiniteQuery('1'), { wrapper })

    await waitFor(
      () => {
        expect(result.current.isLoading).toBe(false)
        expect(result.current.storeName).toEqual('철수네 김치찌개')
        expect(result.current.pages).toHaveLength(1)
        expect(result.current.isFetchingNextPage).toBe(false)
      },
      { timeout: 3000 },
    )
  })
  it('nextPage가 있을 때 fetchNextPage를 호출하면 다음 페이지를 가져온다.', async () => {
    const { result } = renderHook(() => useStoreReviewInfiniteQuery('1'), { wrapper })

    await waitFor(
      () => {
        expect(result.current.isLoading).toBe(false)
        expect(result.current.storeName).toEqual('철수네 김치찌개')
        expect(result.current.pages).toHaveLength(1)
        expect(result.current.isFetchingNextPage).toBe(false)
      },
      { timeout: 3000 },
    )

    result.current.fetchNextPage()

    await waitFor(
      () => {
        expect(result.current.isLoading).toBe(false)
        expect(result.current.storeName).toEqual('철수네 김치찌개')
        expect(result.current.pages).toHaveLength(2)
        expect(result.current.isFetchingNextPage).toBe(false)
      },
      { timeout: 3000 },
    )
  })
})
