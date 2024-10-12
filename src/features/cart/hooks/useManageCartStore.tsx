import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { useManageCartStoreState } from '@/features/cart/types'
import { OptionGroup } from '@/features/cart/types'

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
      deleteMenuFromCart: (menuId: number) => {
        const { setMenus, menus, setStoreId, setStoreName } = get()
        const newMenus = menus.filter((menu) => menu.menuId !== menuId)
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
      changeMenuStock: (menuId: number, n: number) => {
        const { setMenus, menus, setStoreId, setStoreName } = get()
        const updatedMenus = menus.map((menu) => {
          if (menu.menuId === menuId) {
            return {
              ...menu,
              menuCount: menu.menuCount + n, // n은 재고의 변경량
            }
          }
          return menu
        })
        setMenus(updatedMenus)
        if (updatedMenus.some((menu) => menu.menuId === menuId && menu.menuCount <= 0)) {
          const filteredMenus = updatedMenus.filter((menu) => menu.menuId !== menuId)
          setMenus(filteredMenus)
          if (filteredMenus.length === 0) {
            setStoreId(null)
            setStoreName(null)
          }
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
