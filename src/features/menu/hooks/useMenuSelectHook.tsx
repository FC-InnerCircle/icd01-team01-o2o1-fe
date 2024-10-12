import { create } from 'zustand'
import { MenuSelectState, OptionGroup } from '../types'


export const useMenuSelectStore = create<MenuSelectState>((set) => ({
  menuPrice: 0,
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
  perMenuPrice: 0,
  setPerMenuPrice: (perMenuPrice: number) => set({ perMenuPrice }),
  reset: () => set({ menuPrice: 0, menuCount: 1, optionGroups: [], perMenuPrice: 0 }),
}))
