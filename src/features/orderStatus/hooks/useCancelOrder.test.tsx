import { renderHook, waitFor } from '@testing-library/react'
import { useCancelOrder } from './useCancelOrder'
import { wrapper } from '@/util/test-utils'

const mockBack = jest.fn()

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    back: mockBack,
  }),
  useParams: () => ({
    orderId: 'pending',
  }),
}))

describe('useCancelOrder', () => {
  it('주문 취소 중일 때 isPending이 true를 반환하고, 완료되면 false를 반환한다.', async () => {
    const { result } = renderHook(() => useCancelOrder(), { wrapper })

    expect(result.current.isPending).toBe(false)

    result.current.handleCancelOrder()

    await waitFor(
      () => {
        expect(result.current.isPending).toBe(true)
      },
      {
        timeout: 3000,
      },
    )
  })

  it('주문 취소에 성공하면 뒤로 이동한다.', async () => {
    const { result } = renderHook(() => useCancelOrder(), { wrapper })

    result.current.handleCancelOrder()

    await waitFor(
      () => {
        expect(mockBack).toHaveBeenCalled()
      },
      { timeout: 3000 },
    )
  })

  //TODO: 주문 취소에 실패한 경우의 처리 방법이 정해지면 테스트 코드를 작성해주세요.
  // it('주문 취소에 실패하면 에러 메시지를 띄운다.', async () => {})
})
