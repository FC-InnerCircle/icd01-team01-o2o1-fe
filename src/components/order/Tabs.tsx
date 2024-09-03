'use client'
import * as React from 'react'

export default function Tabs({
  activeTab,
  onTabClick,
}: {
  activeTab: 'past' | 'preparing'
  onTabClick: (tab: 'past' | 'preparing') => void
}) {
  return (
    <div className="flex border-b bg-white pt-2">
      <button
        className={`flex-1 px-4 py-2 text-center ${
          activeTab === 'past' ? 'border-b-2 border-black font-semibold' : ''
        }`}
        onClick={() => onTabClick('past')}
      >
        과거 주문내역
      </button>
      <button
        className={`flex-1 px-4 py-2 text-center ${
          activeTab === 'preparing' ? 'border-b-2 border-black font-semibold' : ''
        }`}
        onClick={() => onTabClick('preparing')}
      >
        준비중
      </button>
    </div>
  )
}
