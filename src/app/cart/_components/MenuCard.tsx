'use client'

import { X } from 'lucide-react'

import { MenuType } from '@/features/cart/types'
import { useManageCartStore } from '@/features/cart/hooks/useManageCartStore'
import { PlusButton, CartMinusButton } from '@/components/shared/StockChangeButton'

const MenuCard = ({ menuName, menuPrice, menuCount, optionGroups, menuId }: MenuType) => {
  const { deleteMenuFromCart, changeMenuStock, getMenuPriceWithTotalOption, getTotalOptionPrice } =
    useManageCartStore()

  return (
    <article aria-label="Menu Card">
      <section className="flex justify-between py-8">
        <header className="flex flex-col gap-2">
          <h2 className="text-base/[18px]" aria-label="Menu Name">
            {menuName}
          </h2>
          <ul aria-label="Options List" className="flex flex-col gap-1 pl-2">
            {optionGroups?.map((group) => (
              <li key={group.optionGroupId} className="text-sm/[14px]">
                {group.optionGroupName}
                <p className="pl-2 pt-1 text-sm/[14px]">
                  {group.options?.map((option) => (
                    <span key={option.optionId} className="flex items-center gap-1">
                      {option.optionName} (+{option.optionPrice.toLocaleString()}원)
                    </span>
                  ))}
                </p>
              </li>
            ))}
          </ul>
          <p className="text-base/[18px]" aria-label="Total Price">
            {getMenuPriceWithTotalOption(menuPrice, getTotalOptionPrice(optionGroups), menuCount)}원
          </p>
        </header>
        <footer className="flex flex-col justify-between">
          <button
            aria-label="Remove Menu Item"
            className="flex justify-end"
            onClick={() => deleteMenuFromCart(menuId)}
          >
            <X />
          </button>
          <div className="flex items-center gap-3">
            <CartMinusButton menuStock={menuCount} onClick={() => changeMenuStock(menuId, -1)} />
            <span className="w-4 text-center">{menuCount}</span>
            <PlusButton onClick={() => changeMenuStock(menuId, 1)} />
          </div>
        </footer>
      </section>
    </article>
  )
}

export default MenuCard
