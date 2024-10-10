import { create } from 'zustand'

interface MenuSelectState {
  menuPrice: number | null
  setMenuPrice: (menuPrice: number) => void
  menuCount: number
  setMenuCount: (n: number) => void
  optionGroups: OptionGroup[]
  setOptionGroups: (optionGroups: OptionGroup[]) => void
  perMenuPrice: number | null
  setPerMenuPrice: (perMenuPrice: number) => void
  reset: () => void
}

interface OptionGroup {
  optionGroupId: number
  optionGroupName: string
  options: Option[]
}

interface Option {
  optionId: number
  optionName: string
  optionPrice: number
}

export const useMenuSelectStore = create<MenuSelectState>((set) => ({
  menuPrice: null,
  setMenuPrice: (menuPrice: number) => set({ menuPrice }),
  menuCount: 1,
  setMenuCount: (n: number) =>
    set((state) => {
      if (n === -1 && state.menuCount === 1) return state

      const newMenuCount = Math.max(1, state.menuCount + n)
      const newPerMenuPrice = newMenuCount * Number(state.perMenuPrice)

      return {
        menuCount: newMenuCount,
        perMenuPrice: newPerMenuPrice,
      }
    }),
  optionGroups: [],
  setOptionGroups: (optionGroups: OptionGroup[]) => set({ optionGroups }),
  perMenuPrice: null,
  setPerMenuPrice: (perMenuPrice: number) => set({ perMenuPrice }),
  reset: () => set({ menuPrice: null, menuCount: 1, optionGroups: [] }),
}))
