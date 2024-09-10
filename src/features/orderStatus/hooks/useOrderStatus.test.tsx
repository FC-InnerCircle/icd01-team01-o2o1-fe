import { renderHook, waitFor, wrapper } from '@/util/test-utils'
import { useOrderStatus } from './useOrderStatus'
import { mockOrderResponse } from '@/mocks/handlers/order'

jest.mock('next/navigation', () => ({
  useParams: () => ({
    orderId: 'pending',
  }),
}))

describe('useOrderStatus', () => {
  it('서버로부터 주문 상태를 가져오는 중일 때 isLoading이 true를 반환하고, 완료되면 false를 반환한다.', async () => {
    const { result } = renderHook(() => useOrderStatus(), { wrapper })

    expect(result.current.isLoading).toBe(true)

    await waitFor(
      () => {
        expect(result.current.isLoading).toBe(false)
      },
      { timeout: 3000 },
    )
  })
  it('서버로부터 주문 상태를 가져온다.', async () => {
    const { result } = renderHook(() => useOrderStatus(), { wrapper })

    await waitFor(
      () => {
        expect(result.current.isLoading).toBe(false)
        expect(result.current.data).toEqual(mockOrderResponse)
      },
      { timeout: 3000 },
    )
  })
})
