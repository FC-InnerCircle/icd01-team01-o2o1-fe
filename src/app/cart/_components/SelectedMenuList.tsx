'use client'

import { useRouter } from 'next/navigation'
import MenuCard from './MenuCard'
import { useManageCartStore } from '@/features/cart/hooks/useManageCartStore'

const SelectedMenuList = () => {
  const router = useRouter()

  const { storeId, storeName, menus, isHydrated } = useManageCartStore((state) => ({
    storeId: state.storeId,
    storeName: state.storeName,
    menus: state.menus,
    isHydrated: state.isHydrated,
  }))

  if (!isHydrated) {
    // Avoid rendering until the state is hydrated to prevent hydration mismatch
    return null
  }

  const handleMenuAddClick = () => {
    if (storeId === null || storeName === null) {
      router.push('/home')
      return
    }

    router.push(`/store/${storeId}`)
  }

  return (
    <div className="mb-2 bg-white p-3 pb-0">
      <div className="w-full border-b border-[#DAE3EA] pb-3 font-semibold">
        <div>{storeName}</div>
      </div>
      {menus.length > 0 ? (
        menus?.map((e) => <MenuCard key={e.menuId} {...e} />)
      ) : (
        <div className="flex justify-center py-7">
          <div className="text-center align-middle text-base/[18px] text-[#0FA5FA]">
            <p>선택한 메뉴가 없습니다.</p>
            <p className="pt-1">메뉴를 추가해주세요.</p>
          </div>
        </div>
      )}
      <div className="border-t border-[#DAE3EA]" />
      <div className="flex justify-center py-7">
        <button className="text-base/[18px] text-[#0FA5FA]" onClick={handleMenuAddClick}>
          + 메뉴추가
        </button>
      </div>
    </div>
  )
}

export default SelectedMenuList
