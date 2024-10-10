import { ShoppingCart } from 'lucide-react'
import { useManageCart } from '@/features/cart/hooks/useManageCart'
const CartIcon = () => {
  const { menus } = useManageCart()

  return (
    <div className="relative">
      {menus.length > 0 && (
        <span className="absolute right-0 top-0 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs text-white">
          {menus.length}
        </span>
      )}
      <ShoppingCart size={24} />
    </div>
  )
}

export default CartIcon
