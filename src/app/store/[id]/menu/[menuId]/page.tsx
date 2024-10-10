'use client'

import React, { useEffect } from 'react'
import Thumbnail from './_components/Thumbnail'
import SelectQuantity from './_components/SelectQuantity'
import OptionSelectContainer from './_components/OptionSelectContainer'
import BackButton from '@/components/shared/BackButton'
import { useGetStoreDetailInfo } from '@/features/store/hooks/useGetStoreDetailInfo'
import { useParams } from 'next/navigation'
import { useToast } from '@/hooks/useToast'
import { useMenuSelectStore } from '@/features/menu/hooks/useMenuSelectHook'
import { useManageCartStore } from '@/features/cart/hooks/useManageCartStore'
import { MenuType } from '@/features/cart/types'
import { useRouter } from 'next/navigation'

const Page = () => {
  const router = useRouter()
  const { optionGroups, menuCount, menuPrice, reset } = useMenuSelectStore()
  const { data, isLoading } = useGetStoreDetailInfo()
  const params = useParams<{
    menuId: string
  }>()
  const { toast } = useToast()

  useEffect(() => {
    return () => {
      reset()
    }
  }, [reset])

  const handleAddCart = () => {
    const menuInfo = data?.menus.find((menu) => menu.menuId === Number(params.menuId))

    // 필수 옵션 선택 여부 확인
    const requiredOptionGroups = menuInfo?.optionGroups.filter((group) => group.isRequired)

    const isAllRequiredOptionsSelected = requiredOptionGroups?.every((requiredGroup) =>
      optionGroups.some(
        (selectedGroup) =>
          selectedGroup.optionGroupId === requiredGroup.optionGroupId &&
          selectedGroup.options.length > 0,
      ),
    )

    if (!isAllRequiredOptionsSelected) {
      toast({
        variant: 'destructive',
        title: '필수 옵션을 선택해주세요',
        duration: 1500,
      })
      return
    }

    // 카트 상태 가져오기
    const { storeId, storeName, setStoreId, setStoreName, setMenus, menus } =
      useManageCartStore.getState()

    // 카트가 비어 있을 때: 메뉴 추가
    const newMenu: MenuType = {
      menuId: menuInfo?.menuId!,
      menuName: menuInfo?.menuName!,
      menuCount: menuCount,
      menuPrice: menuPrice,
      optionGroups: optionGroups,
    }

    if (storeId === null || storeName === null) {
      setStoreId(data?.storeId!)
      setStoreName(data?.storeName!)
      setMenus([...menus, newMenu])

      toast({
        title: '메뉴가 카트에 추가되었습니다',
        duration: 1500,
      })
      router.push('/cart')
      return
    }

    // 이미 같은 menuId가 카트에 있는지 확인
    const isMenuInCart = menus?.some((menu) => menu.menuId === newMenu.menuId)

    if (isMenuInCart) {
      toast({
        variant: 'destructive',
        title: '이미 같은 메뉴가 카트에 있습니다',
        duration: 1500,
      })
      return
    }

    // 카트에 저장된 storeId와 현재 메뉴의 storeId 비교
    if (storeId !== data?.storeId) {
      toast({
        variant: 'destructive',
        title: '다른 음식점의 메뉴가 카트에 포함되어 있습니다',
        duration: 1500,
      })
      return
    }

    // 같은 음식점일 경우에만 메뉴 추가
    setMenus([...menus, newMenu])

    toast({
      title: '메뉴가 카트에 추가되었습니다',
      duration: 1500,
    })

    router.push('/cart')
  }

  return (
    <>
      <div className="relative min-h-screen pb-[100px]">
        <header className="absolute top-0 z-10 flex h-14 w-full items-center p-4">
          <BackButton />
        </header>
        <Thumbnail />
        <SelectQuantity />
        <OptionSelectContainer />
        <div className="fixed bottom-0 left-0 right-0 flex justify-center">
          <button
            className="w-full max-w-[480px] rounded bg-blue-500 pb-[52px] pt-[24px] text-white"
            onClick={handleAddCart}
          >
            배달 카트에 담기
          </button>
        </div>
      </div>
    </>
  )
}

export default Page
