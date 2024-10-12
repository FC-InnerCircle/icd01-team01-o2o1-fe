import { ShoppingCart } from 'lucide-react'
import { useManageCartStore } from '@/features/cart/hooks/useManageCartStore'

const CartIcon = () => {
  const { menus } = useManageCartStore()

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
