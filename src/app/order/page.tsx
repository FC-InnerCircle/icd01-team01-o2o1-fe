'use client'
import OrderCard from '@/components/order/OrderCard'
import Tabs from '@/components/order/Tabs'
import { useState } from 'react'

interface Order {
  id: number
  storeName: string
  date: string
  deliveryStatus: 'Delivered' | 'Pending'
  menuItems: { name: string; quantity: number }[]
  totalAmount: number
}

const mockOrders: Order[] = [
  {
    id: 1,
    storeName: '우리집 밥상',
    date: '2022-07-11 오후 07:06',
    deliveryStatus: 'Delivered',
    menuItems: [
      { name: '김치찌개', quantity: 2 },
      { name: '불고기', quantity: 1 },
    ],
    totalAmount: 25000,
  },
  {
    id: 2,
    storeName: '홍콩반점',
    date: '2024-08-11 오후 07:06',
    deliveryStatus: 'Delivered',
    menuItems: [{ name: '짜장면', quantity: 3 }],
    totalAmount: 18000,
  },
  {
    id: 3,
    storeName: '치킨마을',
    date: '2024-08-10 오후 07:06',
    deliveryStatus: 'Delivered',
    menuItems: [{ name: '후라이드치킨', quantity: 1 }],
    totalAmount: 20000,
  },
  {
    id: 4,
    storeName: '치킨마을',
    date: '2022-07-11 오후 07:06',
    deliveryStatus: 'Delivered',
    menuItems: [{ name: '후라이드치킨', quantity: 1 }],
    totalAmount: 20000,
  },
]

const OrderPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'past' | 'preparing'>('past')

  const handleTabClick = (tab: 'past' | 'preparing') => {
    setActiveTab(tab)
  }

  return (
    <div className="flex h-screen flex-col">
      <Tabs activeTab={activeTab} onTabClick={handleTabClick} />

      <div className="flex-1 overflow-y-auto p-4 pb-[4.5rem]">
        {activeTab === 'past' ? (
          <div className="space-y-4">
            {mockOrders.map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-500">준비중인 주문이 없습니다.</div>
        )}
      </div>
    </div>
  )
}

export default OrderPage
