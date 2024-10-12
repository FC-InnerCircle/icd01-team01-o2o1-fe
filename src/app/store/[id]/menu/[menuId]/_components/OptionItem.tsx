'use client'

import { RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { useMenuSelectStore } from '@/features/menu/hooks/useMenuSelectHook'

export interface OptionItemProps {
  optionId: number
  optionName: string
  optionPrice: number
  optionGroupId: number
  optionGroupName: string
  isMultiple: boolean
}

const OptionItem = ({
  optionId,
  optionName,
  optionPrice,
  optionGroupId,
  optionGroupName,
  isMultiple,
}: OptionItemProps) => {
  const { optionGroups, setOptionGroups, perMenuPrice, setPerMenuPrice } = useMenuSelectStore()

  // 현재 그룹에서 선택된 옵션이 있는지 확인
  const isSelected = optionGroups.some(
    (group) =>
      group.optionGroupId === optionGroupId &&
      group.options.some((option) => option.optionId === optionId),
  )

  const handleOptionClick = () => {
    const existingGroup = optionGroups.find((group) => group.optionGroupId === optionGroupId)

    if (existingGroup) {
      if (isMultiple) {
        // 여러 개 선택할 수 있는 경우
        if (isSelected) {
          // 이미 선택된 옵션인 경우 해당 옵션을 삭제
          const updatedOptions = existingGroup.options.filter(
            (option) => option.optionId !== optionId,
          )

          if (updatedOptions.length > 0) {
            // 남아있는 옵션이 있을 경우 그룹 업데이트
            const updatedGroups = optionGroups.map((group) =>
              group.optionGroupId === optionGroupId
                ? {
                    ...group,
                    options: updatedOptions,
                  }
                : group,
            )
            setOptionGroups(updatedGroups)
          } else {
            // 남아있는 옵션이 없을 경우 그룹 자체를 삭제
            const updatedGroups = optionGroups.filter(
              (group) => group.optionGroupId !== optionGroupId,
            )
            setOptionGroups(updatedGroups)
          }
        } else {
          // 새로운 옵션을 추가
          const updatedGroups = optionGroups.map((group) =>
            group.optionGroupId === optionGroupId
              ? {
                  ...group,
                  options: [...group.options, { optionId, optionName, optionPrice }],
                }
              : group,
          )
          setOptionGroups(updatedGroups)
        }
      } else {
        // 단일 선택 모드
        if (isSelected) {
          // 이미 선택된 경우 해제
          const updatedGroups = optionGroups.map((group) =>
            group.optionGroupId === optionGroupId
              ? {
                  ...group,
                  options: [], // 선택 해제
                }
              : group,
          )
          setOptionGroups(
            updatedGroups.filter(
              (group) => group.optionGroupId !== optionGroupId || group.options.length > 0,
            ),
          )
        } else {
          // 새로운 옵션을 추가
          const updatedGroups = optionGroups.map((group) =>
            group.optionGroupId === optionGroupId
              ? {
                  ...group,
                  options: [{ optionId, optionName, optionPrice }],
                }
              : group,
          )
          setOptionGroups(updatedGroups)
        }
      }
    } else {
      // 그룹이 없으면 새 그룹 생성
      const newGroup = {
        optionGroupId,
        optionGroupName,
        options: [{ optionId, optionName, optionPrice }],
      }
      setOptionGroups([...optionGroups, newGroup])
    }
  }

  return (
    <div className="flex items-center space-x-2">
      <RadioGroupItem
        value={String(optionId)}
        id={String(optionId)}
        checked={isSelected}
        onClick={handleOptionClick}
        className={`h-7 w-7 rounded-full border ${isSelected ? 'border-[#000000]' : 'border-[#CCCCCC]'} text-[#000000]`}
      />
      <Label htmlFor={String(optionId)} className="text-base font-normal">
        {optionName} {optionPrice > 0 ? `(+${optionPrice.toLocaleString()}원)` : ''}
      </Label>
    </div>
  )
}

export default OptionItem
