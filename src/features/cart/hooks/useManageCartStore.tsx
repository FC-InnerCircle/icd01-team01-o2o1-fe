import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { useManageCartStoreState } from '@/features/cart/types'
import { OptionGroup, MenuType } from '@/features/cart/types'

export const useManageCartStore = create<useManageCartStoreState>()(
  persist(
    (set, get) => ({
      storeId: null,
      storeName: null,
      menus: [],
      isHydrated: false,
      setStoreId: (storeId: number | null) => set({ storeId }),
      setStoreName: (storeName: string | null) => set({ storeName }),
      setMenus: (menus: any[]) => set({ menus }),
      setHydrated: (hydrated: boolean) => set({ isHydrated: hydrated }),
      deleteMenuFromCart: (order: number) => {
        const { setMenus, menus, setStoreId, setStoreName } = get()
        const newMenus = menus.filter((_, index) => index !== order)
        setMenus(newMenus)
        if (newMenus.length === 0) {
          setStoreId(null)
          setStoreName(null)
        }
      },
      getMenuPriceWithTotalOption: (
        menuPrice: number | null,
        totalOptionPrice: number,
        menuCount: number,
      ) => {
        return ((Number(menuPrice) + totalOptionPrice) * menuCount).toLocaleString()
      },
      changeMenuStock: (order: number, n: number) => {
        const { setMenus, menus, setStoreId, setStoreName } = get()
        // order에 해당하는 메뉴의 수량 변경 및 0 이하인 경우 필터링
        const updatedMenus = menus
          .map((menu, index) => {
            if (index === order) {
              const updatedCount = menu.menuCount + n
              return updatedCount > 0 ? { ...menu, menuCount: updatedCount } : null
            }
            return menu
          })
          .filter((menu): menu is MenuType => menu !== null) // null 제거 후 타입 좁히기

        setMenus(updatedMenus)
        if (updatedMenus.length === 0) {
          setStoreId(null)
          setStoreName(null)
        }
      },
      getTotalOptionPrice: (optionGroups: OptionGroup[]) => {
        return optionGroups.reduce((total, group) => {
          return (
            total + group.options.reduce((groupTotal, option) => groupTotal + option.optionPrice, 0)
          )
        }, 0)
      },
      getTotalOrderPrice: () => {
        const { menus } = get()

        const totalOrderPrice = menus.reduce((total, menu) => {
          const totalOptionPrice = menu.optionGroups.reduce((optionTotal, group) => {
            return (
              optionTotal +
              group.options.reduce((groupTotal, option) => {
                return groupTotal + option.optionPrice
              }, 0)
            )
          }, 0)

          return total + (Number(menu.menuPrice) + totalOptionPrice) * menu.menuCount
        }, 0)

        return totalOrderPrice
      },
    }),
    {
      name: 'cart',
      storage: createJSONStorage(() => sessionStorage),
      onRehydrateStorage: () => (state) => {
        state?.setHydrated(true)
      },
    },
  ),
)
