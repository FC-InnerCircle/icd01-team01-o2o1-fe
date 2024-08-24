import clsx from 'clsx'
import { Dot } from 'lucide-react'
import React from 'react'

const OrderStatusItemList = [
  {
    name: '주문 수락됨',
    status: 'accepted',
  },
  {
    name: '메뉴 준비중',
    status: 'preparing',
  },
  {
    name: '배달중',

    status: 'delivering',
  },
  {
    name: '배달 완료',
    status: 'delivered',
  },
]

interface OrderDetailProps {
  status: 'pending' | 'accepted' | 'preparing' | 'delivering' | 'delivered'
  address: string
  remainingDeliveryTime?: number
  orderArrivalTime?: string
}

const OrderStatusTrack = ({
  status,
  address,
  orderArrivalTime,
  remainingDeliveryTime,
}: OrderDetailProps) => {
  return (
    <div className="border-b-2">
      {/* 주문 수락 전 */}
      {status === 'pending' && (
        <>
          <div className="mb-8 flex items-center gap-4">
            <Dot className="text-main" />
            <p className="text-base font-semibold text-main">매장에서 주문을 확인하고 있습니다.</p>
          </div>
          <div className="mb-12 flex flex-col items-center gap-4">
            <button className="h-8 w-24 rounded-sm border-2">주문 취소</button>
            <p className="text-sm">매장에서 조리를 시작하면 취소 할 수 없습니다.</p>
          </div>
        </>
      )}
      {/* 주문 수락 후 */}
      {status !== 'pending' && (
        <>
          <div className="mb-6 flex items-center justify-between">
            <p className="font-semibold">
              <span className="text-3xl">{remainingDeliveryTime}</span>분
            </p>
            <p>{orderArrivalTime} 도착예정</p>
          </div>
          <ul className="mb-6 ml-6 flex flex-col gap-4">
            {OrderStatusItemList.map((item) => (
              <li key={item.status} className="flex">
                <Dot className={status === item.status ? 'text-main' : ''} />
                <p
                  className={clsx('font-semibold', {
                    'text-main': status === item.status,
                  })}
                >
                  {item.name}
                </p>
              </li>
            ))}
          </ul>
        </>
      )}
      <div className="flex flex-col gap-4 pb-12">
        <p className="text-xl font-semibold">배달 주소</p>
        <p>{address}</p>
      </div>
    </div>
  )
}

export default OrderStatusTrack
