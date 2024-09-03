'use client'
import * as React from 'react'
interface Order {
  id: number
  storeName: string
  date: string
  deliveryStatus: 'Delivered' | 'Pending'
  menuItems: { name: string; quantity: number }[]
  totalAmount: number
}
export default function OrderCard({ order }: { order: Order }) {
  return (
    <div className="flex flex-col rounded-lg border p-4">
      <h3 className="text-2xl font-bold">{order.storeName}</h3>
      <span className="text-xs text-gray-500">{order.date}</span>
      <div className="mb-2 text-gray-600">
        {order.deliveryStatus === 'Delivered' ? '배달 완료' : '배달 중'}
      </div>
      <div className="mb-2 text-sm">
        {order.menuItems.map((item, index) => (
          <div key={index}>
            {item.name} x {item.quantity}
          </div>
        ))}
      </div>
      <span className="font-semibold">합계 금액: {order.totalAmount.toLocaleString()}원</span>
      <button className="my-4 bg-[#0FA5FA] p-2 text-white hover:underline">리뷰쓰기</button>
    </div>
  )
}
