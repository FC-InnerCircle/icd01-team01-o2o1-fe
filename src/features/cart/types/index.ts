export interface MenuType {
  menuId: number
  menuName: string
  menuCount: number
  menuPrice: number | null
  optionGroups: OptionGroup[]
}

export interface OptionGroup {
  optionGroupId: number
  optionGroupName: string
  options: Option[]
}

export interface Option {
  optionId: number
  optionName: string
  optionPrice: number
}

export interface useManageCartStoreState {
  storeId: number | null
  setStoreId: (storeId: number | null) => void
  storeName: string | null
  setStoreName: (storeName: string | null) => void
  menus: MenuType[]
  setMenus: (menus: MenuType[]) => void
  isHydrated: boolean
  setHydrated: (hydrated: boolean) => void
  deleteMenuFromCart: (menuId: number) => void
  getMenuPriceWithTotalOption: (
    menuPrice: number | null,
    totalOptionPrice: number,
    menuCount: number,
  ) => string
  changeMenuStock: (menuId: number, n: number) => void
  getTotalOptionPrice: (optionGroups: OptionGroup[]) => number
  getTotalOrderPrice: () => number
}

export interface AddressType {
  addressId: number
  latitude: string
  longitude: string
  address: string
  addressDetail: string
  zipCode: string
}

export interface OrderType {
  storeId: number | null
  storeName: string | null
  menus: MenuType[]
  orderPrice: number
  payment: string // 결제 수단 (예: card, cash 등)
  address: AddressType
}

export interface OrderResponse {
  response: {
    storeId: number
    orderId: number
  }
  statusCode: number
  msg: string
}
