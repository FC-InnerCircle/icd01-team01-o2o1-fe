'use client'

import OptionSelect from './OptionSelect'
import { useGetStoreDetailInfo } from '@/features/store/hooks/useGetStoreDetailInfo'
import { useParams } from 'next/navigation'
import { useEffect } from 'react'
import { useMenuSelectStore } from '@/features/menu/hooks/useMenuSelectHook'

const OptionSelectContainer = () => {
  const params = useParams<{
    menuId: string
  }>()
  const {
    menuCount,
    menuPrice,
    setPerMenuPrice,
    optionGroups: selectedOptionGroups,
  } = useMenuSelectStore()
  const { data } = useGetStoreDetailInfo()

  const optionGroups =
    data?.menus?.find((menu) => menu.menuId === Number(params.menuId))?.optionGroups || []

  useEffect(() => {
    // 선택한 옵션의 배열이 변경될 경우, 순정메뉴가격 + 선택된 옵션들의 가격
    const selectedOptionsPrice = selectedOptionGroups.reduce((total, group) => {
      const groupSelectedOptionPrice = group.options.reduce((groupTotal, option) => {
        return groupTotal + option.optionPrice // 선택된 옵션들의 가격을 합산
      }, 0)
      return total + groupSelectedOptionPrice
    }, 0)

    setPerMenuPrice((Number(menuPrice) + selectedOptionsPrice) * menuCount)
  }, [selectedOptionGroups, menuCount, menuPrice, setPerMenuPrice])

  return (
    <>
      <OptionSelect optionGroups={optionGroups} />
    </>
  )
}

export default OptionSelectContainer
