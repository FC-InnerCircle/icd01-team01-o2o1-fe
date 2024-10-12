'use client'
import { X } from 'lucide-react'
import AddressInfo from './_components/AddressInfo'
import SelectedMenuList from './_components/SelectedMenuList'
import { useManageCartStore } from '@/features/cart/hooks/useManageCartStore'
import { useGetMainAddress } from '@/features/address/query'
import { useRouter } from 'next/navigation'
import useOrderMenu from '@/features/cart/hooks/useOrderMenu'
import { useToast } from '@/hooks/useToast'
import useGetAddressForOrder from '@/features/address/hooks/useGetAddressForOrder'
import { AddressData } from '@/features/address/types'

const CartPage = () => {
  const router = useRouter()
  const { toast } = useToast()
  const { mutate: order } = useOrderMenu()
  const { data: address } = useGetMainAddress()
  const { isHydrated, getTotalOrderPrice } = useManageCartStore((state) => ({
    isHydrated: state.isHydrated,
    getTotalOrderPrice: state.getTotalOrderPrice,
  }))

  const addressForOrder = useGetAddressForOrder(address as AddressData) // 훅을 컴포넌트 최상단에서 호출

  if (!isHydrated) {
    // Avoid rendering until the state is hydrated to prevent hydration mismatch
    return null
  }

  const useHandleOrder = () => {
    const { storeId, storeName, menus } = useManageCartStore.getState()

    if (storeId === null || storeName === null) {
      toast({
        variant: 'destructive',
        title: '카트에 주문할 메뉴가 없습니다.',
        duration: 1500,
      })
      return
    }

    const formData = {
      storeId,
      storeName,
      menus,
      orderPrice: getTotalOrderPrice(),
      payment: 'card',
      address: addressForOrder, // 여기에서 바로 사용
    }

    order(formData)
  }

  return (
    <div className="relative min-h-screen pb-[100px]">
      <header className="relative flex w-full items-center justify-center bg-white p-4">
        <button
          aria-label="Go back"
          className="absolute left-4 flex items-center"
          onClick={() => router.back()}
        >
          <X />
        </button>
        <h1 className="text-lg font-semibold">카트</h1>
      </header>
      <div className="h-full bg-[#DAE3EA]">
        <AddressInfo />
        <SelectedMenuList />
        <div className="h-[100px] w-full bg-white p-3">
          <div className="pb-3 font-semibold">결제수단</div>
          <div>카카오페이</div>
        </div>
      </div>
      <div className="fixed bottom-0 left-0 right-0 flex justify-center">
        <button
          className="w-full max-w-[480px] rounded bg-[#0FA5FA] pb-[52px] pt-[24px] text-white"
          onClick={useHandleOrder}
        >
          {getTotalOrderPrice() > 0
            ? `배달 주문 ${getTotalOrderPrice().toLocaleString()}원 결제하기`
            : '메뉴를 선택해주세요.'}
        </button>
      </div>
    </div>
  )
}

export default CartPage
