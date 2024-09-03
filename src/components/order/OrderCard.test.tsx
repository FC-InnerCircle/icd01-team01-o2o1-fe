import { render, screen } from '@testing-library/react'
import OrderCard from './OrderCard'

// Order 타입을 가져옵니다.
interface Order {
  id: number
  storeName: string
  date: string
  deliveryStatus: 'Delivered' | 'Pending'
  menuItems: { name: string; quantity: number }[]
  totalAmount: number
}

describe('OrderCard', () => {
  const mockOrder: Order = {
    id: 1,
    storeName: 'Test Store',
    date: '2024-09-03',
    deliveryStatus: 'Delivered', // 'Delivered'로 정확히 지정합니다.
    menuItems: [
      { name: 'Item 1', quantity: 2 },
      { name: 'Item 2', quantity: 1 },
    ],
    totalAmount: 30000,
  }

  test('주문 정보가 올바르게 렌더링된다', () => {
    render(<OrderCard order={mockOrder} />)

    // 상점 이름이 올바르게 표시되는지 확인합니다.
    expect(screen.getByText('Test Store')).toBeInTheDocument()

    // 주문 날짜가 올바르게 표시되는지 확인합니다.
    expect(screen.getByText('2024-09-03')).toBeInTheDocument()

    // 배달 상태가 올바르게 표시되는지 확인합니다.
    expect(screen.getByText('배달 완료')).toBeInTheDocument()

    // 메뉴 아이템이 올바르게 렌더링되는지 확인합니다.
    expect(screen.getByText('Item 1 x 2')).toBeInTheDocument()
    expect(screen.getByText('Item 2 x 1')).toBeInTheDocument()

    // 합계 금액이 올바르게 표시되는지 확인합니다.
    expect(screen.getByText('합계 금액: 30,000원')).toBeInTheDocument()

    // '리뷰쓰기' 버튼이 렌더링되는지 확인합니다.
    expect(screen.getByText('리뷰쓰기')).toBeInTheDocument()
  })

  test('배달 상태가 "배달 중"일 때 올바르게 표시되는지 확인한다', () => {
    const pendingOrder: Order = { ...mockOrder, deliveryStatus: 'Pending' }
    render(<OrderCard order={pendingOrder} />)

    expect(screen.getByText('배달 중')).toBeInTheDocument()
  })
})
