'use client'
import { useEffect } from 'react'
import { useGetStoreDetailInfo } from '@/features/store/hooks/useGetStoreDetailInfo'
import { useParams } from 'next/navigation'
import { useMenuSelectStore } from '@/features/menu/hooks/useMenuSelectHook'
import { MinusButton, PlusButton } from '@/components/shared/StockChangeButton'

const SelectQuantity = () => {
  const params = useParams<{ id: string; menuId: string }>()
  const { data } = useGetStoreDetailInfo()
  const { setMenuPrice, setMenuCount, menuCount, setPerMenuPrice, perMenuPrice } =
    useMenuSelectStore()

  const info = data?.menus?.find((menu) => menu.menuId === Number(params.menuId))

  useEffect(() => {
    if (info?.menuPrice !== undefined) {
      setPerMenuPrice(info.menuPrice)
      setMenuPrice(info.menuPrice)
    }
  }, [info, setMenuPrice, setPerMenuPrice])

  return (
    <section>
      <header className="p-3 pb-5 pt-[12px]">
        <h1 className="h-6 text-xl font-semibold">{info?.menuName}</h1>
        <p className="pt-3">{info?.description}</p>
      </header>

      <hr className="border-[#DAE3EA]" />

      <div className="flex justify-between px-3 py-[18px] text-base font-semibold">
        <span>가격</span>
        <span>{perMenuPrice !== null ? perMenuPrice.toLocaleString() : ''}원</span>
      </div>

      <div className="flex justify-between px-3 py-[18px] text-base font-semibold">
        <span>수량</span>
        <div className="flex items-center gap-3">
          <MinusButton onClick={() => setMenuCount(-1)} />
          <span className="w-4 text-center">{menuCount}</span>
          <PlusButton onClick={() => setMenuCount(1)} />
        </div>
      </div>
    </section>
  )
}

export default SelectQuantity
