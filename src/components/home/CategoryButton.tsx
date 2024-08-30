// components/CategoryButton.tsx
import React from 'react'

interface CategoryButtonProps {
  category: string
}

const CategoryButton: React.FC<CategoryButtonProps> = ({ category }) => {
  return (
    <button className="mr-2 inline-block rounded-lg border border-black px-4 py-2 text-black">
      {category}
    </button>
  )
}

export default CategoryButton
